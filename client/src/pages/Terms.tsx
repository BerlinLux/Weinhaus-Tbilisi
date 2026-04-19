import { useLocation } from "wouter";


type Language = "DE" | "EN" | "KA";

interface TermsProps {
  language: Language;
}

export default function Terms({ language }: TermsProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Allgemeine Geschäftsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: April 2026",
      sections: [
        {
          heading: "1. Geltungsbereich",
          text: "Diese AGB gelten für alle Bestellungen und Dienstleistungen von Weinhaus Tbilisi (BerlinLux Gastronomie GmbH).",
        },
        {
          heading: "2. Bestellprozess",
          text: "Bestellungen können online über unsere Website aufgegeben werden. Alle Bestellungen unterliegen unserer Bestätigung.",
        },
        {
          heading: "3. Preise und Zahlungsbedingungen",
          text: "Alle Preise sind in Euro (€) angegeben und enthalten die gesetzliche Mehrwertsteuer. Zahlungen erfolgen über Stripe oder andere sichere Zahlungsmethoden.",
        },
        {
          heading: "4. Lieferung",
          text: "Lieferungen erfolgen nach Verfügbarkeit. Lieferzeiten werden bei der Bestellung angegeben. Wir liefern innerhalb Deutschlands.",
        },
        {
          heading: "5. Rückgaberecht",
          text: "Wein kann aus Sicherheitsgründen nicht zurückgegeben werden. Bei fehlerhaften Produkten kontaktieren Sie uns bitte unter info@weinhaus-tbilisi.de",
        },
        {
          heading: "6. Altersverifikation",
          text: "Der Verkauf von Alkohol ist nur an Personen ab 18 Jahren gestattet. Durch die Nutzung dieser Website bestätigen Sie, dass Sie mindestens 18 Jahre alt sind.",
        },
      ],
    },
    EN: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Scope",
          text: "These terms apply to all reservations and purchases on our website.",
        },
        {
          heading: "2. Reservations",
          text: "Reservations are binding upon email confirmation. Cancellation is free up to 48 hours before the event.",
        },
        {
          heading: "3. Payment Terms",
          text: "Payment is due at reservation or before the event. We accept credit cards and bank transfers.",
        },
        {
          heading: "4. Age Confirmation",
          text: "The purchase and consumption of alcoholic beverages is only permitted for persons 18 years and older.",
        },
        {
          heading: "5. Liability",
          text: "We are not liable for damages arising from the use of our website or products.",
        },
        {
          heading: "6. Changes",
          text: "We reserve the right to change these terms at any time.",
        },
      ],
    },
    KA: {
      title: "ტერმინები და პირობები",
      lastUpdated: "ბოლოს განახლებული: აპრილი 2026",
      sections: [
        {
          heading: "1. მოქმედების ფარი",
          text: "ეს პირობები ვრცელდება ჩვენი ვებსაიტის ყველა რეზერვაციაზე და ყიდვებზე.",
        },
        {
          heading: "2. რეზერვაციები",
          text: "რეზერვაციები ვალდებულია ელ-ფოსტის დადასტურების შემდეგ. გაუქმება უფასოა ღონისძიებამდე 48 საათით ადრე.",
        },
        {
          heading: "3. გადახდის პირობები",
          text: "გადახდა ხდება რეზერვაციის დროს ან ღონისძიებამდე. ჩვენ ვიღებთ საკრედიტო ბარათებს და ბანკის გადარიცხვებს.",
        },
        {
          heading: "4. ასაკის დადასტურება",
          text: "ალკოჰოლური სასმელების ყიდვა და მოხმარება დაშვებულია მხოლოდ 18 წელი და უფროსი ასაკის ადამიანებისთვის.",
        },
        {
          heading: "5. პასუხისმგებლობა",
          text: "ჩვენ არ ვართ პასუხისმგებელი ჩვენი ვებსაიტის ან პროდუქტების გამოყენებიდან წარმოქმნილი ზიანისთვის.",
        },
        {
          heading: "6. ცვლილებები",
          text: "ჩვენ ვიჭირავთ უფლებას ნებისმიერ დროს ეს პირობები შევცვალოთ.",
        },
      ],
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted-foreground mb-8">{lang.lastUpdated}</p>

        <div className="space-y-8">
          {lang.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
