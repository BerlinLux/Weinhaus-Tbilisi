import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getUserPaymentHistory,
  getPaymentByOrderId,
} from "./stripe";
import { getDb } from "./db";

// Mock the database
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock Stripe
vi.mock("stripe", () => {
  const mockStripe = {
    customers: {
      create: vi.fn().mockResolvedValue({ id: "cus_test_123" }),
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
  };
  return {
    default: vi.fn(() => mockStripe),
  };
});

describe("Stripe Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserPaymentHistory", () => {
    it("should return user payment history", async () => {
      const mockPayments = [
        {
          id: 1,
          userId: 1,
          orderId: 1,
          amount: 5000,
          status: "succeeded",
          stripePaymentIntentId: "pi_test_123",
          stripeCheckoutSessionId: "cs_test_123",
          currency: "EUR",
          metadata: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockDb = {
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(mockPayments),
          }),
        }),
      };

      vi.mocked(getDb).mockResolvedValue(mockDb as any);

      const result = await getUserPaymentHistory(1);

      expect(result).toEqual(mockPayments);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it("should return empty array if no payments found", async () => {
      const mockDb = {
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([]),
          }),
        }),
      };

      vi.mocked(getDb).mockResolvedValue(mockDb as any);

      const result = await getUserPaymentHistory(1);

      expect(result).toEqual([]);
    });

    it("should throw error if database is not available", async () => {
      vi.mocked(getDb).mockResolvedValue(null);

      await expect(getUserPaymentHistory(1)).rejects.toThrow(
        "Database not available"
      );
    });
  });

  describe("getPaymentByOrderId", () => {
    it("should return payment details for an order", async () => {
      const mockPayment = {
        id: 1,
        orderId: 1,
        userId: 1,
        amount: 5000,
        status: "succeeded",
        stripePaymentIntentId: "pi_test_123",
        stripeCheckoutSessionId: "cs_test_123",
        currency: "EUR",
        metadata: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockDb = {
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([mockPayment]),
            }),
          }),
        }),
      };

      vi.mocked(getDb).mockResolvedValue(mockDb as any);

      const result = await getPaymentByOrderId(1);

      expect(result).toEqual(mockPayment);
    });

    it("should return null if payment not found", async () => {
      const mockDb = {
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([]),
            }),
          }),
        }),
      };

      vi.mocked(getDb).mockResolvedValue(mockDb as any);

      const result = await getPaymentByOrderId(1);

      expect(result).toBeNull();
    });

    it("should throw error if database is not available", async () => {
      vi.mocked(getDb).mockResolvedValue(null);

      await expect(getPaymentByOrderId(1)).rejects.toThrow(
        "Database not available"
      );
    });
  });
});
