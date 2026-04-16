import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "DE" | "EN" | "KA";

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Über uns",
      subtitle: "Die Geschichte georgischer Weine in Berlin",
      sections: [
        {
          heading: "Unsere Mission",
          text: "Wir bringen die Tradition georgischer Weinkultur nach Berlin und teilen die Leidenschaft für handwerklich gefertigte Weine aus den Bergregionen des Kaukasus.",
        },
        {
          heading: "Qvevri-Tradition",
          text: "Die Qvevri-Methode ist eine 8000 Jahre alte Weinherstellungstechnik, die Georgien einzigartig macht. Wir arbeiten nur mit Winzern zusammen, die diese traditionelle Methode respektieren und bewahren.",
        },
        {
          heading: "Unser Angebot",
          text: "Von klassischen Flaschenweinen bis zu experimentellen Amber Wines bieten wir eine kuratierte Auswahl für Enthusiasten und Neulinge. Jede Flasche erzählt eine Geschichte von Terroir, Handwerk und Tradition.",
        },
        {
          heading: "Gemeinschaft",
          text: "Unsere Tastings und Events schaffen einen Raum für Austausch, Lernen und Genuss. Wir glauben, dass Wein Menschen verbindet.",
        },
      ],
    },
    EN: {
      title: "About Us",
      subtitle: "The Story of Georgian Wine in Berlin",
      sections: [
        {
          heading: "Our Mission",
          text: "We bring the tradition of Georgian wine culture to Berlin, sharing our passion for artisanal wines from the mountain regions of the Caucasus.",
        },
        {
          heading: "Qvevri Tradition",
          text: "The qvevri method is an 8,000-year-old winemaking technique that makes Georgia unique. We work exclusively with winemakers who respect and preserve this traditional method.",
        },
        {
          heading: "Our Selection",
          text: "From classic bottled wines to experimental amber wines, we offer a curated selection for enthusiasts and newcomers alike. Each bottle tells a story of terroir, craftsmanship, and tradition.",
        },
        {
          heading: "Community",
          text: "Our tastings and events create a space for exchange, learning, and enjoyment. We believe that wine connects people.",
        },
      ],
    },
    KA: {
      title: "ჩვენ შესახებ",
      subtitle: "ქართული ღვინის ისტორია ბერლინში",
      sections: [
        {
          heading: "ჩვენი მისია",
          text: "ქართული ღვინის ტრადიციას ბერლინში ვносთ, კავკასიის მთიანი რეგიონებიდან ხელოვნურად დამზადებული ღვინის სიყვარულის გაზიარებით.",
        },
        {
          heading: "ქვევრის ტრადიცია",
          text: "ქვევრის მეთოდი არის 8000 წლის წინანდელი ღვინის დამზადების ტექნიკა, რომელიც ქართველებს უნიკალური ხდის. ჩვენ მხოლოდ იმ მეღვინეებთან ვმუშაობთ, რომლებიც ამ ტრადიციული მეთოდის პატივს სცემენ.",
        },
        {
          heading: "ჩვენი არჩევანი",
          text: "კლასიკური ბოთლიანი ღვინებიდან ექსპერიმენტული ქარვისფერი ღვინებამდე, ჩვენ ვთავაზობთ კურირებული არჩევანი ენთუზიასტებისა და დამწყებთათვის. თითოეული ბოთლი ტერუარის, ხელოვნების და ტრადიციის ისტორიას ამბობს.",
        },
        {
          heading: "საზოგადოება",
          text: "ჩვენი დეგუსტაციები და ღონისძიებები ქმნიან გაცვლის, სწავლის და ღვინის სიამოვნების სივრცეს. ჩვენ გვჯერა, რომ ღვინე ადამიანებს აერთიანებს.",
        },
      ],
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-secondary rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">{lang.subtitle}</h2>
          <div className="w-12 h-1 bg-accent"></div>
        </div>

        <div className="space-y-8">
          {lang.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold mb-3">{section.heading}</h3>
              <p className="text-muted-foreground leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-border">
          <Button
            onClick={() => setLocation("/")}
            className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {language === "DE"
              ? "Zu den Produkten"
              : language === "EN"
              ? "Back to Products"
              : "პროდუქტებზე"}
          </Button>
        </div>
      </div>
    </div>
  );
}
