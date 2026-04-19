import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wine, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const heroAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp";

interface Product {
  id: string;
  name: string;
  nameDE: string;
  volume: string;
  price: number;
  category: "red" | "white" | "amber" | "rose";
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Budeshuri",
    nameDE: "Budeshuri",
    volume: "0.750",
    price: 33.0,
    category: "red",
    image: heroAsset,
  },
  {
    id: "2",
    name: "Mukuzani",
    nameDE: "Mukuzani",
    volume: "0.750",
    price: 35.5,
    category: "red",
    image: heroAsset,
  },
  {
    id: "3",
    name: "Kindzmarauli",
    nameDE: "Kindzmarauli",
    volume: "0.750",
    price: 39.5,
    category: "red",
    image: heroAsset,
  },
  {
    id: "4",
    name: "Tsinandali",
    nameDE: "Tsinandali",
    volume: "0.750",
    price: 31.9,
    category: "white",
    image: heroAsset,
  },
  {
    id: "5",
    name: "Saperavi",
    nameDE: "Saperavi",
    volume: "0.750",
    price: 33.0,
    category: "red",
    image: heroAsset,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: "all", label: "Alle", labelDE: "Alle" },
    { id: "red", label: "Rot", labelDE: "Rot" },
    { id: "white", label: "Weiß", labelDE: "Weiß" },
    { id: "amber", label: "Amber", labelDE: "Amber" },
    { id: "rose", label: "Rosé", labelDE: "Rosé" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const itemsPerPage = 4;
  const totalSlides = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = currentSlide * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroAsset}
          alt="Weinhaus Tbilisi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Weinhaus Tbilisi</h1>
          <p className="text-2xl md:text-3xl mb-8 font-light">Authentische georgische Weine in Berlin</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg">
              Mehr erfahren
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Über uns</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Weinhaus Tbilisi bringt authentische georgische Weine direkt nach Berlin. Mit über 8 Jahren Erfahrung in der georgischen Gastronomie bieten wir eine sorgfältig ausgewählte Kollektion von traditionellen und modernen georgischen Weinen.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Wir sind direkter Importeur aus Georgien und arbeiten mit den besten Weingütern zusammen, um Ihnen authentische Qualität zu garantieren.
          </p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
            Populäre Weine
          </h2>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:border-black"
                }`}
              >
                {cat.labelDE}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {visibleProducts.map((product) => (
              <Card key={product.id} className="bg-white/70 border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.nameDE}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.nameDE}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.volume} L</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                      In den Warenkorb
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-4 items-center">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-gray-600">
                {currentSlide + 1} / {totalSlides}
              </span>
              <button
                onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                disabled={currentSlide === totalSlides - 1}
                className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Besuchen Sie uns</h2>
              <p className="text-lg text-gray-700 mb-8">
                Erleben Sie authentische georgische Weine in unserem Restaurant in Berlin-Charlottenburg.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-gray-900" />
                  <span className="text-lg text-gray-700">Charlottenburg, 10587 Berlin</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-gray-900" />
                  <span className="text-lg text-gray-700">+49 30 123 456 789</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-gray-900" />
                  <span className="text-lg text-gray-700">info@weinhaus-tbilisi.de</span>
                </div>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.7651149999997!2d13.295!3d52.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c5f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sCharlottenburg%2C%20Berlin!5e0!3m2!1sen!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">Kontakt</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Phone className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">Telefon</h3>
              <p className="text-gray-700">+49 30 123 456 789</p>
            </div>
            <div>
              <Mail className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">E-Mail</h3>
              <p className="text-gray-700">info@weinhaus-tbilisi.de</p>
            </div>
            <div>
              <MapPin className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">Adresse</h3>
              <p className="text-gray-700">Charlottenburg, 10587 Berlin</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-300">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Folgen Sie uns</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/weinhaus-tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/weinhaus-tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-gray-900">BerlinLux Gastronomie GmbH</p>
              <p className="text-sm text-gray-600">Weinhaus Tbilisi</p>
              <p className="text-sm text-gray-600">Charlottenburg, 10587 Berlin</p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 flex-wrap justify-center">
              <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Datenschutz
              </a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                AGB
              </a>
              <a href="/imprint" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Impressum
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-gray-300 text-center">
            <p className="text-xs text-gray-600">
              © 2026 BerlinLux Gastronomie GmbH. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
