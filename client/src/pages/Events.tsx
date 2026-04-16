import { useLocation } from "wouter";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Language = "DE" | "EN" | "KA";

interface EventsProps {
  language: Language;
}

const events = [
  {
    id: "amber-masterclass",
    date: "2026-05-14T19:00:00",
    title: {
      DE: "Amber Wine Masterclass",
      EN: "Amber Wine Masterclass",
      KA: "ქარვისფერი ღვინის მასტერკლასი",
    },
    description: {
      DE: "Geführte Verkostung mit Fokus auf Qvevri-Technologie, Textur und Food Pairing.",
      EN: "Guided tasting focused on qvevri technique, texture, and food pairing.",
      KA: "გიდირებული დეგუსტაცია ქვევრის ტექნოლოგიაზე, ტექსტურასა და საკვებთან შეხამებაზე.",
    },
    price: 48,
    seats: 18,
    venue: {
      DE: "Charlottenburg, Berlin",
      EN: "Charlottenburg, Berlin",
      KA: "შარლოტენბურგი, ბერლინი",
    },
    category: "Masterclass",
  },
  {
    id: "berlin-supper-club",
    date: "2026-05-29T18:30:00",
    title: {
      DE: "Berlin Georgian Supper Club",
      EN: "Berlin Georgian Supper Club",
      KA: "ბერლინის ქართული სუფრის კლუბი",
    },
    description: {
      DE: "Ein kuratiertes Abendformat mit mehrgängigem Pairing-Menü und ausgewählten Winzerstories.",
      EN: "A curated dinner experience with a pairing menu and selected winemaker stories.",
      KA: "კურირებული ვახშამი შეხამებული მენიუთი და შერჩეული მეღვინეების ისტორიებით.",
    },
    price: 89,
    seats: 14,
    venue: {
      DE: "Private Tasting Salon",
      EN: "Private Tasting Salon",
      KA: "პირადი დეგუსტაციის სალონი",
    },
    category: "Dinner",
  },
  {
    id: "trade-portfolio",
    date: "2026-06-03T15:00:00",
    title: {
      DE: "Wholesale Portfolio Preview",
      EN: "Wholesale Portfolio Preview",
      KA: "ჰოლსეილის პორტფოლიოს პრეზენტაცია",
    },
    description: {
      DE: "Termin für Restaurants, Händler und HoReCa-Partner mit Preislisten und Sortimentsberatung.",
      EN: "Appointment for restaurants, retailers, and HoReCa partners with price list and portfolio guidance.",
      KA: "შეხვედრა რესტორნებისთვის, რითეილერებისთვის და HoReCa პარტნიორებისთვის.",
    },
    price: 0,
    seats: 10,
    venue: {
      DE: "Trade Appointment",
      EN: "Trade Appointment",
      KA: "სავაჭრო შეხვედრა",
    },
    category: "Trade",
  },
];

export default function Events({ language }: EventsProps) {
  const [, setLocation] = useLocation();

  const labels = {
    DE: {
      title: "Veranstaltungen",
      upcoming: "Kommende Events",
      date: "Datum",
      venue: "Ort",
      seats: "Plätze verfügbar",
      reserve: "Jetzt reservieren",
      back: "Zurück",
    },
    EN: {
      title: "Events",
      upcoming: "Upcoming Events",
      date: "Date",
      venue: "Venue",
      seats: "Seats available",
      reserve: "Reserve Now",
      back: "Back",
    },
    KA: {
      title: "ღონისძიებები",
      upcoming: "მომავალი ღონისძიებები",
      date: "თარიხი",
      venue: "ადგილი",
      seats: "ხელმისაწვდომი ადგილები",
      reserve: "დაჯავშნა",
      back: "უკან",
    },
  };

  const lang = labels[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-light mb-8">{lang.upcoming}</h2>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-border rounded-lg p-6 hover:border-border transition"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {event.category}
                  </Badge>
                  <h3 className="text-xl font-semibold">
                    {event.title[language]}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">€{event.price}</p>
                  {event.price === 0 && (
                    <p className="text-xs text-muted-foreground">
                      {language === "DE"
                        ? "Auf Anfrage"
                        : language === "EN"
                        ? "By request"
                        : "მოთხოვნის საფუძველზე"}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{event.description[language]}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">{lang.date}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString(
                        language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">{lang.venue}</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{event.venue[language]}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">{lang.seats}</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{event.seats}</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => setLocation(`/event/${event.id}`)} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                {lang.reserve}
              </Button>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 bg-secondary rounded-lg text-center">
          <p className="text-muted-foreground mb-4">
            {language === "DE"
              ? "Interessiert an einem privaten Tasting oder einer maßgeschneiderten Veranstaltung?"
              : language === "EN"
              ? "Interested in a private tasting or custom event?"
              : "დაინტერესებული ხართ პირადი დეგუსტაციით ან კასტომ ღონისძიებით?"}
          </p>
          <Button variant="outline">
            {language === "DE"
              ? "Kontakt"
              : language === "EN"
              ? "Contact Us"
              : "დაგვიკავშირდით"}
          </Button>
        </div>
      </div>
    </div>
  );
}
