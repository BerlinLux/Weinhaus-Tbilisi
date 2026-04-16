import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

type Language = "DE" | "EN" | "KA";

interface ReservationProps {
  language: Language;
}

export default function Reservation({ language }: ReservationProps) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
    message: "",
  });

  const labels = {
    DE: {
      title: "Reservierung",
      subtitle: "Buchen Sie Ihren Platz",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      date: "Bevorzugtes Datum",
      guests: "Anzahl der Gäste",
      message: "Nachricht",
      submit: "Reservierung anfragen",
      success: "Vielen Dank! Wir werden uns bald bei Ihnen melden.",
      back: "Zurück",
    },
    EN: {
      title: "Reservation",
      subtitle: "Book Your Spot",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Preferred Date",
      guests: "Number of Guests",
      message: "Message",
      submit: "Request Reservation",
      success: "Thank you! We'll be in touch soon.",
      back: "Back",
    },
    KA: {
      title: "რეზერვაცია",
      subtitle: "დაჯავშნეთ თქვენი ადგილი",
      name: "სახელი",
      email: "ელ-ფოსტა",
      phone: "ტელეფონი",
      date: "სასურველი თარიხი",
      guests: "სტუმრების რაოდენობა",
      message: "შეტყობინება",
      submit: "რეზერვაციის მოთხოვნა",
      success: "გმადლობთ! მალე დაგიკავშირდებით.",
      back: "უკან",
    },
  };

  const lang = labels[language];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang.success);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light mb-2">{lang.subtitle}</h2>
          <p className="text-gray-600">
            {language === "DE"
              ? "Füllen Sie das Formular aus und wir werden Ihre Reservierung bestätigen."
              : language === "EN"
              ? "Fill out the form and we'll confirm your reservation."
              : "შეავსეთ ფორმა და ჩვენ დავადასტურებთ თქვენს რეზერვაციას."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{lang.name}</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{lang.email}</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{lang.phone}</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{lang.date}</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{lang.guests}</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {num} {language === "DE" ? "Gäste" : language === "EN" ? "Guests" : "სტუმრი"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{lang.message}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              placeholder={
                language === "DE"
                  ? "Besondere Wünsche oder Fragen..."
                  : language === "EN"
                  ? "Special requests or questions..."
                  : "სპეციალური მოთხოვნები ან კითხვები..."
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            {lang.submit}
          </Button>
        </form>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">
            {language === "DE"
              ? "Kontakt"
              : language === "EN"
              ? "Contact"
              : "კონტაქტი"}
          </h3>
          <p className="text-sm text-gray-600">
            {language === "DE"
              ? "Oder rufen Sie uns direkt an: +49 (0) 30 12345678"
              : language === "EN"
              ? "Or call us directly: +49 (0) 30 12345678"
              : "ან დაგვიკავშირდით: +49 (0) 30 12345678"}
          </p>
        </div>
      </div>
    </div>
  );
}
