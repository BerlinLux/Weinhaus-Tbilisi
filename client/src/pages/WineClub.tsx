import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, Gift, Sparkles, Wine } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface WineClubProps {
  language: Language;
}

export default function WineClub({ language }: WineClubProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Weinclub-Mitgliedschaft",
      subtitle: "Werden Sie Teil unserer exklusiven Gemeinschaft von Weinliebhabern",
      description: "Genießen Sie monatliche Verkostungen, spezielle Rabatte, Zugang zu limitierten Weinen und vieles mehr.",
      
      tiers: [
        {
          name: "Bronze",
          price: "29",
          description: "Perfekt zum Einstieg",
          features: [
            "Monatliche Verkostung (1 Flasche)",
            "10% Rabatt auf alle Produkte",
            "Zugang zu exklusiven Events",
            "Newsletter mit Weinempfehlungen",
          ],
        },
        {
          name: "Silber",
          price: "59",
          description: "Für echte Weinliebhaber",
          features: [
            "Monatliche Verkostung (2 Flaschen)",
            "15% Rabatt auf alle Produkte",
            "Priorität bei limitierten Weinen",
            "Einladung zu privaten Tastings",
            "Persönlicher Weinberater",
          ],
          popular: true,
        },
        {
          name: "Gold",
          price: "99",
          description: "Für Weinkenner",
          features: [
            "Monatliche Verkostung (4 Flaschen)",
            "20% Rabatt auf alle Produkte",
            "Erstzugriff auf Neuheiten",
            "Teilnahme an Masterclasses",
            "Persönlicher Weinberater",
            "Kostenloser Versand weltweit",
          ],
        },
      ],
      
      benefits: "Vorteile der Mitgliedschaft",
      joinNow: "Jetzt beitreten",
      learnMore: "Mehr erfahren",
    },
    EN: {
      title: "Wine Club Membership",
      subtitle: "Join our exclusive community of wine enthusiasts",
      description: "Enjoy monthly tastings, special discounts, access to limited wines, and much more.",
      
      tiers: [
        {
          name: "Bronze",
          price: "29",
          description: "Perfect for getting started",
          features: [
            "Monthly tasting (1 bottle)",
            "10% discount on all products",
            "Access to exclusive events",
            "Newsletter with wine recommendations",
          ],
        },
        {
          name: "Silver",
          price: "59",
          description: "For true wine lovers",
          features: [
            "Monthly tasting (2 bottles)",
            "15% discount on all products",
            "Priority access to limited wines",
            "Invitation to private tastings",
            "Personal wine advisor",
          ],
          popular: true,
        },
        {
          name: "Gold",
          price: "99",
          description: "For wine connoisseurs",
          features: [
            "Monthly tasting (4 bottles)",
            "20% discount on all products",
            "First access to new releases",
            "Participation in masterclasses",
            "Personal wine advisor",
            "Free worldwide shipping",
          ],
        },
      ],
      
      benefits: "Membership Benefits",
      joinNow: "Join Now",
      learnMore: "Learn More",
    },
    KA: {
      title: "ღვინის კლუბის წევრობა",
      subtitle: "გახდით ღვინის მოყვარულების ჩვენი ექსკლუზიური საზოგადოების ნაწილი",
      description: "ისიამოვნეთ ყოველთვიური დეგუსტაციებით, სპეციალური ფასდაკლებებით, შეზღუდული ღვინოებზე წვდომით და ბევრი სხვა.",
      
      tiers: [
        {
          name: "ბრინჯაო",
          price: "29",
          description: "სწორი დასაწყებად",
          features: [
            "ყოველთვიური დეგუსტაცია (1 ბოთლი)",
            "10% ფასდაკლება ყველა პროდუქტზე",
            "წვდომა ექსკლუზიურ ღონისძიებებზე",
            "ბიულეტენი ღვინის რეკომენდაციებით",
          ],
        },
        {
          name: "ვერცხლი",
          price: "59",
          description: "ღვინის ჭეშმარიტი მოყვარულებისთვის",
          features: [
            "ყოველთვიური დეგუსტაცია (2 ბოთლი)",
            "15% ფასდაკლება ყველა პროდუქტზე",
            "პრიორიტეტი შეზღუდული ღვინოებზე",
            "მოწვევა პირად დეგუსტაციებზე",
            "პირადი ღვინის კონსულტანტი",
          ],
          popular: true,
        },
        {
          name: "ოქრო",
          price: "99",
          description: "ღვინის ცოდნის მქონე პირებისთვის",
          features: [
            "ყოველთვიური დეგუსტაცია (4 ბოთლი)",
            "20% ფასდაკლება ყველა პროდუქტზე",
            "პირველი წვდომა ახალ გამოშუშვებზე",
            "მონაწილეობა მასტერკლასებში",
            "პირადი ღვინის კონსულტანტი",
            "უფასო მიწოდება მთელ მსოფლიოში",
          ],
        },
      ],
      
      benefits: "წევრობის უპირატესობები",
      joinNow: "ახლა გაწევრიანდი",
      learnMore: "მეტი ინფორმაცია",
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-lg mb-6 mx-auto">
            <Wine className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{lang.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{lang.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{lang.description}</p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {lang.tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-lg border transition ${
                tier.popular
                  ? "border-accent bg-card/50 scale-105 shadow-lg"
                  : "border-border bg-card hover:border-accent"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    {language === "DE" ? "Beliebt" : language === "EN" ? "Popular" : "პოპულარული"}
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground mb-6">{tier.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold">{tier.price}€</span>
                  <span className="text-muted-foreground ml-2">
                    {language === "DE" ? "/Monat" : language === "EN" ? "/month" : "/თვე"}
                  </span>
                </div>

                <Button
                  onClick={() => setLocation("/reservation")}
                  className={`w-full mb-8 ${
                    tier.popular
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "border-border hover:bg-secondary"
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {lang.joinNow}
                </Button>

                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-secondary/50 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">{lang.benefits}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === "DE" ? "Exklusive Verkostungen" : language === "EN" ? "Exclusive Tastings" : "ექსკლუზიური დეგუსტაციები"}
              </h3>
              <p className="text-muted-foreground">
                {language === "DE"
                  ? "Monatliche Verkostungen mit handverlesenen Weinen direkt zu Ihnen nach Hause"
                  : language === "EN"
                  ? "Monthly tastings with hand-selected wines delivered to your door"
                  : "ყოველთვიური დეგუსტაციები ხელით შერჩეული ღვინოებით თქვენ სახლში"}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4 mx-auto">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === "DE" ? "Spezielle Rabatte" : language === "EN" ? "Special Discounts" : "სპეციალური ფასდაკლებები"}
              </h3>
              <p className="text-muted-foreground">
                {language === "DE"
                  ? "Bis zu 20% Rabatt auf alle Produkte und exklusive Mitgliederangebote"
                  : language === "EN"
                  ? "Up to 20% discount on all products and exclusive member offers"
                  : "ყველა პროდუქტზე 20%-მდე ფასდაკლება და ექსკლუზიური წევრების შეთავაზებები"}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === "DE" ? "Gemeinschaft" : language === "EN" ? "Community" : "საზოგადოება"}
              </h3>
              <p className="text-muted-foreground">
                {language === "DE"
                  ? "Treten Sie einer Gemeinschaft von Weinliebhabern bei und teilen Sie Ihre Leidenschaft"
                  : language === "EN"
                  ? "Join a community of wine enthusiasts and share your passion"
                  : "გაწევრიანდით ღვინის მოყვარულების საზოგადოებაში და გაიზიარეთ თქვენი ვნება"}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => setLocation("/reservation")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg font-medium"
          >
            {lang.joinNow}
          </Button>
        </div>
      </div>
    </div>
  );
}
