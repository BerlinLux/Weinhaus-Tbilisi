import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart, CartItem } from "./CartContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CartContext - localStorage persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should load cart from localStorage on mount", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Khikhvi Wine",
        price: 29,
        quantity: 2,
        category: "bottle",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual(mockCart);
  });

  it("should save cart to localStorage when items are added", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    const newItem: CartItem = {
      id: "1",
      name: "Saperavi Wine",
      price: 24,
      quantity: 1,
      category: "barrel",
    };

    act(() => {
      result.current.addItem(newItem);
    });

    const savedCart = localStorage.getItem("wine-cart");
    expect(savedCart).toBeDefined();
    expect(JSON.parse(savedCart!)).toContainEqual(newItem);
  });

  it("should update quantity in localStorage", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Rkatsiteli Wine",
        price: 21,
        quantity: 1,
        category: "bottle",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.updateQuantity("1", 3);
    });

    const savedCart = localStorage.getItem("wine-cart");
    const parsedCart = JSON.parse(savedCart!);
    expect(parsedCart[0].quantity).toBe(3);
  });

  it("should remove item from localStorage", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Wine 1",
        price: 20,
        quantity: 1,
        category: "bottle",
      },
      {
        id: "2",
        name: "Wine 2",
        price: 25,
        quantity: 1,
        category: "barrel",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.removeItem("1");
    });

    const savedCart = localStorage.getItem("wine-cart");
    const parsedCart = JSON.parse(savedCart!);
    expect(parsedCart).toHaveLength(1);
    expect(parsedCart[0].id).toBe("2");
  });

  it("should clear cart and localStorage", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Wine",
        price: 20,
        quantity: 1,
        category: "bottle",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    const savedCart = localStorage.getItem("wine-cart");
    expect(JSON.parse(savedCart!)).toEqual([]);
  });

  it("should calculate total correctly", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Wine 1",
        price: 20,
        quantity: 2,
        category: "bottle",
      },
      {
        id: "2",
        name: "Wine 2",
        price: 30,
        quantity: 1,
        category: "barrel",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Total: (20 * 2) + (30 * 1) = 40 + 30 = 70
    expect(result.current.total).toBe(70);
  });

  it("should handle corrupted localStorage data gracefully", () => {
    localStorage.setItem("wine-cart", "invalid json");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
  });

  it("should merge items with same ID when adding", () => {
    const mockCart: CartItem[] = [
      {
        id: "1",
        name: "Wine",
        price: 20,
        quantity: 1,
        category: "bottle",
      },
    ];

    localStorage.setItem("wine-cart", JSON.stringify(mockCart));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    const sameItem: CartItem = {
      id: "1",
      name: "Wine",
      price: 20,
      quantity: 2,
      category: "bottle",
    };

    act(() => {
      result.current.addItem(sameItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });
});
