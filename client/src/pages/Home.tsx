import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Wine,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Check,
} from "lucide-react";

const heroAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp";
const tastingAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp";
const qvevriAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-qvevri-cellar-premium-7swrbauHewG7H2Eikp5s63.webp";
const retailAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-retail-still-life-DuM686XYJ8GdXBZDGB3sKR.webp";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  region: string;
  type: string;
}

interface WhyUsItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<"DE" | "EN" | "KA">(
    "EN"
  );

  const translations = {
    EN: {
      heroHeadline: "Authentic Georgian Wine in Berlin",
      heroSubheadline: "Rare wines directly imported from Georgia",
      orderNow: "Order Now",
      bookTasting: "Book Wine Tasting",
      
      winesSection: "Our Wines",
      winesIntro: "Discover our carefully selected Georgian wines, directly imported and authentically crafted",
      
      whyUsSection: "Why Choose Us?",
      whyUs1Title: "8+ Years Experience",
      whyUs1Desc: "Over 8 years of Georgian restaurant experience in Berlin",
      whyUs2Title: "Direct Importer",
      whyUs2Desc: "We import directly from Georgia, ensuring authenticity and quality",
      whyUs3Title: "Authentic Products",
      whyUs3Desc: "Traditional Georgian wines using ancient Qvevri methods",
      whyUs4Title: "Trusted by Locals",
      whyUs4Desc: "Beloved by Berlin's Georgian community and wine enthusiasts",
      
      visitUsSection: "Visit Our Restaurant",
      visitUsDesc: "Experience Georgian wine culture in our authentic Berlin restaurant",
      address: "Charlottenburg, Berlin",
      hours: "Open Daily: 12:00 - 23:00",
      
      tastingSection: "Wine Tasting Experience",
      tastingDesc: "Join our guided wine tasting sessions and discover the rich flavors of Georgia",
      tastingPrice: "€48 per person",
      tastingDuration: "2.5 hours",
      bookNow: "Book a Tasting",
      
      contactSection: "Get in Touch",
      phone: "+49 30 XXXX XXXX",
      email: "contact@weinhaus-tbilisi.de",
      address2: "Charlottenburg, 14059 Berlin, Germany",
      followUs: "Follow Us",
      
      footer: "© 2026 Weinhaus Tbilisi. Authentic Georgian Wine in Berlin.",
    },
    DE: {
      heroHeadline: "Authentische georgische Weine in Berlin",
      heroSubheadline: "Seltene Weine direkt aus Georgien importiert",
      orderNow: "Jetzt Bestellen",
      bookTasting: "Weinverkostung Buchen",
      
      winesSection: "Unsere Weine",
      winesIntro: "Entdecken Sie unsere sorgfältig ausgewählten georgischen Weine, direkt importiert und authentisch hergestellt",
      
      whyUsSection: "Warum uns wählen?",
      whyUs1Title: "8+ Jahre Erfahrung",
      whyUs1Desc: "Über 8 Jahre georgische Restauranterfahrung in Berlin",
      whyUs2Title: "Direkter Importeur",
      whyUs2Desc: "Wir importieren direkt aus Georgien für Authentizität und Qualität",
      whyUs3Title: "Authentische Produkte",
      whyUs3Desc: "Traditionelle georgische Weine nach alter Qvevri-Methode",
      whyUs4Title: "Vertraut von Einheimischen",
      whyUs4Desc: "Beliebt bei Berlins georgischer Gemeinde und Weinliebhabern",
      
      visitUsSection: "Besuchen Sie unser Restaurant",
      visitUsDesc: "Erleben Sie georgische Weinkultur in unserem authentischen Berliner Restaurant",
      address: "Charlottenburg, Berlin",
      hours: "Täglich geöffnet: 12:00 - 23:00",
      
      tastingSection: "Weinverkostungserlebnis",
      tastingDesc: "Nehmen Sie an unseren geführten Weinverkostungen teil und entdecken Sie die reichen Aromen Georgiens",
      tastingPrice: "€48 pro Person",
      tastingDuration: "2,5 Stunden",
      bookNow: "Jetzt Buchen",
      
      contactSection: "Kontaktieren Sie uns",
      phone: "+49 30 XXXX XXXX",
      email: "contact@weinhaus-tbilisi.de",
      address2: "Charlottenburg, 14059 Berlin, Deutschland",
      followUs: "Folgen Sie uns",
      
      footer: "© 2026 Weinhaus Tbilisi. Authentische georgische Weine in Berlin.",
    },
    KA: {
      heroHeadline: "ქართული ღვინე ბერლინში",
      heroSubheadline: "იშვიათი ღვინე პირდაპირ საქართველოდან",
      orderNow: "შეკვეთა",
      bookTasting: "დეგუსტაცია დაჯავშნა",
      
      winesSection: "ჩვენი ღვინე",
      winesIntro: "აღმოაჩინეთ ჩვენი ფრთხელი ქართული ღვინე, პირდაპირ იმპორტირებული და აუთენტურად დამზადებული",
      
      whyUsSection: "რატომ ჩვენ?",
      whyUs1Title: "8+ წლის გამოცდილება",
      whyUs1Desc: "8+ წლის ქართული რესტორნის გამოცდილება ბერლინში",
      whyUs2Title: "პირდაპირი იმპორტერი",
      whyUs2Desc: "ჩვენ პირდაპირ საქართველოდან ვიმპორტირებთ ხარისხისა და აუთენტურობის უზრუნველსაყოფად",
      whyUs3Title: "აუთენტური პროდუქტი",
      whyUs3Desc: "ტრადიციული ქართული ღვინე ძველი ქვევრის მეთოდით",
      whyUs4Title: "ნდობა ადგილობრივებისგან",
      whyUs4Desc: "ბერლინის ქართული საზოგადოებისა და ღვინის მოყვარულების საყვარელი",
      
      visitUsSection: "ეწვიეთ ჩვენი რესტორანი",
      visitUsDesc: "განიცადეთ ქართული ღვინის კულტურა ჩვენ აუთენტურ ბერლინის რესტორანში",
      address: "შარლოტენბურგი, ბერლინი",
      hours: "ყოველდღე: 12:00 - 23:00",
      
      tastingSection: "ღვინის დეგუსტაციის გამოცდილება",
      tastingDesc: "მონაწილეობა მიიღეთ ჩვენ გიდირებულ ღვინის დეგუსტაციებში და აღმოაჩინეთ საქართველოს მდიდარი არომატი",
      tastingPrice: "€48 ადამიანი",
      tastingDuration: "2.5 საათი",
      bookNow: "დაჯავშნა",
      
      contactSection: "დაგვიკავშირდით",
      phone: "+49 30 XXXX XXXX",
      email: "contact@weinhaus-tbilisi.de",
      address2: "შარლოტენბურგი, 14059 ბერლინი, გერმანია",
      followUs: "მოჰყვეთ ჩვენ",
      
      footer: "© 2026 Weinhaus Tbilisi. ქართული ღვინე ბერლინში.",
    },
  };

  const t = translations[selectedLanguage];

  const wines: Product[] = [
    {
      id: "khikhvi",
      name: "Khikhvi Qvevri Reserve",
      description: "Complex amber wine with fine tannins and mineral length. Traditional Qvevri fermentation.",
      price: 29,
      image: qvevriAsset,
      region: "Kakheti",
      type: "Amber",
    },
    {
      id: "saperavi",
      name: "Saperavi Barrel",
      description: "Juicy red wine with dark fruit and gentle spice. Perfect for sharing at the bar.",
      price: 24,
      image: tastingAsset,
      region: "Kakheti",
      type: "Red",
    },
    {
      id: "rkatsiteli",
      name: "Rkatsiteli Estate Selection",
      description: "Precise white wine with fresh pear and herbs. Elegant and linear.",
      price: 21,
      image: retailAsset,
      region: "Kartli",
      type: "White",
    },
    {
      id: "mtsvane",
      name: "Mtsvane Clay Selection",
      description: "Fine spice, herbal florals, and cultivated tannic texture. Structured and long.",
      price: 31,
      image: qvevriAsset,
      region: "Imereti",
      type: "Amber",
    },
    {
      id: "tavkveri",
      name: "Tavkveri Rosé Berlin Edition",
      description: "Fresh rosé with red currant and herbs. Modern summer energy in a glass.",
      price: 19,
      image: retailAsset,
      region: "Kakheti",
      type: "Rosé",
    },
  ];

  const whyUsItems: WhyUsItem[] = [
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: t.whyUs1Title,
      description: t.whyUs1Desc,
    },
    {
      icon: <Wine className="w-8 h-8 text-amber-600" />,
      title: t.whyUs2Title,
      description: t.whyUs2Desc,
    },
    {
      icon: <Star className="w-8 h-8 text-amber-600" />,
      title: t.whyUs3Title,
      description: t.whyUs3Desc,
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: t.whyUs4Title,
      description: t.whyUs4Desc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {(["EN", "DE", "KA"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              selectedLanguage === lang
                ? "bg-amber-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroAsset}')`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            {t.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl mb-12 drop-shadow-md font-light">
            {t.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transform transition hover:scale-105"
            >
              {t.orderNow}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white px-8 py-6 text-lg rounded-lg backdrop-blur-sm"
            >
              {t.bookTasting}
            </Button>
          </div>
        </div>
      </section>

      {/* WINES SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t.winesSection}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.winesIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {wines.map((wine) => (
              <Card
                key={wine.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border-0"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    €{wine.price}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {wine.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {wine.description}
                  </p>
                  <div className="flex gap-2 mb-4 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {wine.region}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {wine.type}
                    </span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    {t.orderNow}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.whyUsSection}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US SECTION */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.visitUsSection}
              </h2>
              <p className="text-xl text-gray-300 mb-8">{t.visitUsDesc}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <span className="text-lg">{t.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <span className="text-lg">{t.hours}</span>
                </div>
              </div>
            </div>
            <div className="h-96 rounded-xl overflow-hidden shadow-2xl">
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

      {/* WINE TASTING SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t.tastingSection}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.tastingDesc}
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-2 border-amber-600 bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {t.tastingPrice}
                </div>
                <p className="text-gray-600">per person</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-amber-600 bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {t.tastingDuration}
                </div>
                <p className="text-gray-600">guided experience</p>
              </CardContent>
            </Card>
          </div>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-lg"
          >
            {t.bookNow}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.contactSection}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Phone className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">{t.phone}</p>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-600">{t.email}</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Address</h3>
              <p className="text-gray-600">{t.address2}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-4">{t.followUs}</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/weinhaus-tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/weinhaus-tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
