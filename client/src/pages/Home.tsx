import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Gift, Truck, Users } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface HomeProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Home({ language }: HomeProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Weinhaus Tbilisi",
      subtitle: "Authentische georgische Weine aus den Bergregionen des Kaukasus",
      description: "Entdecken Sie 8000 Jahre Weinkultur. Von klassischen Flaschenweinen bis zu experimentellen Amber Wines — jede Flasche erzählt eine Geschichte von Terroir, Handwerk und Tradition.",
      cta: "Zu den Produkten",
      about: "Über uns",
      
      // Promotions
      promotions: "Spezialangebote",
      promo1Title: "Willkommensbonus",
      promo1Desc: "Registrieren Sie sich und erhalten Sie 10% Rabatt auf Ihre erste Bestellung",
      promo2Title: "Mengenrabatt",
      promo2Desc: "Bestellen Sie 6 Flaschen und zahlen Sie nur für 5",
      promo3Title: "Kostenloser Versand",
      promo3Desc: "Bei Bestellungen ab 12 Flaschen versandkostenfrei nach Hause",
      
      // Events
      upcomingEvents: "Kommende Veranstaltungen",
      viewAllEvents: "Alle Events anzeigen",
      
      // Wine Club
      wineClub: "Weinclub-Mitgliedschaft",
      wineClubDesc: "Werden Sie Mitglied unseres exklusiven Weinclubs und genießen Sie monatliche Verkostungen, spezielle Rabatte und Zugang zu limitierten Weinen.",
      joinClub: "Jetzt beitreten",
    },
    EN: {
      title: "Weinhaus Tbilisi",
      subtitle: "Authentic Georgian wines from the mountain regions of the Caucasus",
      description: "Discover 8,000 years of wine culture. From classic bottled wines to experimental amber wines — each bottle tells a story of terroir, craftsmanship, and tradition.",
      cta: "Browse Products",
      about: "About Us",
      
      // Promotions
      promotions: "Special Offers",
      promo1Title: "Welcome Bonus",
      promo1Desc: "Sign up and get 10% off your first order",
      promo2Title: "Bulk Discount",
      promo2Desc: "Order 6 bottles and pay for only 5",
      promo3Title: "Free Shipping",
      promo3Desc: "Free delivery on orders of 12 bottles or more",
      
      // Events
      upcomingEvents: "Upcoming Events",
      viewAllEvents: "View All Events",
      
      // Wine Club
      wineClub: "Wine Club Membership",
      wineClubDesc: "Join our exclusive wine club and enjoy monthly tastings, special discounts, and access to limited-edition wines.",
      joinClub: "Join Now",
    },
    KA: {
      title: "Weinhaus Tbilisi",
      subtitle: "ქართული ღვინო კავკასიის მთიანი რეგიონებიდან",
      description: "აღმოაჩინეთ 8000 წლის ღვინის კულტურა. კლასიკური ბოთლებიდან ექსპერიმენტულ ქარვის ღვინომდე — თითოეული ბოთლი ითხრობს ტერუარის, ხელოვნურობის და ტრადიციის ისტორიას.",
      cta: "პროდუქტები",
      about: "ჩვენ შესახებ",
      
      // Promotions
      promotions: "სპეციალური შეთავაზებები",
      promo1Title: "მისასალმებელი ბონუსი",
      promo1Desc: "დარეგისტრირდით და მიიღეთ 10% ფასდაკლება პირველ შეკვეთაზე",
      promo2Title: "რაოდენობის ფასდაკლება",
      promo2Desc: "შეუკვეთეთ 6 ბოთლი და გადაიხადეთ მხოლოდ 5-ის საფასური",
      promo3Title: "უფასო დელივერი",
      promo3Desc: "12 ბოთლის ზემოთ შეკვეთებზე უფასო ტრანსპორტირება",
      
      // Events
      upcomingEvents: "მოახლოებელი ღონისძიებები",
      viewAllEvents: "ყველა ღონისძიება",
      
      // Wine Club
      wineClub: "ღვინის კლუბის წევრობა",
      wineClubDesc: "გახდით ჩვენი ექსკლუზიური ღვინის კლუბის წევრი და ისიამოვნეთ ყოველთვიური დეგუსტაციებით, სპეციალური ფასდაკლებებით და შეზღუდული გამოშუშვების ღვინოებზე წვდომით.",
      joinClub: "ახლა გაწევრიანდი",
    },
  };

  const lang = content[language];

  const upcomingEventsList = [
    {
      id: "amber-masterclass",
      name_DE: "Amber Wine Masterclass",
      name_EN: "Amber Wine Masterclass",
      name_KA: "ქარვის ღვინის მასტერკლასი",
      date: "2026-05-14",
      price: 48,
    },
    {
      id: "berlin-supper-club",
      name_DE: "Berlin Georgian Supper Club",
      name_EN: "Berlin Georgian Supper Club",
      name_KA: "ბერლინის ქართული სუფრის კლუბი",
      date: "2026-05-29",
      price: 89,
    },
  ];

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

      {/* Promotions Section */}
      <section className="bg-secondary/50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{lang.promotions}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo 1: Registration Discount */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-accent transition">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{lang.promo1Title}</h3>
              <p className="text-muted-foreground mb-6">{lang.promo1Desc}</p>
              <Button
                onClick={() => setLocation("/products")}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {language === "DE" ? "Jetzt registrieren" : language === "EN" ? "Sign Up Now" : "ახლა დარეგისტრირდი"}
              </Button>
            </div>

            {/* Promo 2: Bulk Discount */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-accent transition">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{lang.promo2Title}</h3>
              <p className="text-muted-foreground mb-6">{lang.promo2Desc}</p>
              <Button
                onClick={() => setLocation("/products")}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {language === "DE" ? "Zum Shop" : language === "EN" ? "Shop Now" : "მაღაზიაში"}
              </Button>
            </div>

            {/* Promo 3: Free Shipping */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-accent transition">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{lang.promo3Title}</h3>
              <p className="text-muted-foreground mb-6">{lang.promo3Desc}</p>
              <Button
                onClick={() => setLocation("/products")}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {language === "DE" ? "Zum Shop" : language === "EN" ? "Shop Now" : "მაღაზიაში"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">{lang.upcomingEvents}</h2>
            <Button
              onClick={() => setLocation("/events")}
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              {lang.viewAllEvents} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEventsList.map((event) => (
              <div
                key={event.id}
                onClick={() => setLocation(`/event/${event.id}`)}
                className="bg-card rounded-lg p-8 border border-border hover:border-accent transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {language === "DE" ? event.name_DE : language === "EN" ? event.name_EN : event.name_KA}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(
                        language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                      )}
                    </p>
                  </div>
                  <div className="text-accent font-semibold">{event.price}€</div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation(`/event/${event.id}`);
                  }}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {language === "DE" ? "Details" : language === "EN" ? "Details" : "დეტალები"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Club Section */}
      <section className="bg-secondary/50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-12 border border-border">
            <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-lg mb-6 mx-auto">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">{lang.wineClub}</h2>
            <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {lang.wineClubDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setLocation("/reservation")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-base font-medium"
              >
                {lang.joinClub}
              </Button>
              <Button
                onClick={() => setLocation("/about")}
                variant="outline"
                className="border-border hover:bg-secondary px-8 py-3 text-base font-medium"
              >
                {language === "DE" ? "Mehr erfahren" : language === "EN" ? "Learn More" : "მეტი ინფორმაცია"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Footer */}
      <div className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <p>{language === "DE" ? "Willkommen in der Welt georgischer Weine" : language === "EN" ? "Welcome to Georgian Wine Culture" : "ქართული ღვინის სამყაროში"}</p>
      </div>
    </div>
  );
}
