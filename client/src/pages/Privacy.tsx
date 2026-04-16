import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface PrivacyProps {
  language: Language;
}

export default function Privacy({ language }: PrivacyProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: April 2026",
      sections: [
        {
          heading: "1. Verantwortlicher",
          text: "Georgian Wine Berlin, Berlin, Deutschland",
        },
        {
          heading: "2. Erfassung von Daten",
          text: "Wir erfassen personenbezogene Daten nur, wenn Sie diese freiwillig bereitstellen, z.B. durch Reservierungsformulare oder Newsletter-Anmeldungen.",
        },
        {
          heading: "3. Verwendung von Daten",
          text: "Ihre Daten werden nur zur Verarbeitung von Reservierungen, zur Kommunikation und zur Verbesserung unserer Dienstleistungen verwendet.",
        },
        {
          heading: "4. Datenschutz",
          text: "Wir schützen Ihre Daten mit angemessenen technischen und organisatorischen Maßnahmen.",
        },
        {
          heading: "5. Ihre Rechte",
          text: "Sie haben das Recht, Ihre Daten zu überprüfen, zu korrigieren oder zu löschen. Kontaktieren Sie uns unter hello@georgianwine.berlin",
        },
      ],
    },
    EN: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Controller",
          text: "Georgian Wine Berlin, Berlin, Germany",
        },
        {
          heading: "2. Data Collection",
          text: "We collect personal data only when you voluntarily provide it, such as through reservation forms or newsletter subscriptions.",
        },
        {
          heading: "3. Data Usage",
          text: "Your data is used only to process reservations, communicate with you, and improve our services.",
        },
        {
          heading: "4. Data Protection",
          text: "We protect your data with appropriate technical and organizational measures.",
        },
        {
          heading: "5. Your Rights",
          text: "You have the right to review, correct, or delete your data. Contact us at hello@georgianwine.berlin",
        },
      ],
    },
    KA: {
      title: "კონფიდენციალურობის პოლიტიკა",
      lastUpdated: "ბოლოს განახლებული: აპრილი 2026",
      sections: [
        {
          heading: "1. პასუხისმგებელი",
          text: "Georgian Wine Berlin, ბერლინი, გერმანია",
        },
        {
          heading: "2. მონაცემთა შეგროვება",
          text: "ჩვენ ვაგროვებთ პირად მონაცემებს მხოლოდ იმ შემთხვევაში, თუ თქვენ ეს ნებაყოფლობით მოგვაწოდებთ, მაგალითად რეზერვაციის ფორმებით ან ბიულეტენის გამოწერით.",
        },
        {
          heading: "3. მონაცემთა გამოყენება",
          text: "თქვენი მონაცემები გამოიყენება მხოლოდ რეზერვაციების დასამუშავებლად, თქვენთან კომუნიკაციისთვის და ჩვენი სერვისების გაუმჯობესებისთვის.",
        },
        {
          heading: "4. მონაცემთა დაცვა",
          text: "ჩვენ ვიცავთ თქვენს მონაცემებს შესაბამისი ტექნიკური და ორგანიზაციული ზომებით.",
        },
        {
          heading: "5. თქვენი უფლებები",
          text: "თქვენ გაქვთ უფლება გადახედოთ, გასწოროთ ან წაშალოთ თქვენი მონაცემები. დაგვიკავშირდით: hello@georgianwine.berlin",
        },
      ],
    },
  };

  const lang = content[language];

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500 mb-8">{lang.lastUpdated}</p>

        <div className="space-y-8">
          {lang.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {language === "DE"
              ? "Haben Sie Fragen zu unserer Datenschutzerklärung? Kontaktieren Sie uns unter hello@georgianwine.berlin"
              : language === "EN"
              ? "Questions about our privacy policy? Contact us at hello@georgianwine.berlin"
              : "კითხვები ჩვენი კონფიდენციალურობის პოლიტიკის შესახებ? დაგვიკავშირდით: hello@georgianwine.berlin"}
          </p>
        </div>
      </div>
    </div>
  );
}
