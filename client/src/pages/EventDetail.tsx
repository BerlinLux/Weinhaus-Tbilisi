import { useState } from "react";
import { useLocation } from "wouter";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Language = "DE" | "EN" | "KA";

interface EventDetailProps {
  language: Language;
  eventId?: string;
}

type Event = {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
  time: string;
  venue: Record<Language, string>;
  price: number;
  seats: number;
  availableSeats: number;
  image: string;
};

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "amber-masterclass",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp",
    price: 48,
    date: "2026-05-14",
    time: "19:00",
    seats: 18,
    availableSeats: 8,
    venue: {
      DE: "Charlottenburg, Berlin",
      EN: "Charlottenburg, Berlin",
      KA: "შარლოტენბურგი, ბერლინი",
    },
    name: {
      DE: "Amber Wine Masterclass",
      EN: "Amber Wine Masterclass",
      KA: "ქარვისფერი ღვინის მასტერკლასი",
    },
    description: {
      DE: "Geführte Verkostung mit Fokus auf Qvevri-Technologie, Textur und Food Pairing.",
      EN: "Guided tasting focused on qvevri technique, texture, and food pairing.",
      KA: "გიდირებული დეგუსტაცია ქვევრის ტექნოლოგიაზე, ტექსტურასა და საკვებთან შეხამებაზე.",
    },
  },
  // Add more events as needed
];

const labels = {
  DE: {
    reserve: "Reservieren",
    availableSeats: "Verfügbare Plätze",
    totalSeats: "Gesamtplätze",
    date: "Datum",
    time: "Uhrzeit",
    venue: "Veranstaltungsort",
    price: "Preis",
    backToEvents: "Zurück zu Events",
    reserved: "Reservierung erfolgreich!",
  },
  EN: {
    reserve: "Reserve",
    availableSeats: "Available Seats",
    totalSeats: "Total Seats",
    date: "Date",
    time: "Time",
    venue: "Venue",
    price: "Price",
    backToEvents: "Back to Events",
    reserved: "Reservation successful!",
  },
  KA: {
    reserve: "დაჯავშნა",
    availableSeats: "ხელმისაწვდომი ადგილები",
    totalSeats: "სულ ადგილები",
    date: "თარიხი",
    time: "დრო",
    venue: "ადგილი",
    price: "ფასი",
    backToEvents: "ღონისძიებებში დაბრუნება",
    reserved: "დაჯავშნა წარმატებული!",
  },
};

export default function EventDetail({ language, eventId }: EventDetailProps) {
  const [, setLocation] = useLocation();

  // Find the event by ID
  const event = sampleEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ღონისძიება არ მოიძებნა</h1>
          <Button onClick={() => setLocation("/events")}>
            {labels[language].backToEvents}
          </Button>
        </div>
      </div>
    );
  }

  const lang = labels[language];

  const handleReserve = () => {
    if (event.availableSeats > 0) {
      toast.success(lang.reserved);
      setLocation("/reservation");
    } else {
      toast.error("ადგილები დასრულებულია");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-secondary rounded-lg overflow-hidden h-96">
            <img
              src={event.image}
              alt={event.name[language]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.name[language]}</h1>
              <p className="text-muted-foreground">{event.description[language]}</p>
            </div>

            {/* Info Grid */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold">{lang.date}</p>
                  <p className="text-muted-foreground">{event.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold">{lang.time}</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold">{lang.venue}</p>
                  <p className="text-muted-foreground">{event.venue[language]}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold">{lang.availableSeats}</p>
                  <p className="text-muted-foreground">
                    {event.availableSeats} / {event.seats}
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-accent">
              €{event.price.toFixed(2)} {lang.price}
            </div>

            {/* Reserve Button */}
            <Button
              onClick={handleReserve}
              disabled={event.availableSeats === 0}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {event.availableSeats > 0 ? lang.reserve : "სრულად დაკომპლექტებული"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
