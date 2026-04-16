import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface HomeProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Home({ language }: HomeProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Georgian Wine Berlin",
      subtitle: "Authentische georgische Weine aus den Bergregionen des Kaukasus",
      description: "Entdecken Sie 8000 Jahre Weinkultur. Von klassischen Flaschenweinen bis zu experimentellen Amber Wines — jede Flasche erzählt eine Geschichte von Terroir, Handwerk und Tradition.",
      cta: "Zu den Produkten",
      about: "Über uns",
    },
    EN: {
      title: "Georgian Wine Berlin",
      subtitle: "Authentic Georgian wines from the mountain regions of the Caucasus",
      description: "Discover 8,000 years of wine culture. From classic bottled wines to experimental amber wines — each bottle tells a story of terroir, craftsmanship, and tradition.",
      cta: "Browse Products",
      about: "About Us",
    },
    KA: {
      title: "Georgian Wine Berlin",
      subtitle: "ქართული ღვინო კავკასიის მთიანი რეგიონებიდან",
      description: "აღმოაჩინეთ 8000 წლის ღვინის კულტურა. კლასიკური ბოთლებიდან ექსპერიმენტულ ქარვის ღვინომდე — თითოეული ბოთლი ითხრობს ტერუარის, ხელოვნურობის და ტრადიციის ისტორიას.",
      cta: "პროდუქტები",
      about: "ჩვენ შესახებ",
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 sm:py-32">
        <div className="max-w-2xl text-center">
          {/* Accent Line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent"></div>
            <span className="text-sm font-medium text-accent uppercase tracking-widest">Georgian Heritage</span>
            <div className="h-px w-8 bg-accent"></div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {lang.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            {lang.subtitle}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 leading-relaxed">
            {lang.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/products")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-base font-medium flex items-center justify-center gap-2"
            >
              {lang.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setLocation("/about")}
              variant="outline"
              className="border-border hover:bg-secondary px-8 py-3 text-base font-medium"
            >
              {lang.about}
            </Button>
          </div>
        </div>
      </section>

      {/* Decorative Footer */}
      <div className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <p>Willkommen in der Welt georgischer Weine | Welcome to Georgian Wine Culture | ქართული ღვინის სამყაროში</p>
      </div>
    </div>
  );
}
