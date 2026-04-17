import { useState } from "react";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { getLoginUrl } from "@/const";

type Language = "DE" | "EN" | "KA";

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = {
    DE: {
      products: "Weine",
      about: "Kontakt",
      events: "Veranstaltungen",
      wineClub: "Weinclub",
      login: "Anmelden",
      profile: "Profil",
      logout: "Abmelden",
    },
    EN: {
      products: "Wines",
      about: "Contact",
      events: "Events",
      wineClub: "Wine Club",
      login: "Login",
      profile: "Profile",
      logout: "Logout",
    },
    KA: {
      products: "ღვინე",
      about: "კონტაქტი",
      events: "ღონისძიებები",
      wineClub: "ღვინის კლუბი",
      login: "შესვლა",
      profile: "პროფილი",
      logout: "გამოსვლა",
    },
  };

  const items = navItems[language];

  const handleNavClick = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 bg-accent rounded-sm"></div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Weinhaus Tbilisi</h1>
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
            onClick={() => handleNavClick("/events")}
            className="hover:text-accent transition"
          >
            {items.events}
          </button>
          <button
            onClick={() => handleNavClick("/wine-club")}
            className="hover:text-accent transition"
          >
            {items.wineClub}
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className="hover:text-accent transition"
          >
            {items.about}
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
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              <User className="w-5 h-5" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {items.logout}
                    </button>
                  </>
                ) : (
                  <a
                    href={getLoginUrl()}
                    className="block px-4 py-2 text-sm hover:bg-secondary transition"
                  >
                    {items.login}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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
        <div className="md:hidden border-t border-border bg-secondary/50 px-4 py-4">
          <button
            onClick={() => handleNavClick("/products")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.products}
          </button>
          <button
            onClick={() => handleNavClick("/events")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.events}
          </button>
          <button
            onClick={() => handleNavClick("/wine-club")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.wineClub}
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className="block w-full text-left text-sm hover:text-accent transition"
          >
            {items.about}
          </button>
        </div>
      )}
    </header>
  );
}
