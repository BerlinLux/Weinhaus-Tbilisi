import { useState } from "react";
import { ShoppingCart, Menu, X, Globe } from "lucide-react";
import { useLocation } from "wouter";

type Language = "DE" | "EN" | "KA";

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount?: number;
}

export default function Navigation({ language, onLanguageChange, cartCount = 0 }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navItems = {
    DE: {
      products: "Produkte",
      shop: "Mägazin & Bar",
      about: "Über uns",
      events: "Events",
      blog: "Blog",
      reservation: "Reservierung",
    },
    EN: {
      products: "Products",
      shop: "Shop & Bar",
      about: "About",
      events: "Events",
      blog: "Blog",
      reservation: "Reservation",
    },
    KA: {
      products: "პროდუქტები",
      shop: "მაღაზია & ბარი",
      about: "ჩვენ შესახებ",
      events: "ღონისძიებები",
      blog: "ბლოგი",
      reservation: "რეზერვაცია",
    },
  };

  const items = navItems[language];

  const handleNavClick = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 bg-accent rounded-sm"></div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">GEORGIAN WINE</h1>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button
            onClick={() => handleNavClick("/products")}
            className="hover:text-accent transition"
          >
            {items.products}
          </button>
          <button
            onClick={() => handleNavClick("/shop")}
            className="hover:text-accent transition"
          >
            {items.shop}
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className="hover:text-accent transition"
          >
            {items.about}
          </button>
          <button
            onClick={() => handleNavClick("/events")}
            className="hover:text-accent transition"
          >
            {items.events}
          </button>
          <button
            onClick={() => handleNavClick("/blog")}
            className="hover:text-accent transition"
          >
            {items.blog}
          </button>
          <button
            onClick={() => handleNavClick("/reservation")}
            className="hover:text-accent transition"
          >
            {items.reservation}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex gap-1 border border-border rounded-lg p-1 bg-secondary">
            {(["DE", "EN", "KA"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-1 text-xs font-medium rounded transition ${
                  language === lang
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Cart */}
          <button
            onClick={() => handleNavClick("/checkout")}
            className="relative p-2 hover:bg-secondary rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-secondary p-4 space-y-3">
          <button
            onClick={() => handleNavClick("/products")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.products}
          </button>
          <button
            onClick={() => handleNavClick("/shop")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.shop}
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.about}
          </button>
          <button
            onClick={() => handleNavClick("/events")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.events}
          </button>
          <button
            onClick={() => handleNavClick("/blog")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.blog}
          </button>
          <button
            onClick={() => handleNavClick("/reservation")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.reservation}
          </button>
        </div>
      )}
    </header>
  );
}
