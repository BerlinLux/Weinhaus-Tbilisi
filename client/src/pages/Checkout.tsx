import { useLocation } from "wouter";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

type Language = "DE" | "EN" | "KA";

interface CheckoutProps {
  language: Language;
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  onCheckout?: (data: any) => void;
}

export default function Checkout({
  language,
  cartItems = [],
  onCheckout,
}: CheckoutProps) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Germany",
  });

  const [quantities, setQuantities] = useState<Record<string, number>>(
    cartItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.quantity,
      }),
      {}
    )
  );

  const labels = {
    DE: {
      title: "Kasse",
      orderSummary: "Bestellübersicht",
      shippingInfo: "Versandinformationen",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      address: "Adresse",
      city: "Stadt",
      postalCode: "Postleitzahl",
      country: "Land",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      total: "Gesamt",
      completeOrder: "Bestellung abschließen",
      back: "Zurück zum Warenkorb",
      empty: "Ihr Warenkorb ist leer",
    },
    EN: {
      title: "Checkout",
      orderSummary: "Order Summary",
      shippingInfo: "Shipping Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      city: "City",
      postalCode: "Postal Code",
      country: "Country",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      completeOrder: "Complete Order",
      back: "Back to Cart",
      empty: "Your cart is empty",
    },
    KA: {
      title: "გადახდა",
      orderSummary: "შეკვეთის შეჯამება",
      shippingInfo: "ტრანსპორტირების ინფორმაცია",
      firstName: "სახელი",
      lastName: "გვარი",
      email: "ელ-ფოსტა",
      phone: "ტელეფონი",
      address: "მისამართი",
      city: "ქალაქი",
      postalCode: "ფოსტის კოდი",
      country: "ქვეყანა",
      subtotal: "ჯამი",
      shipping: "ტრანსპორტირება",
      total: "სულ",
      completeOrder: "შეკვეთის დასრულება",
      back: "კალათში დაბრუნება",
      empty: "თქვენი კალათი ცარიელია",
    },
  };

  const lang = labels[language];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || item.quantity),
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.address) {
      toast.error(
        language === "DE"
          ? "Bitte füllen Sie alle erforderlichen Felder aus"
          : language === "EN"
          ? "Please fill in all required fields"
          : "გთხოვთ შეავსოთ ყველა აუცილებელი ველი"
      );
      return;
    }

    toast.success(
      language === "DE"
        ? "Bestellung aufgegeben! Vielen Dank."
        : language === "EN"
        ? "Order placed! Thank you."
        : "შეკვეთა მიღებულია! გმადლობთ."
    );

    if (onCheckout) {
      onCheckout({
        ...formData,
        items: cartItems.map((item) => ({
          ...item,
          quantity: quantities[item.id] || item.quantity,
        })),
        total,
      });
    }

    setTimeout(() => setLocation("/"), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border sticky top-0 z-40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground mb-6">{lang.empty}</p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {language === "DE"
              ? "Zum Einkaufen"
              : language === "EN"
              ? "Continue Shopping"
              : "ყიდვის გაგრძელება"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">{lang.shippingInfo}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.firstName}
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.lastName}
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.email}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.phone}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang.address}
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="border-border"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.city}
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.postalCode}
                  </label>
                  <Input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang.country}
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  >
                    <option>Germany</option>
                    <option>Austria</option>
                    <option>Switzerland</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-6"
              >
                {lang.completeOrder}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">{lang.orderSummary}</h3>

              <div className="space-y-3 mb-6 border-b border-border pb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center">
                          {quantities[item.id] || item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium">
                      €{(item.price * (quantities[item.id] || item.quantity)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{lang.subtotal}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang.shipping}</span>
                  <span>{shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t border-border pt-2">
                  <span>{lang.total}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
