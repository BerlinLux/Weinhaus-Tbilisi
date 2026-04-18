import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useNotification } from "@/contexts/NotificationContext";

type Language = "DE" | "EN" | "KA";
type ProductCategory = "bottle" | "barrel" | "qvevri" | "voucher";

interface ProductsProps {
  language: Language;
}

type Product = {
  id: string;
  category: ProductCategory;
  name: Record<Language, string>;
  price: number;
  region: string;
  image: string;
  featured?: boolean;
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
  {
    id: "voucher-open",
    category: "voucher",
    name: {
      DE: "Genussgutschein",
      EN: "Experience Voucher",
      KA: "სასაჩუქრე ვაუჩერი",
    },
    price: 50,
    region: "Berlin",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp",
  },
];

export default function Products({ language }: ProductsProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();
  const { addNotification } = useNotification();

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name[language],
      price: product.price,
      quantity: 1,
      category: product.category,
    });
    addNotification({
      type: "success",
      title: language === "DE" ? "Hinzugefügt" : language === "EN" ? "Added" : "დამატებულია",
      message: `${product.name[language]} ${language === "DE" ? "zum Warenkorb hinzugefügt" : language === "EN" ? "added to cart" : "კალათში დამატებულია"}`,
      duration: 2000,
    });
  };

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

  const getCategoryLabel = (cat: ProductCategory) => {
    const labels: Record<ProductCategory, Record<Language, string>> = {
      bottle: { DE: "Flasche", EN: "Bottle", KA: "ბოთლი" },
      barrel: { DE: "Fass", EN: "Barrel", KA: "კასრი" },
      qvevri: { DE: "Qvevri", EN: "Qvevri", KA: "ქვევრი" },
      voucher: { DE: "Gutschein", EN: "Voucher", KA: "ვაუჩერი" },
    };
    return labels[cat][language];
  };

  const labels = {
    DE: {
      title: "Produkte",
      search: "Suchen...",
      filter: "Filter",
      region: "Region",
      category: "Kategorie",
      price: "€",
      addToCart: "In den Warenkorb",
      noResults: "Keine Produkte gefunden",
      back: "Zurück",
    },
    EN: {
      title: "Products",
      search: "Search...",
      filter: "Filter",
      region: "Region",
      category: "Category",
      price: "$",
      addToCart: "Add to Cart",
      noResults: "No products found",
      back: "Back",
    },
    KA: {
      title: "პროდუქტები",
      search: "ძებნა...",
      filter: "ფილტრი",
      region: "რეგიონი",
      category: "კატეგორია",
      price: "₾",
      addToCart: "კალათში დამატება",
      noResults: "პროდუქტები ვერ მოიძებნა",
      back: "უკან",
    },
  };

  const lang = labels[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background shadow-elevation-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight text-headline">{lang.title}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={lang.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-smooth flex items-center gap-2 group"
            >
              <Filter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {lang.filter}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="p-4 bg-gradient-subtle rounded-lg space-y-4 shadow-elevation-2">
              <div>
                <label className="block text-sm font-medium mb-2">{lang.region}</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      selectedRegion === null
                        ? "bg-accent text-accent-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    }`}
                  >
                    {language === "DE" ? "Alle" : language === "EN" ? "All" : "ყველა"}
                  </button>
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        selectedRegion === region
                          ? "bg-accent text-accent-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{lang.category}</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      selectedCategory === null
                        ? "bg-accent text-accent-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    }`}
                  >
                    {language === "DE" ? "Alle" : language === "EN" ? "All" : "ყველა"}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        selectedCategory === cat
                          ? "bg-accent text-accent-foreground"
                          : "bg-background border border-border hover:bg-secondary"
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
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{lang.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => setLocation(`/product/${product.id}`)} className="card-3d bg-card border border-accent-subtle rounded-lg overflow-hidden cursor-pointer w-full group">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm text-body">{product.name[language]}</h3>
                    <Badge variant="outline" className="text-xs border-accent-subtle">
                      {getCategoryLabel(product.category)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 text-caption">{product.region}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-accent-gold">€{product.price}</span>
                    <Button
                      onClick={() => {
                        addToCart(product);
                      }}
                      size="sm"
                      className="btn-premium text-xs py-1 px-3"
                    >
                      {lang.addToCart}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
