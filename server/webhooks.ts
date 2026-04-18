import express, { Express } from "express";
import { handlePaymentSucceeded, handlePaymentFailed, verifyWebhookSignature } from "./stripe";

/**
 * Register Stripe webhook endpoint
 * This must be registered BEFORE express.json() middleware
 */
export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const signature = req.headers["stripe-signature"] as string;

      if (!signature) {
        console.error("[Webhook] Missing Stripe signature");
        return res.status(400).json({ error: "Missing signature" });
      }

      // Verify webhook signature
      const event = verifyWebhookSignature(req.body, signature);

      if (!event) {
        console.error("[Webhook] Invalid signature");
        return res.status(400).json({ error: "Invalid signature" });
      }

      // Handle test events for verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      try {
        // Handle different event types
        switch (event.type) {
          case "payment_intent.succeeded":
            const paymentIntent = event.data.object as any;
            await handlePaymentSucceeded(paymentIntent.id);
            console.log(`[Webhook] Payment succeeded: ${paymentIntent.id}`);
            break;

          case "payment_intent.payment_failed":
            const failedPayment = event.data.object as any;
            await handlePaymentFailed(failedPayment.id);
            console.log(`[Webhook] Payment failed: ${failedPayment.id}`);
            break;

          case "charge.refunded":
            const refundedCharge = event.data.object as any;
            console.log(`[Webhook] Charge refunded: ${refundedCharge.id}`);
            // Handle refund logic here if needed
            break;

          default:
            console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }

        // Return success response
        res.json({ received: true });
      } catch (error) {
        console.error("[Webhook] Error processing event:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
}
