import { useLocation } from "wouter";
import { ArrowLeft, Calendar, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

type Language = "DE" | "EN" | "KA";

interface ReservationProps {
  language: Language;
}

type Event = {
  id: string;
  name: Record<Language, string>;
  date: string;
  price: number;
  seats: number;
  venue: Record<Language, string>;
  image: string;
};

const events: Event[] = [
  {
    id: "amber-masterclass",
    name: {
      DE: "Amber Wine Masterclass",
      EN: "Amber Wine Masterclass",
      KA: "ქარვისფერი ღვინის მასტერკლასი",
    },
    date: "2026-05-14T19:00:00",
    price: 48,
    seats: 18,
    venue: {
      DE: "Charlottenburg, Berlin",
      EN: "Charlottenburg, Berlin",
      KA: "შარლოტენბურგი, ბერლინი",
    },
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp",
  },
  {
    id: "berlin-supper-club",
    name: {
      DE: "Berlin Georgian Supper Club",
      EN: "Berlin Georgian Supper Club",
      KA: "ბერლინის ქართული სუფრის კლუბი",
    },
    date: "2026-05-29T18:30:00",
    price: 89,
    seats: 14,
    venue: {
      DE: "Private Tasting Salon",
      EN: "Private Tasting Salon",
      KA: "პირადი დეგუსტაციის სალონი",
    },
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp",
  },
  {
    id: "trade-portfolio",
    name: {
      DE: "Wholesale Portfolio Preview",
      EN: "Wholesale Portfolio Preview",
      KA: "ჰოლსეილის პორტფოლიოს პრეზენტაცია",
    },
    date: "2026-06-03T15:00:00",
    price: 0,
    seats: 10,
    venue: {
      DE: "Trade Appointment",
      EN: "Trade Appointment",
      KA: "სავაჭრო შეხვედრა",
    },
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-retail-still-life-DuM686XYJ8GdXBZDGB3sKR.webp",
  },
];

export default function Reservation({ language }: ReservationProps) {
  const [, setLocation] = useLocation();
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [attendees, setAttendees] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const labels = {
    DE: {
      title: "Reservierung",
      selectEvent: "Wählen Sie ein Event",
      attendees: "Anzahl der Teilnehmer",
      personalInfo: "Persönliche Informationen",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      totalPrice: "Gesamtpreis",
      perPerson: "pro Person",
      reserve: "Reservierung abschließen",
      back: "Zurück",
      success: "Reservierung erfolgreich!",
      error: "Bitte füllen Sie alle Felder aus",
      noEvent: "Bitte wählen Sie ein Event",
      venue: "Ort",
      date: "Datum",
      free: "Kostenlos",
    },
    EN: {
      title: "Reservation",
      selectEvent: "Select an Event",
      attendees: "Number of Attendees",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      totalPrice: "Total Price",
      perPerson: "per person",
      reserve: "Complete Reservation",
      back: "Back",
      success: "Reservation successful!",
      error: "Please fill in all fields",
      noEvent: "Please select an event",
      venue: "Venue",
      date: "Date",
      free: "Free",
    },
    KA: {
      title: "რეზერვაცია",
      selectEvent: "აირჩიეთ ღონისძიება",
      attendees: "მონაწილეების რაოდენობა",
      personalInfo: "პირადი ინფორმაცია",
      firstName: "სახელი",
      lastName: "გვარი",
      email: "ელ-ფოსტა",
      phone: "ტელეფონი",
      totalPrice: "სულ ღირებულება",
      perPerson: "ერთ ადამიანზე",
      reserve: "რეზერვაციის დასრულება",
      back: "უკან",
      success: "რეზერვაცია წარმატებული!",
      error: "გთხოვთ შეავსოთ ყველა ველი",
      noEvent: "გთხოვთ აირჩიოთ ღონისძიება",
      venue: "ადგილი",
      date: "თარიღი",
      free: "უფასო",
    },
  };

  const lang = labels[language];
  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const totalPrice = selectedEvent ? selectedEvent.price * attendees : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventId) {
      toast.error(lang.noEvent);
      return;
    }

    if (!formData.firstName || !formData.email) {
      toast.error(lang.error);
      return;
    }

    toast.success(lang.success);
    setTimeout(() => setLocation("/"), 2000);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{lang.selectEvent}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden transition ${
                    selectedEventId === event.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={event.image}
                    alt={event.name[language]}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2">
                      {event.name[language]}
                    </h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString(
                          language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.seats}{" "}
                        {language === "DE"
                          ? "Plätze"
                          : language === "EN"
                          ? "seats"
                          : "ადგილი"}
                      </div>
                      {event.price > 0 && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />€{event.price}
                        </div>
                      )}
                      {event.price === 0 && (
                        <div className="text-xs font-medium text-gray-700">
                          {lang.free}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Details and Attendees */}
          {selectedEvent && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">{selectedEvent.name[language]}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">{lang.venue}</p>
                  <p className="font-medium">{selectedEvent.venue[language]}</p>
                </div>
                <div>
                  <p className="text-gray-600">{lang.date}</p>
                  <p className="font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString(
                      language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                    )}
                  </p>
                </div>
              </div>

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang.attendees}
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedEvent.seats}
                  value={attendees}
                  onChange={(e) => setAttendees(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Price Calculation */}
              {selectedEvent.price > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      €{selectedEvent.price} × {attendees} {lang.perPerson}
                    </span>
                    <span className="text-lg font-semibold">€{totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{lang.personalInfo}</h2>
            <div className="space-y-4">
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
                    className="border-gray-200"
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
                    className="border-gray-200"
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
                    className="border-gray-200"
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
                    className="border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
            >
              {lang.reserve}
            </Button>
            <Button
              type="button"
              onClick={() => setLocation("/")}
              variant="outline"
              className="flex-1"
            >
              {lang.back}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
