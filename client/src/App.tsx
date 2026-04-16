import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AgeVerification from "./components/AgeVerification";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Reservation from "./pages/Reservation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Imprint from "./pages/Imprint";
import Checkout from "./pages/Checkout";

type Language = "DE" | "EN" | "KA";

interface RouterProps {
  language: Language;
}

function Router({ language }: RouterProps) {
  const HomeWrapper = () => <Home language={language} />;
  const AboutWrapper = () => <About language={language} />;
  const EventsWrapper = () => <Events language={language} />;
  const BlogWrapper = () => <Blog language={language} />;
  const ReservationWrapper = () => <Reservation language={language} />;
  const PrivacyWrapper = () => <Privacy language={language} />;
  const TermsWrapper = () => <Terms language={language} />;
  const ImprintWrapper = () => <Imprint language={language} />;
  const CheckoutWrapper = () => <Checkout language={language} cartItems={[]} />;

  return (
    <Switch>
      <Route path={"/"} component={HomeWrapper} />
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
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("EN");
  const [ageVerified, setAgeVerified] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          {!ageVerified && (
            <AgeVerification
              language={language}
              onVerified={() => setAgeVerified(true)}
            />
          )}
          {ageVerified && <Router language={language} />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
