import Stripe from "stripe";
import type { Stripe as StripeType } from "stripe";
import { getDb } from "./db";
import { stripeCustomers, stripePayments, orders } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { ENV } from "./_core/env";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Get or create a Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(
  userId: number,
  email: string,
  name?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if customer already exists
  const existing = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0].stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId: userId.toString(),
    },
  });

  // Save to database
  await db.insert(stripeCustomers).values({
    userId,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}

/**
 * Create a Stripe checkout session for an order
 */
export async function createCheckoutSession(
  orderId: number,
  userId: number,
  email: string,
  items: Array<{ name: string; price: number; quantity: number }>,
  total: number,
  successUrl: string,
  cancelUrl: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get or create Stripe customer
  const stripeCustomerId = await getOrCreateStripeCustomer(userId, email);

  // Create line items for Stripe
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: orderId.toString(),
    metadata: {
      orderId: orderId.toString(),
      userId: userId.toString(),
    },
  });

  // Create payment record
  await db.insert(stripePayments).values({
    orderId,
    userId,
    stripePaymentIntentId: session.payment_intent?.toString() || "",
    stripeCheckoutSessionId: session.id,
    amount: total,
    currency: "EUR",
    status: "pending",
    metadata: JSON.stringify({
      checkoutSessionId: session.id,
    }),
  });

  return session;
}

/**
 * Handle successful payment event
 */
export async function handlePaymentSucceeded(paymentIntentId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Find the payment record
  const payment = await db
    .select()
    .from(stripePayments)
    .where(eq(stripePayments.stripePaymentIntentId, paymentIntentId))
    .limit(1);

  if (payment.length === 0) {
    console.warn(`Payment intent ${paymentIntentId} not found in database`);
    return;
  }

  const paymentRecord = payment[0];

  // Update payment status
  await db
    .update(stripePayments)
    .set({
      status: "succeeded",
      updatedAt: new Date(),
    })
    .where(eq(stripePayments.id, paymentRecord.id));

  // Update order status
  await db
    .update(orders)
    .set({
      status: "confirmed",
      updatedAt: new Date(),
    })
    .where(eq(orders.id, paymentRecord.orderId));

  console.log(`Payment ${paymentIntentId} succeeded for order ${paymentRecord.orderId}`);
}

/**
 * Handle failed payment event
 */
export async function handlePaymentFailed(paymentIntentId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Find the payment record
  const payment = await db
    .select()
    .from(stripePayments)
    .where(eq(stripePayments.stripePaymentIntentId, paymentIntentId))
    .limit(1);

  if (payment.length === 0) {
    console.warn(`Payment intent ${paymentIntentId} not found in database`);
    return;
  }

  const paymentRecord = payment[0];

  // Update payment status
  await db
    .update(stripePayments)
    .set({
      status: "failed",
      updatedAt: new Date(),
    })
    .where(eq(stripePayments.id, paymentRecord.id));

  // Update order status
  await db
    .update(orders)
    .set({
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(orders.id, paymentRecord.orderId));

  console.log(`Payment ${paymentIntentId} failed for order ${paymentRecord.orderId}`);
}

/**
 * Get user's payment history
 */
export async function getUserPaymentHistory(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const payments = await db
    .select()
    .from(stripePayments)
    .where(eq(stripePayments.userId, userId));

  return payments;
}

/**
 * Get payment details by order ID
 */
export async function getPaymentByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const payment = await db
    .select()
    .from(stripePayments)
    .where(eq(stripePayments.orderId, orderId))
    .limit(1);

  return payment[0] || null;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    return event;
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return null;
  }
}

export { stripe };
