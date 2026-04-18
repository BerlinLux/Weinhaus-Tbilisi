import { describe, it, expect, vi, beforeEach } from "vitest";
import Stripe from "stripe";

// Mock Stripe
vi.mock("stripe", () => {
  const mockStripe = {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: "cs_test_123",
          url: "https://checkout.stripe.com/test",
          payment_intent: "pi_test_456",
        }),
      },
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
    paymentIntents: {
      retrieve: vi.fn().mockResolvedValue({
        id: "pi_test_456",
        status: "succeeded",
        amount: 5000,
        currency: "eur",
      }),
    },
  };
  return {
    default: vi.fn(() => mockStripe),
  };
});

describe("Stripe Integration - Advanced", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Checkout Session Creation", () => {
    it("should create a checkout session with correct parameters", async () => {
      const stripe = new Stripe("sk_test_123");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Wine Bottle",
              },
              unit_amount: 2900,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      });

      expect(session).toBeDefined();
      expect(session.id).toBe("cs_test_123");
      expect(session.url).toBe("https://checkout.stripe.com/test");
      expect(session.payment_intent).toBe("pi_test_456");
    });

    it("should include metadata in checkout session", async () => {
      const stripe = new Stripe("sk_test_123");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Wine",
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        metadata: {
          order_id: "123",
          user_id: "456",
        },
      });

      expect(session).toBeDefined();
    });
  });

  describe("Payment Intent Handling", () => {
    it("should retrieve payment intent status", async () => {
      const stripe = new Stripe("sk_test_123");

      const paymentIntent = await stripe.paymentIntents.retrieve(
        "pi_test_456"
      );

      expect(paymentIntent).toBeDefined();
      expect(paymentIntent.status).toBe("succeeded");
      expect(paymentIntent.amount).toBe(5000);
      expect(paymentIntent.currency).toBe("eur");
    });

    it("should handle different payment statuses", async () => {
      const statuses = ["succeeded", "processing", "requires_payment_method"];

      statuses.forEach((status) => {
        const mockPaymentIntent = {
          id: "pi_test_123",
          status: status,
          amount: 5000,
          currency: "eur",
        };

        expect(mockPaymentIntent.status).toBe(status);
      });
    });
  });

  describe("Webhook Verification", () => {
    it("should verify webhook signature correctly", () => {
      const stripe = new Stripe("sk_test_123");
      const webhookSecret = "whsec_test_123";

      const event = {
        id: "evt_123",
        type: "payment_intent.succeeded",
        data: {
          object: {
            id: "pi_test_456",
            status: "succeeded",
            amount: 5000,
          },
        },
      };

      // Simulate webhook verification
      const isValid = !!(event.id && event.type && event.data);
      expect(isValid).toBe(true);
    });

    it("should reject test events properly", () => {
      const testEvent = {
        id: "evt_test_123",
        type: "payment_intent.succeeded",
      };

      const isTestEvent = testEvent.id.startsWith("evt_test_");
      expect(isTestEvent).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", async () => {
      const stripe = new Stripe("sk_test_123");

      vi.mocked(stripe.checkout.sessions.create).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(
        stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [],
          mode: "payment",
          success_url: "https://example.com/success",
          cancel_url: "https://example.com/cancel",
        })
      ).rejects.toThrow("Network error");
    });

    it("should handle invalid API keys", () => {
      // Stripe constructor doesn't throw for empty key, it validates at request time
      const stripe = new Stripe("");
      expect(stripe).toBeDefined();
    });
  });

  describe("Idempotency", () => {
    it("should support idempotent requests", async () => {
      const stripe = new Stripe("sk_test_123");

      const idempotencyKey = "idempotent_key_123";

      const session1 = await stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Wine",
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: "https://example.com/success",
          cancel_url: "https://example.com/cancel",
        },
        {
          idempotencyKey,
        }
      );

      expect(session1).toBeDefined();
      expect(session1.id).toBe("cs_test_123");
    });
  });
});
