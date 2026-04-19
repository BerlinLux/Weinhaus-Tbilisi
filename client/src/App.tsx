import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotificationContainer } from "./components/NotificationContainer";
import { ThemeProvider } from "./contexts/ThemeContext";
import AgeVerification from "./components/AgeVerification";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Reservation from "./pages/Reservation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Imprint from "./pages/Imprint";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import WineClub from "./pages/WineClub";
import PaymentHistory from "./pages/PaymentHistory";

type Language = "DE" | "EN" | "KA";

interface RouterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

function Router({ language, onLanguageChange }: RouterProps) {
  const AboutWrapper = () => <About language={language} />;
  const EventsWrapper = () => <Events language={language} />;
  const BlogWrapper = () => <Blog language={language} />;
  const BlogDetailWrapper = ({ params }: any) => <BlogDetail language={language} articleId={params.id} />;
  const ReservationWrapper = () => <Reservation language={language} />;
  const PrivacyWrapper = () => <Privacy language={language} />;
  const TermsWrapper = () => <Terms language={language} />;
  const ImprintWrapper = () => <Imprint language={language} />;
  const CheckoutWrapper = () => <Checkout language={language} />;
  const ProductsWrapper = () => <Products language={language} />;
  const ShopWrapper = () => <Shop language={language} onLanguageChange={onLanguageChange} />;
  const ProductDetailWrapper = ({ params }: any) => <ProductDetail language={language} productId={params.id} />;
  const EventDetailWrapper = ({ params }: any) => <EventDetail language={language} eventId={params.id} />;
  const ProfileWrapper = () => <Profile language={language} onLanguageChange={onLanguageChange} />;
  const WineClubWrapper = () => <WineClub language={language} />;
  const PaymentHistoryWrapper = () => <PaymentHistory />;
  const NavigationWrapper = () => <Navigation language={language} onLanguageChange={onLanguageChange} />;

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationWrapper />
      {/* Page Content */}
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/products"} component={ProductsWrapper} />
          <Route path={"/product/:id"} component={ProductDetailWrapper} />
          <Route path={"/shop"} component={ShopWrapper} />
          <Route path={"/event/:id"} component={EventDetailWrapper} />
          <Route path={"/about"} component={AboutWrapper} />
          <Route path={"/events"} component={EventsWrapper} />
          <Route path={"/blog"} component={BlogWrapper} />
          <Route path={"/blog/:id"} component={BlogDetailWrapper} />
          <Route path={"/wine-club"} component={WineClubWrapper} />
          <Route path={"/reservation"} component={ReservationWrapper} />
          <Route path={"/privacy"} component={PrivacyWrapper} />
          <Route path={"/terms"} component={TermsWrapper} />
          <Route path={"/imprint"} component={ImprintWrapper} />
          <Route path={"/checkout"} component={CheckoutWrapper} />
          <Route path={"/profile"} component={ProfileWrapper} />
          <Route path={"/payment-history"} component={PaymentHistoryWrapper} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background text-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold mb-4">{language === 'DE' ? 'Navigation' : language === 'EN' ? 'Navigation' : 'ნავიგაცია'}</h3>
              <div className="space-y-2">
                <a href="/products" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'Produkte' : language === 'EN' ? 'Products' : 'პროდუქტები'}
                </a>
                <a href="/events" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'Events' : language === 'EN' ? 'Events' : 'ღონისძიებები'}
                </a>
                <a href="/blog" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'Blog' : language === 'EN' ? 'Blog' : 'ბლოგი'}
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">{language === 'DE' ? 'Rechtliches' : language === 'EN' ? 'Legal' : 'იურიდიული'}</h3>
              <div className="space-y-2">
                <a href="/privacy" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'Datenschutz' : language === 'EN' ? 'Privacy' : 'კონფიდენციალობა'}
                </a>
                <a href="/terms" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'AGB' : language === 'EN' ? 'Terms' : 'პირობები'}
                </a>
                <a href="/imprint" className="block text-sm text-muted-foreground hover:text-accent transition">
                  {language === 'DE' ? 'Impressum' : language === 'EN' ? 'Imprint' : 'ინფორმაცია'}
                </a>
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-semibold mb-4">{language === 'DE' ? 'Information' : language === 'EN' ? 'Information' : 'ინფორმაცია'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'DE' ? 'Georgischer Wein in Berlin' : language === 'EN' ? 'Georgian Wine in Berlin' : 'ქართული ღვინო ბერლინში'}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Georgian Wine Berlin. {language === 'DE' ? 'Alle Rechte vorbehalten.' : language === 'EN' ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [language, setLanguage] = React.useState<Language>("DE");
  const [isVerified, setIsVerified] = React.useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <NotificationContainer />
          {!isVerified ? (
            <AgeVerification language={language} onVerified={() => setIsVerified(true)} />
          ) : (
            <Router language={language} onLanguageChange={setLanguage} />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
