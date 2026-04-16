import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { NotificationProvider, useNotification } from "./NotificationContext";

describe("NotificationContext", () => {
  it("should add a notification", () => {
    const wrapper = ({ children }: any) => (
      <NotificationProvider>{children}</NotificationProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current.addNotification({
        type: "success",
        title: "Test",
        message: "Test message",
      });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].type).toBe("success");
    expect(result.current.notifications[0].title).toBe("Test");
  });

  it("should remove a notification", () => {
    const wrapper = ({ children }: any) => (
      <NotificationProvider>{children}</NotificationProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    let notificationId: string;
    act(() => {
      notificationId = result.current.addNotification({
        type: "error",
        title: "Error",
      });
    });

    expect(result.current.notifications).toHaveLength(1);

    act(() => {
      result.current.removeNotification(notificationId!);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it("should clear all notifications", () => {
    const wrapper = ({ children }: any) => (
      <NotificationProvider>{children}</NotificationProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current.addNotification({ type: "info", title: "Info 1" });
      result.current.addNotification({ type: "warning", title: "Warning 1" });
    });

    expect(result.current.notifications).toHaveLength(2);

    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });
});
