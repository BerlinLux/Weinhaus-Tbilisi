import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import { Loader2 } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface ProfilePageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Profile({ language, onLanguageChange }: ProfilePageProps) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      profile: "Profil",
      email: "E-Mail",
      name: "Name",
      orders: "Bestellungen",
      noOrders: "Keine Bestellungen vorhanden",
      settings: "Einstellungen",
      account: "Kontoeinstellungen",
      loading: "Wird geladen...",
      loginRequired: "Bitte melden Sie sich an, um Ihr Profil zu sehen",
    },
    EN: {
      profile: "Profile",
      email: "Email",
      name: "Name",
      orders: "Orders",
      noOrders: "No orders yet",
      settings: "Settings",
      account: "Account Settings",
      loading: "Loading...",
      loginRequired: "Please log in to view your profile",
    },
    KA: {
      profile: "პროფილი",
      email: "ელფოსტა",
      name: "სახელი",
      orders: "შეკვეთები",
      noOrders: "შეკვეთები არ არის",
      settings: "პარამეტრები",
      account: "ანგარიშის პარამეტრები",
      loading: "იტვირთება...",
      loginRequired: "გთხოვთ შეხვიდეთ თქვენი პროფილის სახელმწიფოთი",
    },
  };

  const lang = content[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation language={language} onLanguageChange={onLanguageChange} />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation language={language} onLanguageChange={onLanguageChange} />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-secondary border border-border rounded-lg p-8 text-center">
            <p className="text-lg text-foreground mb-6">{lang.loginRequired}</p>
            <a
              href={`/api/oauth/callback?returnPath=/profile`}
              className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition"
            >
              {lang.profile}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation language={language} onLanguageChange={onLanguageChange} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-secondary border border-border rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">{lang.profile}</h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">{lang.name}</label>
              <p className="text-lg text-foreground font-medium">{user.name || "—"}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">{lang.email}</label>
              <p className="text-lg text-foreground font-medium">{user.email || "—"}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-secondary border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">{lang.orders}</h2>

          <div className="text-center py-12">
            <p className="text-muted-foreground">{lang.noOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
