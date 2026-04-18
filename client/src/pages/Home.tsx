import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wine, Calendar, Users, Search } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface HomeProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Home({ language }: HomeProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      welcome: "Willkommen bei Weinhaus Tbilisi",
      tagline: "Authentische georgische Weine seit 8000 Jahren",
      browseWines: "Weine durchsuchen",
      
      mainCategories: "Hauptkategorien",
      wines: "Weine",
      winesDesc: "Entdecken Sie unsere Auswahl an authentischen georgischen Weinen",
      events: "Veranstaltungen",
      eventsDesc: "Treten Sie unseren Verkostungen und Weinabenden bei",
      club: "Weinclub",
      clubDesc: "Werden Sie Mitglied und genießen Sie exklusive Vorteile",
      
      specialOffers: "Spezialangebote",
      offer1: "10% Rabatt für neue Kunden",
      offer2: "6 Flaschen = Preis für 5",
      offer3: "Kostenloser Versand ab 12 Flaschen",
      
      upcomingEvents: "Kommende Veranstaltungen",
      viewAll: "Alle anzeigen",
      
      aboutUs: "Über Weinhaus Tbilisi",
      aboutDesc: "Wir bringen die authentische Weinkultur Georgiens nach Berlin. Jede Flasche erzählt eine Geschichte von Tradition, Handwerk und Leidenschaft.",
      learnMore: "Mehr erfahren",
    },
    EN: {
      welcome: "Welcome to Weinhaus Tbilisi",
      tagline: "Authentic Georgian wines for 8,000 years",
      browseWines: "Browse wines",
      
      mainCategories: "Main Categories",
      wines: "Wines",
      winesDesc: "Discover our selection of authentic Georgian wines",
      events: "Events",
      eventsDesc: "Join our tastings and wine evenings",
      club: "Wine Club",
      clubDesc: "Become a member and enjoy exclusive benefits",
      
      specialOffers: "Special Offers",
      offer1: "10% discount for new customers",
      offer2: "Buy 6 bottles, pay for 5",
      offer3: "Free shipping on orders of 12+ bottles",
      
      upcomingEvents: "Upcoming Events",
      viewAll: "View all",
      
      aboutUs: "About Weinhaus Tbilisi",
      aboutDesc: "We bring the authentic wine culture of Georgia to Berlin. Each bottle tells a story of tradition, craftsmanship, and passion.",
      learnMore: "Learn more",
    },
    KA: {
      welcome: "კეთილი იყოს თქვენი მობრძანება Weinhaus Tbilisi-ში",
      tagline: "ქართული ღვინის აუთენტური კულტურა 8000 წელი",
      browseWines: "ღვინის ნახვა",
      
      mainCategories: "მთავარი კატეგორიები",
      wines: "ღვინე",
      winesDesc: "აღმოაჩინეთ ქართული ღვინის აუთენტური კოლექცია",
      events: "ღონისძიებები",
      eventsDesc: "მონაწილეობა მიიღეთ დეგუსტაციებსა და ღვინის საღამოებში",
      club: "ღვინის კლუბი",
      clubDesc: "გახდით წევრი და ისიამოვნეთ ექსკლუზიური უპირატესობებით",
      
      specialOffers: "სპეციალური შეთავაზებები",
      offer1: "10% ფასდაკლება ახალი მომხმარებლებისთვის",
      offer2: "6 ბოთლი = 5 ბოთლის ფასი",
      offer3: "უფასო ტრანსპორტირება 12+ ბოთლიდან",
      
      upcomingEvents: "მომავალი ღონისძიებები",
      viewAll: "ყველა ნახვა",
      
      aboutUs: "Weinhaus Tbilisi-ს შესახებ",
      aboutDesc: "ჩვენ ქართული ღვინის აუთენტურ კულტურას ბერლინში მოვიტანთ. თითოეული ბოთლი ტრადიციის, ხელოვნებისა და ვნების ისტორია ეუბნება.",
      learnMore: "მეტი ინფორმაცია",
    },
  };

  const lang = content[language];

  const upcomingEventsList = [
    {
      id: "amber-masterclass",
      name_DE: "Amber Wine Masterclass",
      name_EN: "Amber Wine Masterclass",
      name_KA: "ქარვისფერი ღვინის მასტერკლასი",
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      {/* Hero Section - Enhanced with 3D Effects */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-display">{lang.welcome}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-body-large">{lang.tagline}</p>
          <Button
            onClick={() => setLocation("/products")}
            size="lg"
            className="btn-premium px-8 py-3 text-lg"
          >
            {lang.browseWines}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Decorative Vine Divider */}
      <div className="flex justify-center py-8 px-4">
        <img
          src="https://d36hbw14aib5lz.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/vine-border-divider-iZykBHa3ibBuvpmcfHBmwG.webp"
          alt="Decorative vine divider"
          className="max-w-2xl w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Main Categories - Enhanced 3D Cards */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-headline">{lang.mainCategories}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wines Card */}
            <button
              onClick={() => setLocation("/products")}
              className="card-3d bg-card rounded-lg p-8 border border-accent-subtle text-left group"
            >
              <div className="relative mb-4">
                <Wine className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-headline">{lang.wines}</h3>
              <p className="text-muted-foreground text-body">{lang.winesDesc}</p>
            </button>

            {/* Events Card */}
            <button
              onClick={() => setLocation("/events")}
              className="card-3d bg-card rounded-lg p-8 border border-accent-subtle text-left group"
            >
              <div className="relative mb-4">
                <Calendar className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-headline">{lang.events}</h3>
              <p className="text-muted-foreground text-body">{lang.eventsDesc}</p>
            </button>

            {/* Wine Club Card */}
            <button
              onClick={() => setLocation("/wine-club")}
              className="card-3d bg-card rounded-lg p-8 border border-accent-subtle text-left group"
            >
              <div className="relative mb-4">
                <Users className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-headline">{lang.club}</h3>
              <p className="text-muted-foreground text-body">{lang.clubDesc}</p>
            </button>
          </div>
        </div>
      </section>

      {/* Special Offers - Enhanced with Accent */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-headline">{lang.specialOffers}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-3d bg-accent/5 rounded-lg p-6 border-l-4 border-accent hover:bg-accent/10">
              <p className="text-lg font-semibold text-body">{lang.offer1}</p>
            </div>
            <div className="card-3d bg-accent/5 rounded-lg p-6 border-l-4 border-accent hover:bg-accent/10">
              <p className="text-lg font-semibold text-body">{lang.offer2}</p>
            </div>
            <div className="card-3d bg-accent/5 rounded-lg p-6 border-l-4 border-accent hover:bg-accent/10">
              <p className="text-lg font-semibold text-body">{lang.offer3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Georgian Cross */}
      <div className="flex justify-center py-8 px-4">
        <img
          src="https://d36hbw14aib5lz.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-cross-pattern-Evqee59naNsSSMGmJHM6ca.webp"
          alt="Georgian cross pattern"
          className="w-24 h-24 opacity-60 hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Upcoming Events - Enhanced with 3D Effects */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-headline">{lang.upcomingEvents}</h2>
            <Button
              onClick={() => setLocation("/events")}
              variant="outline"
              className="border-border hover:bg-secondary transition-smooth"
            >
              {lang.viewAll} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEventsList.map((event) => (
              <button
                key={event.id}
                onClick={() => setLocation(`/event/${event.id}`)}
                className="card-3d bg-card rounded-lg p-6 border border-accent-subtle text-left"
              >
                <h3 className="text-xl font-bold mb-2 text-headline">
                  {language === "DE" ? event.name_DE : language === "EN" ? event.name_EN : event.name_KA}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 text-caption">
                  {new Date(event.date).toLocaleDateString(
                    language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                  )}
                </p>
                <p className="text-accent font-bold text-body">{event.price}€</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced with Decorative Elements */}
      <section className="py-16 px-4 relative">
        {/* Decorative vine leaves background */}
        <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
          <img
            src="https://d36hbw14aib5lz.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-vine-leaves-8wF3e3ZvJsoduugLQHiN4G.webp"
            alt="Decorative vine"
            className="w-48 h-48"
          />
        </div>
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <img
            src="https://d36hbw14aib5lz.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-vine-leaves-8wF3e3ZvJsoduugLQHiN4G.webp"
            alt="Decorative vine"
            className="w-48 h-48 transform scale-x-[-1]"
          />
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-headline">{lang.aboutUs}</h2>
          <p className="text-lg text-muted-foreground mb-8 text-body-large">{lang.aboutDesc}</p>
          <Button
            onClick={() => setLocation("/about")}
            className="btn-premium"
          >
            {lang.learnMore}
          </Button>
        </div>
      </section>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </div>
  );
}
