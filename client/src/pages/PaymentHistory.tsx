import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";


export default function PaymentHistory() {
  const { user, loading: authLoading } = useAuth();
  const { data: payments, isLoading } = trpc.payment.paymentHistory.useQuery(
    undefined,
    { enabled: !!user }
  );

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Payment History</h1>
          <p className="text-gray-600 mb-8">
            Please log in to view your payment history.
          </p>
          <Button className="btn-primary">Log In</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "succeeded":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "canceled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "succeeded":
        return "Completed";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Payment History</h1>
      <p className="text-gray-600 mb-8">
        View all your payments and transaction details
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : !payments || payments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              No payments found. Start shopping to see your payment history here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              className="hover:shadow-lg transition-shadow card-3d"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{payment.orderId}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusLabel(payment.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gold">
                      €{(payment.amount / 100).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-mono text-sm break-all">
                      {(payment.stripePaymentIntentId || "").substring(0, 20)}...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
