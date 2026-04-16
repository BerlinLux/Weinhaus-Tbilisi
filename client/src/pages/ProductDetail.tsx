import { useState } from "react";
import { useLocation } from "wouter";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Language = "DE" | "EN" | "KA";
type ProductCategory = "bottle" | "barrel" | "qvevri" | "voucher";

interface ProductDetailProps {
  language: Language;
  productId?: string;
}

type Product = {
  id: string;
  category: ProductCategory;
  name: Record<Language, string>;
  price: number;
  image: string;
  description: Record<Language, string>;
  region?: string;
  grape?: string;
  aroma?: Record<Language, string>;
  taste?: Record<Language, string>;
  recommendation?: Record<Language, string>;
};

// Sample products data (same as in Products.tsx)
const sampleProducts: Product[] = [
  {
    id: "khikhvi-amber",
    category: "qvevri",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-qvevri-cellar-premium-7swrbauHewG7H2Eikp5s63.webp",
    price: 29,
    region: "Kakheti",
    grape: "Khikhvi",
    name: {
      DE: "Khikhvi Qvevri Reserve",
      EN: "Khikhvi Qvevri Reserve",
      KA: "ხიხვი ქვევრი რეზერვი",
    },
    description: {
      DE: "Komplexer georgischer Amber Wine mit feinen Tanninen, salziger Länge und einer ruhigen, kultivierten Struktur.",
      EN: "A complex Georgian amber wine with fine tannins, saline length, and a calm, cultivated structure.",
      KA: "კომპლექსური ქართული ქარვისფერი ღვინო დახვეწილი ტანინებით, მინერალური სიგრძით და მშვიდი, ელეგანტური სტრუქტურით.",
    },
    aroma: {
      DE: "Getrocknete Aprikose, schwarzer Tee, Orangenschale",
      EN: "Dried apricot, black tea, orange peel",
      KA: "ხმელი გარგარი, შავი ჩაი, ფორთოხლის ცედრა",
    },
    taste: {
      DE: "Texturiert, trocken, mineralisch, lang",
      EN: "Textured, dry, mineral, long finish",
      KA: "ტექსტურული, მშრალი, მინერალური, ხანგრძლივი დასასრული",
    },
    recommendation: {
      DE: "Ideal zu Käse, Nüssen und georgischen Vorspeisen",
      EN: "Ideal with cheese, nuts, and Georgian starters",
      KA: "იდეალურია ყველთან, თხილეულთან და ქართულ სტარტერებთან",
    },
  },
  // Add more products as needed
];

const labels = {
  DE: {
    addToCart: "In den Warenkorb",
    quantity: "Menge",
    price: "Preis",
    region: "Region",
    grape: "Traube",
    aroma: "Aroma",
    taste: "Geschmack",
    recommendation: "Empfehlung",
    backToProducts: "Zurück zu Produkten",
  },
  EN: {
    addToCart: "Add to Cart",
    quantity: "Quantity",
    price: "Price",
    region: "Region",
    grape: "Grape",
    aroma: "Aroma",
    taste: "Taste",
    recommendation: "Recommendation",
    backToProducts: "Back to Products",
  },
  KA: {
    addToCart: "კალათაში დამატება",
    quantity: "რაოდენობა",
    price: "ფასი",
    region: "რეგიონი",
    grape: "ხორბალი",
    aroma: "არომატი",
    taste: "გემო",
    recommendation: "რეკომენდაცია",
    backToProducts: "პროდუქტებში დაბრუნება",
  },
};

export default function ProductDetail({ language, productId }: ProductDetailProps) {
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = sampleProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">პროდუქტი არ მოიძებნა</h1>
          <Button onClick={() => setLocation("/products")}>
            {labels[language].backToProducts}
          </Button>
        </div>
      </div>
    );
  }

  const lang = labels[language];

  const handleAddToCart = () => {
    toast.success(`${product.name[language]} დამატებულია კალათაში!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-secondary rounded-lg overflow-hidden h-96">
            <img
              src={product.image}
              alt={product.name[language]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name[language]}</h1>
              <p className="text-muted-foreground">{product.description[language]}</p>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-accent">
              €{product.price.toFixed(2)}
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm">
              {product.region && (
                <p>
                  <span className="font-semibold">{lang.region}:</span> {product.region}
                </p>
              )}
              {product.grape && (
                <p>
                  <span className="font-semibold">{lang.grape}:</span> {product.grape}
                </p>
              )}
            </div>

            {/* Aroma & Taste */}
            {product.aroma && (
              <div>
                <p className="font-semibold mb-1">{lang.aroma}</p>
                <p className="text-muted-foreground">{product.aroma[language]}</p>
              </div>
            )}

            {product.taste && (
              <div>
                <p className="font-semibold mb-1">{lang.taste}</p>
                <p className="text-muted-foreground">{product.taste[language]}</p>
              </div>
            )}

            {product.recommendation && (
              <div>
                <p className="font-semibold mb-1">{lang.recommendation}</p>
                <p className="text-muted-foreground">{product.recommendation[language]}</p>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {lang.addToCart}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
