import { useNotification } from "@/contexts/NotificationContext";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-lg border ${getBackgroundColor(
            notification.type
          )} animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
          <div className="flex-1">
            <h3 className={`font-semibold ${getTextColor(notification.type)}`}>
              {notification.title}
            </h3>
            {notification.message && (
              <p className={`text-sm mt-1 ${getTextColor(notification.type)}`}>
                {notification.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
