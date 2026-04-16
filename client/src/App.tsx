import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AgeVerification from "./components/AgeVerification";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Reservation from "./pages/Reservation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Imprint from "./pages/Imprint";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import EventDetail from "./pages/EventDetail";

type Language = "DE" | "EN" | "KA";

interface RouterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

function Router({ language, onLanguageChange }: RouterProps) {
  const HomeWrapper = () => <Home language={language} onLanguageChange={onLanguageChange} />;
  const AboutWrapper = () => <About language={language} />;
  const EventsWrapper = () => <Events language={language} />;
  const BlogWrapper = () => <Blog language={language} />;
  const ReservationWrapper = () => <Reservation language={language} />;
  const PrivacyWrapper = () => <Privacy language={language} />;
  const TermsWrapper = () => <Terms language={language} />;
  const ImprintWrapper = () => <Imprint language={language} />;
  const CheckoutWrapper = () => <Checkout language={language} cartItems={[]} />;
  const ProductsWrapper = () => <Products language={language} />;
  const ShopWrapper = () => <Shop language={language} onLanguageChange={onLanguageChange} />;
  const ProductDetailWrapper = ({ params }: any) => <ProductDetail language={language} productId={params.id} />;
  const EventDetailWrapper = ({ params }: any) => <EventDetail language={language} eventId={params.id} />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Navigation */}
      <Navigation language={language} onLanguageChange={onLanguageChange} cartCount={0} />

      {/* Page Content */}
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={HomeWrapper} />
          <Route path={"/products"} component={ProductsWrapper} />
          <Route path={"/product/:id"} component={ProductDetailWrapper} />
          <Route path={"/shop"} component={ShopWrapper} />
          <Route path={"/event/:id"} component={EventDetailWrapper} />
          <Route path={"/about"} component={AboutWrapper} />
          <Route path={"/events"} component={EventsWrapper} />
          <Route path={"/blog"} component={BlogWrapper} />
          <Route path={"/reservation"} component={ReservationWrapper} />
          <Route path={"/privacy"} component={PrivacyWrapper} />
          <Route path={"/terms"} component={TermsWrapper} />
          <Route path={"/imprint"} component={ImprintWrapper} />
          <Route path={"/checkout"} component={CheckoutWrapper} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
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

import React from "react";
export default App;
