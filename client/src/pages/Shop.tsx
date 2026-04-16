import { useLocation } from "wouter";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "DE" | "EN" | "KA";

interface ShopProps {
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function Shop({ language, onLanguageChange }: ShopProps) {
  const [, setLocation] = useLocation();

  const labels = {
    DE: {
      title: "Unsere Mägazin & Bar",
      subtitle: "Besuchen Sie uns in Berlin",
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail",
      hours: "Öffnungszeiten",
      website: "Website",
      back: "Zurück",
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
      closed: "Geschlossen",
      openHours: "Geöffnet",
      description: "Willkommen in unserem georgischen Weinfachgeschäft und Bar in Berlin. Entdecken Sie eine kuratierte Auswahl an georgischen Weinen, genießen Sie Verkostungen und erleben Sie die Kultur des georgischen Weins in einer einladenden Atmosphäre.",
      contact: "Kontakt",
      directions: "Wegbeschreibung",
      visitUs: "Besuchen Sie uns",
    },
    EN: {
      title: "Our Shop & Bar",
      subtitle: "Visit Us in Berlin",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Opening Hours",
      website: "Website",
      back: "Back",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      openHours: "Open",
      description: "Welcome to our Georgian wine shop and bar in Berlin. Discover a curated selection of Georgian wines, enjoy tastings, and experience Georgian wine culture in a welcoming atmosphere.",
      contact: "Contact",
      directions: "Directions",
      visitUs: "Visit Us",
    },
    KA: {
      title: "ჩვენი მაღაზია & ბარი",
      subtitle: "ჩვენ გვხვდებით ბერლინში",
      address: "მისამართი",
      phone: "ტელეფონი",
      email: "ელ-ფოსტა",
      hours: "სამუშაო საათები",
      website: "ვებსაიტი",
      back: "უკან",
      monday: "ორშაბათი",
      tuesday: "სამშაბათი",
      wednesday: "ოთხშაბათი",
      thursday: "ხუთშაბათი",
      friday: "პარასკევი",
      saturday: "შაბათი",
      sunday: "კვირა",
      closed: "დახურულია",
      openHours: "ღიმე",
      description: "კეთილი იყოს თქვენი ჩვენი ქართული ღვინის მაღაზიაში და ბარში ბერლინში. აღმოაჩინეთ ქართული ღვინის კურირებული კოლექცია, დეგუსტაციები და ქართული ღვინის კულტურა.",
      contact: "კონტაქტი",
      directions: "მიმართულებები",
      visitUs: "ჩვენ ეწვიეთ",
    },
  };

  const lang = labels[language];

  const shopInfo = {
    address: "Charlottenburg, 10587 Berlin, Germany",
    phone: "+49 (0) 30 12345678",
    email: "info@georgianwine-berlin.de",
    website: "www.georgianwine-berlin.de",
    hours: [
      { day: lang.monday, time: "11:00 - 22:00" },
      { day: lang.tuesday, time: "11:00 - 22:00" },
      { day: lang.wednesday, time: "11:00 - 22:00" },
      { day: lang.thursday, time: "11:00 - 22:00" },
      { day: lang.friday, time: "11:00 - 23:00" },
      { day: lang.saturday, time: "12:00 - 23:00" },
      { day: lang.sunday, time: "12:00 - 21:00" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
          </div>

          {/* Language Selector */}
          <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
            {(["DE", "EN", "KA"] as Language[]).map((lang_code) => (
              <button
                key={lang_code}
                onClick={() => onLanguageChange?.(lang_code)}
                className={`px-2 py-1 text-xs font-medium rounded transition ${
                  language === lang_code
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {lang_code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-light mb-4">{lang.subtitle}</h2>
          <p className="text-gray-600 max-w-2xl">{lang.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Information */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6">{lang.contact}</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{lang.address}</p>
                    <p className="font-medium">{shopInfo.address}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{lang.phone}</p>
                    <a
                      href={`tel:${shopInfo.phone}`}
                      className="font-medium hover:text-gray-600 transition"
                    >
                      {shopInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{lang.email}</p>
                    <a
                      href={`mailto:${shopInfo.email}`}
                      className="font-medium hover:text-gray-600 transition"
                    >
                      {shopInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{lang.website}</p>
                    <a
                      href={`https://${shopInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-gray-600 transition"
                    >
                      {shopInfo.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-semibold mb-6">{lang.hours}</h3>
              <div className="space-y-2">
                {shopInfo.hours.map((hour, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium">{hour.day}</span>
                    <span className="text-sm text-gray-600">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="https://maps.google.com/?q=Charlottenburg+Berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-gray-900 text-white hover:bg-gray-800 w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {lang.directions}
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="bg-gray-100 rounded-lg overflow-hidden h-96 lg:h-full min-h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.4759384881046!2d13.295!3d52.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d5c5c5c5c5%3A0x0!2sCharlottenburg%2C%2010587%20Berlin!5e0!3m2!1sen!2sde!4v1234567890"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">
            {language === "DE"
              ? "Besonderheiten"
              : language === "EN"
              ? "Highlights"
              : "მახასიათებლები"}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              {language === "DE"
                ? "✓ Kuratierte Auswahl georgischer Weine"
                : language === "EN"
                ? "✓ Curated selection of Georgian wines"
                : "✓ ქართული ღვინის კურირებული კოლექცია"}
            </li>
            <li>
              {language === "DE"
                ? "✓ Professionelle Verkostungen und Events"
                : language === "EN"
                ? "✓ Professional tastings and events"
                : "✓ პროფესიონალური დეგუსტაციები და ღონისძიებები"}
            </li>
            <li>
              {language === "DE"
                ? "✓ Gemütliche Bar-Atmosphäre"
                : language === "EN"
                ? "✓ Cozy bar atmosphere"
                : "✓ კომფორტული ბარის ატმოსფერა"}
            </li>
            <li>
              {language === "DE"
                ? "✓ Knowledgeable staff und Beratung"
                : language === "EN"
                ? "✓ Knowledgeable staff and consultation"
                : "✓ ცოდნიანი პერსონალი და კონსულტაცია"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
