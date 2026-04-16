/*
Vault & Gold Design — Georgian Wine Berlin
Dark luxury palette with Vault (deep black) and Gold accents.
Focus: elegance, sophistication, premium aesthetic.
*/

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Search,
  ShoppingCart,
  Filter,
  X,
  ChevronDown,
  Globe,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Language = "DE" | "EN" | "KA";
type ProductCategory = "bottle" | "barrel" | "qvevri" | "voucher";

type Product = {
  id: string;
  category: ProductCategory;
  name: Record<Language, string>;
  price: number;
  region: string;
  image: string;
  featured?: boolean;
};

type Event = {
  id: string;
  name: Record<Language, string>;
  date: string;
  price: number;
  seats: number;
  image: string;
};

const products: Product[] = [
  {
    id: "khikhvi-amber",
    category: "qvevri",
    name: {
      DE: "Khikhvi Qvevri Reserve",
      EN: "Khikhvi Qvevri Reserve",
      KA: "ხიხვი ქვევრი რეზერვი",
    },
    price: 29,
    region: "Kakheti",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-qvevri-cellar-premium-7swrbauHewG7H2Eikp5s63.webp",
    featured: true,
  },
  {
    id: "saperavi-barrel",
    category: "barrel",
    name: {
      DE: "Saperavi aus dem Fass",
      EN: "Barrel Saperavi",
      KA: "საფერავი კასრიდან",
    },
    price: 24,
    region: "Kakheti",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp",
    featured: true,
  },
  {
    id: "rkatsiteli-classic",
    category: "bottle",
    name: {
      DE: "Rkatsiteli Estate Selection",
      EN: "Rkatsiteli Estate Selection",
      KA: "რქაწითელი ესთეით სელექშენ",
    },
    price: 21,
    region: "Kartli",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-retail-still-life-DuM686XYJ8GdXBZDGB3sKR.webp",
    featured: true,
  },
  {
    id: "mtsvane-amber",
    category: "qvevri",
    name: {
      DE: "Mtsvane Clay Selection",
      EN: "Mtsvane Clay Selection",
      KA: "მწვანე კლეი სელექშენ",
    },
    price: 31,
    region: "Imereti",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-qvevri-cellar-premium-7swrbauHewG7H2Eikp5s63.webp",
  },
  {
    id: "rose-tavkveri",
    category: "bottle",
    name: {
      DE: "Tavkveri Rosé Berlin Edition",
      EN: "Tavkveri Rosé Berlin Edition",
      KA: "თავკვერი როზე ბერლინ ედიშენ",
    },
    price: 19,
    region: "Kakheti",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-retail-still-life-DuM686XYJ8GdXBZDGB3sKR.webp",
  },
];

const events: Event[] = [
  {
    id: "amber-masterclass",
    name: {
      DE: "Amber Wine Masterclass",
      EN: "Amber Wine Masterclass",
      KA: "ქარვისფერი ღვინის მასტერკლასი",
    },
    date: "2026-05-14",
    price: 48,
    seats: 18,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp",
  },
  {
    id: "berlin-supper-club",
    name: {
      DE: "Berlin Georgian Supper Club",
      EN: "Berlin Georgian Supper Club",
      KA: "ბერლინის ქართული სუფრის კლუბი",
    },
    date: "2026-05-29",
    price: 89,
    seats: 14,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp",
  },
];

interface HomeProps {
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function Home({ language, onLanguageChange }: HomeProps) {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const regions = useMemo(
    () => Array.from(new Set(products.map((p) => p.region))),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))) as ProductCategory[],
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name[language]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || p.region === selectedRegion;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory, language]);

  const addToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${productName} added to cart`);
  };

  const getCategoryLabel = (cat: ProductCategory) => {
    const labels: Record<ProductCategory, Record<Language, string>> = {
      bottle: { DE: "Flasche", EN: "Bottle", KA: "ბოთლი" },
      barrel: { DE: "Fass", EN: "Barrel", KA: "კასრი" },
      qvevri: { DE: "Qvevri", EN: "Qvevri", KA: "ქვევრი" },
      voucher: { DE: "Gutschein", EN: "Voucher", KA: "ვაუჩერი" },
    };
    return labels[cat][language];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm"></div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">GEORGIAN WINE</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="/products" className="hover:text-accent transition">
              {language === "DE" ? "Produkte" : language === "EN" ? "Products" : "პროდუქტები"}
            </a>
            <a href="/shop" className="hover:text-accent transition">
              {language === "DE" ? "Mägazin & Bar" : language === "EN" ? "Shop & Bar" : "მაღაზია & ბარი"}
            </a>
            <a href="/about" className="hover:text-accent transition">
              {language === "DE" ? "Über uns" : language === "EN" ? "About" : "ჩვენ შესათაბ"}
            </a>
            <a href="/events" className="hover:text-accent transition">
              {language === "DE" ? "Events" : language === "EN" ? "Events" : "ღონისძიებები"}
            </a>
            <a href="/blog" className="hover:text-accent transition">
              {language === "DE" ? "Blog" : language === "EN" ? "Blog" : "ბლოგი"}
            </a>
            <a href="/reservation" className="hover:text-accent transition">
              {language === "DE" ? "Reservierung" : language === "EN" ? "Reservation" : "რეზერვაცია"}
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex gap-1 border border-border rounded-lg p-1 bg-secondary">
              {(["DE", "EN", "KA"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange?.(lang)}
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
            <button className="relative p-2 hover:bg-secondary rounded-lg transition">
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
            <a href="/products" className="block text-sm hover:text-accent">
              {language === "DE" ? "Produkte" : language === "EN" ? "Products" : "პროდუქტები"}
            </a>
            <a href="/shop" className="block text-sm hover:text-accent">
              {language === "DE" ? "Mägazin & Bar" : language === "EN" ? "Shop & Bar" : "მაღაზია & ბარი"}
            </a>
            <a href="/about" className="block text-sm hover:text-accent">
              {language === "DE" ? "Über uns" : language === "EN" ? "About" : "ჩვენ შესათაბ"}
            </a>
            <a href="/events" className="block text-sm hover:text-accent">
              {language === "DE" ? "Events" : language === "EN" ? "Events" : "ღონისძიებები"}
            </a>
            <a href="/blog" className="block text-sm hover:text-accent">
              {language === "DE" ? "Blog" : language === "EN" ? "Blog" : "ბლოგი"}
            </a>
            <a href="/reservation" className="block text-sm hover:text-accent">
              {language === "DE" ? "Reservierung" : language === "EN" ? "Reservation" : "რეზერვაცია"}
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative text-center text-white max-w-2xl px-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            {language === "DE"
              ? "Georgischer Wein in Berlin"
              : language === "EN"
              ? "Georgian Wine in Berlin"
              : "ქართული ღვინე ბერლინში"}
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            {language === "DE"
              ? "Premium-Auswahl, traditionelle Methoden"
              : language === "EN"
              ? "Premium selection, traditional methods"
              : "პრემიუმ არჩევანი, ტრადიციული მეთოდები"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "DE"
                    ? "Suchen..."
                    : language === "EN"
                    ? "Search..."
                    : "ძებნა..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">
                {language === "DE"
                  ? "Filter"
                  : language === "EN"
                  ? "Filter"
                  : "ფილტრი"}
              </span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              {/* Region Filter */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                  {language === "DE"
                    ? "Region"
                    : language === "EN"
                    ? "Region"
                    : "რეგიონი"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className={`px-3 py-1 text-xs rounded-full transition ${
                      selectedRegion === null
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 hover:border-border"
                    }`}
                  >
                    {language === "DE" ? "Alle" : language === "EN" ? "All" : "ყველა"}
                  </button>
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() =>
                        setSelectedRegion(selectedRegion === region ? null : region)
                      }
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        selectedRegion === region
                          ? "bg-gray-900 text-white"
                          : "bg-white border border-gray-200 hover:border-border"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                  {language === "DE"
                    ? "Kategorie"
                    : language === "EN"
                    ? "Category"
                    : "კატეგორია"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 text-xs rounded-full transition ${
                      selectedCategory === null
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 hover:border-border"
                    }`}
                  >
                    {language === "DE" ? "Alle" : language === "EN" ? "All" : "ყველა"}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat ? null : cat)
                      }
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        selectedCategory === cat
                          ? "bg-gray-900 text-white"
                          : "bg-white border border-gray-200 hover:border-border"
                      }`}
                    >
                      {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-6">
            {language === "DE"
              ? "Produkte"
              : language === "EN"
              ? "Products"
              : "პროდუქტები"}
            <span className="text-muted-foreground ml-2">({filteredProducts.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:border-border transition"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{product.region}</p>
                    <h4 className="text-sm font-semibold line-clamp-2">
                      {product.name[language]}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">€{product.price}</span>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryLabel(product.category)}
                    </Badge>
                  </div>

                  <button
                    onClick={() => addToCart(product.name[language])}
                    className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                  >
                    {language === "DE"
                      ? "In den Warenkorb"
                      : language === "EN"
                      ? "Add to Cart"
                      : "კალათში დამატება"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-6">
            {language === "DE"
              ? "Veranstaltungen"
              : language === "EN"
              ? "Events"
              : "ღონისძიებები"}
          </h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-border transition group cursor-pointer"
              >
                <img
                  src={event.image}
                  alt={event.name[language]}
                  className="w-24 h-24 object-cover rounded group-hover:scale-105 transition"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      {event.name[language]}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(
                        language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">€{event.price}</span>
                    <span className="text-xs text-muted-foreground">{event.seats} seats</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                {language === "DE" ? "Über uns" : language === "EN" ? "About" : "ჩვენ შესახებ"}
              </p>
              <p className="text-sm text-gray-600">
                {language === "DE"
                  ? "Premium georgische Weine in Berlin"
                  : language === "EN"
                  ? "Premium Georgian wines in Berlin"
                  : "პრემიუმ ქართული ღვინე ბერლინში"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                {language === "DE" ? "Navigation" : language === "EN" ? "Navigation" : "ნავიგაცია"}
              </p>
              <div className="space-y-2 text-sm">
                <a href="/products" className="block text-gray-600 hover:text-gray-900 transition">
                  {language === "DE" ? "Produkte" : language === "EN" ? "Products" : "პროდუქტები"}
                </a>
                <a href="/shop" className="block text-gray-600 hover:text-gray-900 transition">
                  {language === "DE" ? "Mägazin & Bar" : language === "EN" ? "Shop & Bar" : "მაღაზია & ბარი"}
                </a>
                <a href="/events" className="block text-gray-600 hover:text-gray-900 transition">
                  {language === "DE" ? "Events" : language === "EN" ? "Events" : "ღონისძიებები"}
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                {language === "DE" ? "Kontakt" : language === "EN" ? "Contact" : "კონტაქტი"}
              </p>
              <p className="text-sm text-gray-600">hello@georgianwine.berlin</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                {language === "DE" ? "Folgen Sie uns" : language === "EN" ? "Follow" : "გამოიწერეთ"}
              </p>
              <p className="text-sm text-gray-600">Instagram • Facebook</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>© 2026 Georgian Wine Berlin. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-gray-700 transition">
                {language === "DE" ? "Datenschutz" : language === "EN" ? "Privacy" : "კონფიდენციალურობა"}
              </a>
              <a href="/terms" className="hover:text-gray-700 transition">
                {language === "DE" ? "Bedingungen" : language === "EN" ? "Terms" : "პირობები"}
              </a>
              <a href="/imprint" className="hover:text-gray-700 transition">
                {language === "DE" ? "Impressum" : language === "EN" ? "Imprint" : "იმპრინტი"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
