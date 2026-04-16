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
          text: "Diese Bedingungen gelten für alle Reservierungen und Käufe auf unserer Website.",
        },
        {
          heading: "2. Reservierungen",
          text: "Reservierungen sind verbindlich nach Bestätigung per E-Mail. Eine Stornierung ist bis 48 Stunden vor dem Event kostenlos möglich.",
        },
        {
          heading: "3. Zahlungsbedingungen",
          text: "Zahlungen sind bei der Reservierung oder vor dem Event fällig. Wir akzeptieren Kreditkarten und Banküberweisung.",
        },
        {
          heading: "4. Altersbestätigung",
          text: "Der Kauf und Konsum von alkoholischen Getränken ist nur für Personen ab 18 Jahren gestattet.",
        },
        {
          heading: "5. Haftung",
          text: "Wir haften nicht für Schäden, die durch die Nutzung unserer Website oder Produkte entstehen.",
        },
        {
          heading: "6. Änderungen",
          text: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern.",
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
