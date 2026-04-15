/*
Design philosophy for this file: Qvevri Modernism.
This page must feel editorial, tactile, and premium, balancing Georgian wine heritage with contemporary Berlin hospitality.
Use asymmetrical composition, restrained luxury, warm mineral colors, and deliberate motion. Avoid generic centered blocks.
*/

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Filter,
  Globe,
  Heart,
  MapPin,
  Menu,
  Minus,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Ticket,
  User,
  Wine,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapView } from "@/components/Map";

const heroAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-hero-editorial-abqERAkvm8qgG5LzVgGiqG.webp";
const tastingAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-tasting-salon-N9Zv49cGJMJHKhgi4h6MDh.webp";
const qvevriAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-qvevri-cellar-premium-7swrbauHewG7H2Eikp5s63.webp";
const retailAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663562204057/GpY8FacRagpb8d3GTnQBPg/georgian-wine-retail-still-life-DuM686XYJ8GdXBZDGB3sKR.webp";

type Language = "DE" | "EN" | "KA";
type ProductCategory = "bottle" | "barrel" | "qvevri" | "voucher";
type CartKind = "product" | "event" | "voucher";

type LocalizedRecord = {
  id: string;
  image: string;
  price: number;
  badge?: string;
  technology?: string;
  region?: string;
  grape?: string;
  color?: string;
  type?: string;
  volume?: string;
  featured?: boolean;
  name_DE: string;
  name_EN: string;
  name_KA: string;
  description_DE: string;
  description_EN: string;
  description_KA: string;
};

type ProductRecord = LocalizedRecord & {
  category: ProductCategory;
  aroma_DE?: string;
  aroma_EN?: string;
  aroma_KA?: string;
  taste_DE?: string;
  taste_EN?: string;
  taste_KA?: string;
  recommendation_DE?: string;
  recommendation_EN?: string;
  recommendation_KA?: string;
};

type EventRecord = LocalizedRecord & {
  date: string;
  seats: number;
  venue_DE: string;
  venue_EN: string;
  venue_KA: string;
};

type BlogRecord = {
  id: string;
  image: string;
  date: string;
  category: string;
  name_DE: string;
  name_EN: string;
  name_KA: string;
  description_DE: string;
  description_EN: string;
  description_KA: string;
};

type CartItem = {
  id: string;
  kind: CartKind;
  name: string;
  price: number;
  quantity: number;
  note?: string;
};

type SheetData = {
  products: ProductRecord[];
  events: EventRecord[];
  blog: BlogRecord[];
};

declare global {
  interface Window {
    GEORGIAN_WINE_CONFIG?: {
      spreadsheetId?: string;
      sheets?: {
        products?: string;
        events?: string;
        blog?: string;
      };
    };
  }
}

const sampleProducts: ProductRecord[] = [
  {
    id: "khikhvi-amber",
    category: "qvevri",
    image: qvevriAsset,
    price: 29,
    badge: "Amber",
    technology: "Qvevri",
    region: "Kakheti",
    grape: "Khikhvi",
    color: "Amber",
    type: "Dry",
    volume: "0.75 L",
    featured: true,
    name_DE: "Khikhvi Qvevri Reserve",
    name_EN: "Khikhvi Qvevri Reserve",
    name_KA: "ხიხვი ქვევრი რეზერვი",
    description_DE:
      "Komplexer georgischer Amber Wine mit feinen Tanninen, salziger Länge und einer ruhigen, kultivierten Struktur.",
    description_EN:
      "A complex Georgian amber wine with fine tannins, saline length, and a calm, cultivated structure.",
    description_KA:
      "კომპლექსური ქართული ქარვისფერი ღვინო დახვეწილი ტანინებით, მინერალური სიგრძით და მშვიდი, ელეგანტური სტრუქტურით.",
    aroma_DE: "Getrocknete Aprikose, schwarzer Tee, Orangenschale",
    aroma_EN: "Dried apricot, black tea, orange peel",
    aroma_KA: "ხმელი გარგარი, შავი ჩაი, ფორთოხლის ცედრა",
    taste_DE: "Texturiert, trocken, mineralisch, lang",
    taste_EN: "Textured, dry, mineral, long finish",
    taste_KA: "ტექსტურული, მშრალი, მინერალური, ხანგრძლივი დასასრული",
    recommendation_DE: "Ideal zu Käse, Nüssen und georgischen Vorspeisen",
    recommendation_EN: "Ideal with cheese, nuts, and Georgian starters",
    recommendation_KA: "იდეალურია ყველთან, თხილეულთან და ქართულ სტარტერებთან",
  },
  {
    id: "saperavi-barrel",
    category: "barrel",
    image: tastingAsset,
    price: 24,
    badge: "Red",
    technology: "Barrel",
    region: "Kakheti",
    grape: "Saperavi",
    color: "Red",
    type: "Dry",
    volume: "1.00 L",
    featured: true,
    name_DE: "Saperavi aus dem Fass",
    name_EN: "Barrel Saperavi",
    name_KA: "საფერავი კასრიდან",
    description_DE:
      "Saftiger, offener Saperavi mit dunkler Frucht, sanfter Würze und barfreundlicher Frische.",
    description_EN:
      "Juicy open-pour Saperavi with dark fruit, gentle spice, and bar-friendly freshness.",
    description_KA:
      "წვნიანი საფერავი მუქი ხილით, რბილი სანელებლებით და ბარისთვის შესაფერისი სისუფთავით.",
    aroma_DE: "Brombeere, Sauerkirsche, Pfeffer",
    aroma_EN: "Blackberry, sour cherry, pepper",
    aroma_KA: "შავი მაყვალი, ალუბალი, პილპილი",
    taste_DE: "Mittelkräftig, würzig, frisch",
    taste_EN: "Medium-bodied, spicy, fresh",
    taste_KA: "საშუალო სხეული, სანელებლიანი, ცოცხალი",
    recommendation_DE: "Perfekt zum Teilen an der Bar oder zu gegrilltem Fleisch",
    recommendation_EN: "Perfect for sharing at the bar or with grilled meat",
    recommendation_KA: "იდეალურია ბარში გასაზიარებლად ან გრილზე შემწვარ ხორცთან",
  },
  {
    id: "rkatsiteli-classic",
    category: "bottle",
    image: retailAsset,
    price: 21,
    badge: "White",
    technology: "Bottle",
    region: "Kartli",
    grape: "Rkatsiteli",
    color: "White",
    type: "Dry",
    volume: "0.75 L",
    featured: true,
    name_DE: "Rkatsiteli Estate Selection",
    name_EN: "Rkatsiteli Estate Selection",
    name_KA: "რქაწითელი ესთეით სელექშენ",
    description_DE:
      "Klarer, präziser Weißwein mit frischer Birne, Kräutern und einem eleganten, linearen Zug.",
    description_EN:
      "A precise white wine with fresh pear, herbs, and an elegant linear drive.",
    description_KA:
      "ზუსტი თეთრი ღვინო მსხლის, ბალახეული ნოტებით და ელეგანტური, ხაზოვანი ხასიათით.",
    aroma_DE: "Birne, Lindenblüte, Fenchel",
    aroma_EN: "Pear, linden blossom, fennel",
    aroma_KA: "მსხალი, ცაცხვის ყვავილი, ცერეცო",
    taste_DE: "Saftig, trocken, hell und präzise",
    taste_EN: "Juicy, dry, bright, and precise",
    taste_KA: "წვნიანი, მშრალი, ნათელი და ზუსტი",
    recommendation_DE: "Zu Fisch, leichten Salaten und Frischkäse",
    recommendation_EN: "With fish, light salads, and fresh cheese",
    recommendation_KA: "თევზთან, მსუბუქ სალათებთან და ახალ ყველთან",
  },
  {
    id: "mtsvane-amber",
    category: "qvevri",
    image: qvevriAsset,
    price: 31,
    badge: "Amber",
    technology: "Qvevri",
    region: "Imereti",
    grape: "Mtsvane",
    color: "Amber",
    type: "Dry",
    volume: "0.75 L",
    name_DE: "Mtsvane Clay Selection",
    name_EN: "Mtsvane Clay Selection",
    name_KA: "მწვანე კლეი სელექშენ",
    description_DE:
      "Feinwürzige Textur und florale Kräuteraromen mit kultivierter Gerbstoffstruktur.",
    description_EN:
      "Fine spice, herbal florals, and a cultivated tannic texture.",
    description_KA:
      "დახვეწილი სანელებლობა, ბალახოვანი არომატები და ელეგანტური ტანინური ტექსტურა.",
    aroma_DE: "Kamille, Bergkräuter, kandierte Zitrusfrucht",
    aroma_EN: "Chamomile, mountain herbs, candied citrus",
    aroma_KA: "გვირილა, მთის ბალახები, ციტრუსი",
    taste_DE: "Strukturiert, würzig, lang",
    taste_EN: "Structured, spicy, long",
    taste_KA: "სტრუქტურირებული, სანელებლიანი, ხანგრძლივი",
    recommendation_DE: "Zu Pilzgerichten und geröstetem Gemüse",
    recommendation_EN: "With mushroom dishes and roasted vegetables",
    recommendation_KA: "სოკოს კერძებთან და შემწვარ ბოსტნეულთან",
  },
  {
    id: "rose-tavkveri",
    category: "bottle",
    image: retailAsset,
    price: 19,
    badge: "Rosé",
    technology: "Bottle",
    region: "Kakheti",
    grape: "Tavkveri",
    color: "Rosé",
    type: "Dry",
    volume: "0.75 L",
    name_DE: "Tavkveri Rosé Berlin Edition",
    name_EN: "Tavkveri Rosé Berlin Edition",
    name_KA: "თავკვერი როზე ბერლინ ედიშენ",
    description_DE:
      "Ein frischer Rosé mit roter Johannisbeere, Kräutern und moderner Sommerenergie.",
    description_EN:
      "A fresh rosé with red currant, herbs, and modern summer energy.",
    description_KA:
      "ახალი როზე წითელი მოცხარის, ბალახების და თანამედროვე საზაფხულო ენერგიით.",
    aroma_DE: "Rote Johannisbeere, rosa Pfeffer, Rosenblatt",
    aroma_EN: "Red currant, pink pepper, rose petal",
    aroma_KA: "წითელი მოცხარი, ვარდისფერი პილპილი, ვარდის ფურცელი",
    taste_DE: "Trocken, hell, animierend",
    taste_EN: "Dry, bright, lively",
    taste_KA: "მშრალი, ნათელი, ცოცხალი",
    recommendation_DE: "Ideal für Terrasse, Aperitif und leichte Küche",
    recommendation_EN: "Ideal for the terrace, aperitif, and lighter dishes",
    recommendation_KA: "იდეალურია ტერასისთვის, აპერიტივისთვის და მსუბუქი კერძებისთვის",
  },
  {
    id: "voucher-open",
    category: "voucher",
    image: heroAsset,
    price: 50,
    badge: "Voucher",
    technology: "Gift",
    region: "Berlin",
    grape: "—",
    color: "Gold",
    type: "Flexible",
    volume: "Digital",
    name_DE: "Genussgutschein",
    name_EN: "Experience Voucher",
    name_KA: "სასაჩუქრე ვაუჩერი",
    description_DE:
      "Ein frei einlösbarer Gutschein für Wein, Tastings, Events oder besondere Abende im Barraum.",
    description_EN:
      "A flexible voucher redeemable for wine, tastings, events, or memorable evenings at the bar.",
    description_KA:
      "მოქნილი ვაუჩერი ღვინისთვის, დეგუსტაციებისთვის, ღონისძიებებისთვის ან განსაკუთრებული საღამოებისთვის.",
    aroma_DE: "—",
    aroma_EN: "—",
    aroma_KA: "—",
    taste_DE: "—",
    taste_EN: "—",
    taste_KA: "—",
    recommendation_DE: "Beliebig zwischen 5 € und 5000 € konfigurierbar",
    recommendation_EN: "Configurable between €5 and €5000",
    recommendation_KA: "კონფიგურირებადია 5 €-დან 5000 €-მდე",
  },
];

const sampleEvents: EventRecord[] = [
  {
    id: "amber-masterclass",
    image: tastingAsset,
    price: 48,
    badge: "Masterclass",
    technology: "Tasting",
    region: "Berlin",
    grape: "Mixed",
    color: "Amber",
    type: "Paid Event",
    volume: "2.5h",
    featured: true,
    date: "2026-05-14T19:00:00",
    seats: 18,
    venue_DE: "Charlottenburg, Berlin",
    venue_EN: "Charlottenburg, Berlin",
    venue_KA: "შარლოტენბურგი, ბერლინი",
    name_DE: "Amber Wine Masterclass",
    name_EN: "Amber Wine Masterclass",
    name_KA: "ქარვისფერი ღვინის მასტერკლასი",
    description_DE:
      "Geführte Verkostung mit Fokus auf Qvevri-Technologie, Textur und Food Pairing.",
    description_EN:
      "Guided tasting focused on qvevri technique, texture, and food pairing.",
    description_KA:
      "გიდირებული დეგუსტაცია ქვევრის ტექნოლოგიაზე, ტექსტურასა და საკვებთან შეხამებაზე.",
  },
  {
    id: "berlin-supper-club",
    image: heroAsset,
    price: 89,
    badge: "Dinner",
    technology: "Experience",
    region: "Berlin",
    grape: "Mixed",
    color: "Curated",
    type: "Paid Event",
    volume: "4h",
    featured: true,
    date: "2026-05-29T18:30:00",
    seats: 14,
    venue_DE: "Private Tasting Salon",
    venue_EN: "Private Tasting Salon",
    venue_KA: "პირადი დეგუსტაციის სალონი",
    name_DE: "Berlin Georgian Supper Club",
    name_EN: "Berlin Georgian Supper Club",
    name_KA: "ბერლინის ქართული სუფრის კლუბი",
    description_DE:
      "Ein kuratiertes Abendformat mit mehrgängigem Pairing-Menü und ausgewählten Winzerstories.",
    description_EN:
      "A curated dinner experience with a pairing menu and selected winemaker stories.",
    description_KA:
      "კურირებული ვახშამი შეხამებული მენიუთი და შერჩეული მეღვინეების ისტორიებით.",
  },
  {
    id: "trade-portfolio-preview",
    image: retailAsset,
    price: 0,
    badge: "Trade",
    technology: "Wholesale",
    region: "Berlin",
    grape: "Portfolio",
    color: "Mixed",
    type: "By Request",
    volume: "90m",
    date: "2026-06-03T15:00:00",
    seats: 10,
    venue_DE: "Trade Appointment",
    venue_EN: "Trade Appointment",
    venue_KA: "სავაჭრო შეხვედრა",
    name_DE: "Wholesale Portfolio Preview",
    name_EN: "Wholesale Portfolio Preview",
    name_KA: "ჰოლსეილის პორტფოლიოს პრეზენტაცია",
    description_DE:
      "Termin für Restaurants, Händler und HoReCa-Partner mit Preislisten und Sortimentsberatung.",
    description_EN:
      "Appointment for restaurants, retailers, and HoReCa partners with price list and portfolio guidance.",
    description_KA:
      "შეხვედრა რესტორნებისთვის, რითეილერებისთვის და HoReCa პარტნიორებისთვის ფასებითა და პორტფოლიოს კონსულტაციით.",
  },
];

const sampleBlog: BlogRecord[] = [
  {
    id: "why-qvevri-matters",
    image: qvevriAsset,
    date: "2026-04-01",
    category: "Culture",
    name_DE: "Warum Qvevri heute wieder wichtig ist",
    name_EN: "Why Qvevri Matters Again Today",
    name_KA: "რატომ არის ქვევრი დღეს კვლავ მნიშვნელოვანი",
    description_DE:
      "Ein Blick auf Ton, Zeit, Textur und die kulturelle Tiefe georgischer Weinbereitung.",
    description_EN:
      "A closer look at clay, time, texture, and the cultural depth of Georgian winemaking.",
    description_KA:
      "ახლო ხედვა თიხაზე, დროზე, ტექსტურაზე და ქართული მეღვინეობის კულტურულ სიღრმეზე.",
  },
  {
    id: "berlin-pairing-guide",
    image: tastingAsset,
    date: "2026-04-08",
    category: "Pairing",
    name_DE: "Georgische Weine mit Berliner Küche kombinieren",
    name_EN: "Pairing Georgian Wine with Berlin Dining",
    name_KA: "ქართული ღვინის შეხამება ბერლინის სამზარეულოსთან",
    description_DE:
      "Praktische Pairings zwischen Amber Wines, Naturwein-Bars und moderner Stadtküche.",
    description_EN:
      "Practical pairings between amber wines, natural wine bars, and contemporary city dining.",
    description_KA:
      "პრაქტიკული შეხამებები ქარვისფერ ღვინოებს, ნატურალურ ღვინის ბარებს და თანამედროვე ურბანულ სამზარეულოს შორის.",
  },
  {
    id: "grape-primer",
    image: retailAsset,
    date: "2026-04-15",
    category: "Grapes",
    name_DE: "Saperavi, Rkatsiteli, Mtsvane: ein Einstieg",
    name_EN: "Saperavi, Rkatsiteli, Mtsvane: a quick primer",
    name_KA: "საფერავი, რქაწითელი, მწვანე: მოკლე გზამკვლევი",
    description_DE:
      "Die wichtigsten georgischen Rebsorten verständlich erklärt – für Einsteiger und Fachpublikum.",
    description_EN:
      "A clear introduction to key Georgian grape varieties for curious newcomers and trade buyers alike.",
    description_KA:
      "ქართული მთავარი ჯიშების გასაგები მიმოხილვა დამწყებთათვის და პროფესიონალებისთვის.",
  },
];

const copy = {
  DE: {
    nav: [
      ["home", "Start"],
      ["about", "Über uns"],
      ["products", "Produkte"],
      ["store", "Online Store"],
      ["events", "Events"],
      ["blog", "Blog"],
      ["reservation", "Reservierung"],
      ["login", "Login"],
      ["contact", "Kontakt"],
    ],
    heroEyebrow: "Georgischer Wein in Berlin",
    heroTitle: "Premium-Weinshop, Bar und Tasting-Salon mit georgischer Seele.",
    heroText:
      "Eine elegante Adresse für kuratierte Flaschen, offene Fassweine, Qvevri-Erlebnisse, Events und B2B-Distribution – bewusst gestaltet für ein modernes Berliner Publikum.",
    heroPrimary: "Produkte entdecken",
    heroSecondary: "Tasting reservieren",
    embedBadge: "Google Sites-ready · Single-page · Hash Navigation",
    brandTitle: "Zwischen Tradition und urbaner Gastlichkeit",
    brandText:
      "Wir verbinden georgische Weintradition mit einem klaren Berliner Premium-Auftritt: Shop, Weinbar, Erlebnisraum und Handelsplattform in einem ruhigen, luxuriösen digitalen Auftritt.",
    featuredCategories: "Ausgewählte Kategorien",
    featuredProducts: "Empfohlene Weine",
    featuredEvents: "Nächste Erlebnisse",
    reservationCta: "Private Verkostungen, Teamabende und kuratierte Abende reservieren.",
    reservationButton: "Anfrage senden",
    aboutTitle: "Über uns",
    aboutLead:
      "Unser Konzept ist nicht nur Verkauf, sondern kulturelle Vermittlung: georgische Weine werden als Sammlung, Gespräch und Gastfreundschaft präsentiert.",
    storyTitle: "Markengeschichte",
    storyText:
      "Die Plattform wurde für Berlin entwickelt, um georgische Weinidentität hochwertig und zeitgemäß zugänglich zu machen – für Endkundschaft, Gastronomie und Handel.",
    cultureTitle: "Georgische Weinkultur",
    cultureText:
      "Mit einer über Jahrtausende gewachsenen Tradition steht georgischer Wein für Handwerk, Herkunft, Amphorenkultur und eine besondere Verbindung zwischen Tisch, Ritual und Alltag.",
    conceptTitle: "Geschäftskonzept",
    conceptText:
      "Retail, Bar, Tasting, Eventverkauf und Wholesale-Zugang werden in einer einzigen klaren Oberfläche verbunden.",
    productsTitle: "Produkte & Filter",
    productsText:
      "Alle Inhalte können aus Google Sheets geladen werden. Die Oberfläche liest mehrsprachige Felder wie _DE, _EN und _KA für Texte, Produkte und Blogbeiträge.",
    productDetail: "Produktdetails",
    addToCart: "In den Warenkorb",
    filters: {
      search: "Suche",
      category: "Kategorie",
      technology: "Technologie",
      region: "Region",
      grape: "Rebsorte",
      color: "Farbe",
      type: "Typ",
      price: "Max. Preis",
      all: "Alle",
    },
    voucherTitle: "Gutschein",
    voucherText:
      "Wert frei wählbar zwischen 5 € und 5000 € – einsetzbar für Wein, Tastings und Events.",
    voucherButton: "Gutschein hinzufügen",
    storeTitle: "Online Store & Checkout",
    storeText:
      "Produkte, Gutscheine und kostenpflichtige Events werden in einem gemeinsamen Warenkorb gebündelt. Die Checkout-Logik ist statisch vorbereitet und kann später an Zahlungsanbieter oder Google Form-Flows angebunden werden.",
    cartEmpty: "Ihr Warenkorb ist noch leer.",
    subtotal: "Zwischensumme",
    checkout: "Checkout anfragen",
    eventsTitle: "Events",
    eventsText:
      "Von Masterclasses bis Supper Clubs – Events können direkt gekauft oder in den Warenkorb gelegt werden.",
    buyTicket: "Ticket hinzufügen",
    blogTitle: "Journal",
    blogText:
      "Texte über georgische Rebsorten, Qvevri-Kultur, Pairings und Geschichten hinter den Produzenten.",
    reservationTitle: "Reservierung",
    reservationText:
      "Reservierungen für Tastings, Gruppen, Firmenabende und private Formate.",
    loginTitle: "Login & Kundenbereich",
    loginText:
      "Der Frontend-Bereich ist vorbereitet für Profil, Bestellhistorie, Wunschliste und zukünftigen Wholesale-Zugang.",
    contactTitle: "Kontakt",
    contactText:
      "Adresse, Karte, Öffnungszeiten und Kontaktformular für Beratung, Eventanfragen und Handel.",
    wholesaleTitle: "Wholesale & HoReCa",
    wholesaleText:
      "Sortiment, Preislisten und B2B-Termine können für Restaurants, Bars und Fachhandel erweitert werden.",
    sheetStatusReady: "Google Sheets verbunden",
    sheetStatusSample: "Demo-Daten aktiv – Google Sheets kann direkt verbunden werden",
    sheetTitle: "Google Sheets als leichtes CMS",
    sheetText:
      "Die Website unterstützt veröffentlichte Google Sheets Tabellen für Produkte, Events und Blog. Nach Eintragung einer Spreadsheet-ID aktualisiert sich der Inhalt ohne CMS-Backend.",
    footerNote:
      "Entwickelt als moderne, responsive Single-Page-Lösung für Google Sites Embed via URL oder iframe.",
    forms: {
      name: "Name",
      email: "E-Mail",
      date: "Datum",
      guests: "Personen",
      message: "Nachricht",
      submitReservation: "Reservierungsanfrage senden",
      submitContact: "Nachricht senden",
      checkoutName: "Vollständiger Name",
      checkoutCompany: "Firma (optional)",
      checkoutSubmit: "Bestellung vormerken",
    },
    loginCards: {
      profile: "Profil & Spracheinstellungen",
      history: "Bestellhistorie",
      wishlist: "Wunschliste",
      wholesale: "Wholesale-Zugang",
    },
    placeholders: "Erweiterbar im nächsten Ausbauschritt",
    viewArticle: "Artikel öffnen",
    discoverMore: "Mehr entdecken",
  },
  EN: {
    nav: [
      ["home", "Home"],
      ["about", "About Us"],
      ["products", "Products"],
      ["store", "Online Store"],
      ["events", "Events"],
      ["blog", "Blog"],
      ["reservation", "Reservation"],
      ["login", "Login"],
      ["contact", "Contact"],
    ],
    heroEyebrow: "Georgian wine in Berlin",
    heroTitle: "A premium wine shop, bar, and tasting salon with Georgian soul.",
    heroText:
      "An elegant destination for curated bottles, barrel pours, qvevri experiences, events, and B2B distribution—crafted for a contemporary Berlin audience.",
    heroPrimary: "Discover wines",
    heroSecondary: "Reserve a tasting",
    embedBadge: "Google Sites-ready · Single-page · Hash navigation",
    brandTitle: "Where heritage meets urban hospitality",
    brandText:
      "The website presents Georgian wine through a calm, luxurious digital language: part retail shop, part wine bar, part event venue, and part wholesale portfolio.",
    featuredCategories: "Featured categories",
    featuredProducts: "Featured wines",
    featuredEvents: "Upcoming experiences",
    reservationCta: "Reserve private tastings, corporate evenings, and curated experiences.",
    reservationButton: "Send request",
    aboutTitle: "About us",
    aboutLead:
      "The concept is not just about selling wine. It is about presenting Georgian wine as culture, conversation, and hospitality in a refined Berlin context.",
    storyTitle: "Brand story",
    storyText:
      "Built for Berlin, the platform introduces Georgian wine identity with contemporary clarity for individual customers, hospitality venues, and trade partners.",
    cultureTitle: "Georgian wine culture",
    cultureText:
      "With millennia of history, Georgian wine is rooted in craftsmanship, terroir, clay vessel fermentation, and a deep bond between table, ritual, and everyday life.",
    conceptTitle: "Business concept",
    conceptText:
      "Retail, bar service, tastings, event sales, and wholesale access are combined in one elegant front-end experience.",
    productsTitle: "Products & filters",
    productsText:
      "All content can be loaded from Google Sheets. The interface reads multilingual fields such as _DE, _EN, and _KA for text, products, events, and blog entries.",
    productDetail: "Product details",
    addToCart: "Add to cart",
    filters: {
      search: "Search",
      category: "Category",
      technology: "Technology",
      region: "Region",
      grape: "Grape",
      color: "Color",
      type: "Type",
      price: "Max price",
      all: "All",
    },
    voucherTitle: "Gift voucher",
    voucherText:
      "Choose any amount between €5 and €5000 and redeem it for wine, tastings, or events.",
    voucherButton: "Add voucher",
    storeTitle: "Online store & checkout",
    storeText:
      "Products, vouchers, and paid events share one cart. The checkout flow is static and ready to be connected later to payment providers or a Google Form workflow.",
    cartEmpty: "Your cart is still empty.",
    subtotal: "Subtotal",
    checkout: "Request checkout",
    eventsTitle: "Events",
    eventsText:
      "From masterclasses to supper clubs—events can be purchased directly or added to the cart.",
    buyTicket: "Add ticket",
    blogTitle: "Journal",
    blogText:
      "Articles about Georgian grapes, qvevri culture, pairings, and the stories behind the producers.",
    reservationTitle: "Reservation",
    reservationText:
      "Reservations for tastings, groups, company evenings, and private formats.",
    loginTitle: "Login & customer area",
    loginText:
      "The front-end is prepared for profile access, order history, wishlist, and future wholesale login.",
    contactTitle: "Contact",
    contactText:
      "Address, map, opening hours, and contact form for advice, event requests, and trade inquiries.",
    wholesaleTitle: "Wholesale & HoReCa",
    wholesaleText:
      "Portfolio access, price lists, and B2B appointments can be extended for restaurants, bars, and specialist retail.",
    sheetStatusReady: "Google Sheets connected",
    sheetStatusSample: "Demo data active — Google Sheets can be connected directly",
    sheetTitle: "Google Sheets as a lightweight CMS",
    sheetText:
      "The website supports published Google Sheets tabs for products, events, and blog content. Once a spreadsheet ID is added, content can update without a traditional CMS backend.",
    footerNote:
      "Built as a modern, responsive single-page experience ready to embed into Google Sites via URL or iframe.",
    forms: {
      name: "Name",
      email: "Email",
      date: "Date",
      guests: "Guests",
      message: "Message",
      submitReservation: "Send reservation request",
      submitContact: "Send message",
      checkoutName: "Full name",
      checkoutCompany: "Company (optional)",
      checkoutSubmit: "Pre-book order",
    },
    loginCards: {
      profile: "Profile & language settings",
      history: "Order history",
      wishlist: "Wishlist",
      wholesale: "Wholesale access",
    },
    placeholders: "Extendable in the next implementation step",
    viewArticle: "Open article",
    discoverMore: "Discover more",
  },
  KA: {
    nav: [
      ["home", "მთავარი"],
      ["about", "ჩვენ შესახებ"],
      ["products", "პროდუქტები"],
      ["store", "ონლაინ მაღაზია"],
      ["events", "ივენთები"],
      ["blog", "ბლოგი"],
      ["reservation", "რეზერვაცია"],
      ["login", "ლოგინი"],
      ["contact", "კონტაქტი"],
    ],
    heroEyebrow: "ქართული ღვინო ბერლინში",
    heroTitle: "პრემიუმ ღვინის მაღაზია, ბარი და დეგუსტაციის სალონი ქართული სულით.",
    heroText:
      "ელეგანტური სივრცე შერჩეული ბოთლებისთვის, კასრის ღვინოებისთვის, ქვევრის გამოცდილებისთვის, ღონისძიებებისთვის და B2B დისტრიბუციისთვის — შექმნილი თანამედროვე ბერლინელი აუდიტორიისთვის.",
    heroPrimary: "ღვინოების აღმოჩენა",
    heroSecondary: "დეგუსტაციის დაჯავშნა",
    embedBadge: "Google Sites-ready · Single-page · Hash navigation",
    brandTitle: "სადაც მემკვიდრეობა ურბანულ სტუმართმოყვარეობას ხვდება",
    brandText:
      "საიტი ქართულ ღვინოს წარადგენს მშვიდი, მდიდრული ციფრული ენით: რითეილი, ღვინის ბარი, ღონისძიებების სივრცე და ჰოლსეილის პორტფოლიო ერთ გარემოში.",
    featuredCategories: "რჩეული კატეგორიები",
    featuredProducts: "რჩეული ღვინოები",
    featuredEvents: "მომავალი გამოცდილებები",
    reservationCta: "დაჯავშნეთ კერძო დეგუსტაციები, კორპორატიული საღამოები და კურირებული გამოცდილებები.",
    reservationButton: "მოთხოვნის გაგზავნა",
    aboutTitle: "ჩვენ შესახებ",
    aboutLead:
      "კონცეფცია მხოლოდ ღვინის გაყიდვა არ არის. ეს არის ქართული ღვინის წარდგენა როგორც კულტურა, დიალოგი და სტუმართმოყვარეობა დახვეწილ ბერლინურ კონტექსტში.",
    storyTitle: "ბრენდის ისტორია",
    storyText:
      "ბერლინისთვის შექმნილი ეს პლატფორმა ქართულ ღვინის იდენტობას თანამედროვე სიზუსტით აცნობს ინდივიდუალურ მომხმარებლებს, HoReCa სექტორს და სავაჭრო პარტნიორებს.",
    cultureTitle: "ქართული ღვინის კულტურა",
    cultureText:
      "ათასწლოვანი ისტორიის მქონე ქართული ღვინო ეფუძნება ხელობას, ტერუარს, თიხის ჭურჭელში დაყენების ტრადიციას და სუფრასა და ყოველდღიურობას შორის ღრმა კავშირს.",
    conceptTitle: "ბიზნეს კონცეფცია",
    conceptText:
      "რითეილი, ბარი, დეგუსტაციები, ღონისძიებების გაყიდვა და ჰოლსეილის წვდომა გაერთიანებულია ერთ ელეგანტურ ციფრულ გარემოში.",
    productsTitle: "პროდუქტები და ფილტრები",
    productsText:
      "ყველა კონტენტი შეიძლება ჩაიტვირთოს Google Sheets-იდან. ინტერფეისი კითხულობს მრავალენოვან ველებს, როგორიცაა _DE, _EN და _KA ტექსტებისთვის, პროდუქტებისთვის, ივენთებისთვის და ბლოგისთვის.",
    productDetail: "პროდუქტის დეტალები",
    addToCart: "კალათაში დამატება",
    filters: {
      search: "ძიება",
      category: "კატეგორია",
      technology: "ტექნოლოგია",
      region: "რეგიონი",
      grape: "ჯიში",
      color: "ფერი",
      type: "ტიპი",
      price: "მაქს. ფასი",
      all: "ყველა",
    },
    voucherTitle: "სასაჩუქრე ვაუჩერი",
    voucherText:
      "აირჩიეთ ნებისმიერი თანხა 5 €-დან 5000 €-მდე და გამოიყენეთ ღვინოზე, დეგუსტაციებზე ან ღონისძიებებზე.",
    voucherButton: "ვაუჩერის დამატება",
    storeTitle: "ონლაინ მაღაზია და ჩექაუთი",
    storeText:
      "პროდუქტები, ვაუჩერები და ფასიანი ღონისძიებები ერთ კალათაში ერთიანდება. ჩექაუთის ლოგიკა სტატიკურად არის მომზადებული და შემდგომ შეიძლება გადაებას გადახდის სისტემას ან Google Form პროცესს.",
    cartEmpty: "თქვენი კალათა ჯერ ცარიელია.",
    subtotal: "ჯამი",
    checkout: "ჩექაუთის მოთხოვნა",
    eventsTitle: "ივენთები",
    eventsText:
      "მასტერ კლასებიდან supper club-მდე — ღონისძიებები შეიძლება პირდაპირ შეიძინოთ ან კალათაში დაამატოთ.",
    buyTicket: "ბილეთის დამატება",
    blogTitle: "ჟურნალი",
    blogText:
      "სტატიები ქართულ ჯიშებზე, ქვევრის კულტურაზე, შეხამებებსა და მეღვინეების ისტორიებზე.",
    reservationTitle: "რეზერვაცია",
    reservationText:
      "რეზერვაციები დეგუსტაციებისთვის, ჯგუფებისთვის, კორპორატიული საღამოებისთვის და კერძო ფორმატებისთვის.",
    loginTitle: "ლოგინი და მომხმარებლის ზონა",
    loginText:
      "ფრონტენდი მომზადებულია პროფილის, შეკვეთების ისტორიის, სურვილების სიის და მომავალი ჰოლსეილის წვდომისთვის.",
    contactTitle: "კონტაქტი",
    contactText:
      "მისამართი, რუკა, სამუშაო საათები და საკონტაქტო ფორმა კონსულტაციისთვის, ღონისძიებების მოთხოვნებისთვის და სავაჭრო კომუნიკაციისთვის.",
    wholesaleTitle: "ჰოლსეილი და HoReCa",
    wholesaleText:
      "პორტფოლიო, ფასები და B2B შეხვედრები შეიძლება გაფართოვდეს რესტორნებისთვის, ბარებისთვის და სპეციალიზებული რითეილისთვის.",
    sheetStatusReady: "Google Sheets დაკავშირებულია",
    sheetStatusSample: "დემო მონაცემებია აქტიური — Google Sheets პირდაპირ შეიძლება დაერთოს",
    sheetTitle: "Google Sheets როგორც მსუბუქი CMS",
    sheetText:
      "საიტი მხარს უჭერს გამოქვეყნებულ Google Sheets ცხრილებს პროდუქტებისთვის, ღონისძიებებისთვის და ბლოგისთვის. Spreadsheet ID-ს დამატების შემდეგ კონტენტი განახლდება კლასიკური CMS-ის გარეშე.",
    footerNote:
      "აგებულია როგორც თანამედროვე, რესპონსიული single-page გამოცდილება, რომელიც Google Sites-ში ჩასაშენებლად მზადაა URL-ით ან iframe-ით.",
    forms: {
      name: "სახელი",
      email: "ელფოსტა",
      date: "თარიღი",
      guests: "სტუმრები",
      message: "შეტყობინება",
      submitReservation: "რეზერვაციის მოთხოვნის გაგზავნა",
      submitContact: "შეტყობინების გაგზავნა",
      checkoutName: "სრული სახელი",
      checkoutCompany: "კომპანია (არასავალდებულო)",
      checkoutSubmit: "შეკვეთის დაფიქსირება",
    },
    loginCards: {
      profile: "პროფილი და ენის პარამეტრები",
      history: "შეკვეთების ისტორია",
      wishlist: "სურვილების სია",
      wholesale: "ჰოლსეილის წვდომა",
    },
    placeholders: "გაფართოებადია შემდეგ ეტაპზე",
    viewArticle: "სტატიის გახსნა",
    discoverMore: "მეტის ნახვა",
  },
} as const;

const categorySummaries = {
  bottle: {
    DE: "Flaschenweine mit klarer Herkunft und moderner Auswahl.",
    EN: "Bottled wines with clear provenance and a curated modern range.",
    KA: "ბოთლის ღვინოები მკაფიო წარმომავლობით და კურირებული არჩევანით.",
  },
  barrel: {
    DE: "Offene Fassweine für Bar, Glasverkauf und unkomplizierten Genuss.",
    EN: "Barrel wines for by-the-glass service, hospitality, and relaxed enjoyment.",
    KA: "კასრის ღვინოები ბარისთვის, ჭიქით სერვისისთვის და თავისუფალი გამოცდილებისთვის.",
  },
  qvevri: {
    DE: "Qvevri-Weine mit Textur, Tiefe und georgischer Amphorenkultur.",
    EN: "Qvevri wines with texture, depth, and Georgian clay-vessel culture.",
    KA: "ქვევრის ღვინოები ტექსტურით, სიღრმით და ქართული თიხის კულტურით.",
  },
  voucher: {
    DE: "Flexible Gutscheine für Geschenke, Events und Genussmomente.",
    EN: "Flexible vouchers for gifting, events, and memorable wine moments.",
    KA: "მოქნილი ვაუჩერები საჩუქრებისთვის, ღონისძიებებისთვის და განსაკუთრებული მომენტებისთვის.",
  },
};

const sectionImages: Record<ProductCategory, string> = {
  bottle: retailAsset,
  barrel: tastingAsset,
  qvevri: qvevriAsset,
  voucher: heroAsset,
};

const berlinLocation = { lat: 52.5086, lng: 13.3305 };

function parseGviz(text: string) {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Invalid Google Sheets response");
  }
  return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
}

function rowsFromGviz(text: string) {
  const payload = parseGviz(text);
  const cols = payload.table.cols.map((col: { label: string }) => col.label);
  return payload.table.rows.map((row: { c: Array<{ v: string | number | null }> }) => {
    return cols.reduce((acc: Record<string, string>, key: string, index: number) => {
      acc[key] = row.c[index]?.v?.toString?.() ?? "";
      return acc;
    }, {});
  });
}

function localize<T extends Record<string, string | number | boolean | undefined>>(
  item: T,
  key: string,
  language: Language,
) {
  return String(item[`${key}_${language}` as keyof T] ?? "");
}

function useHashSection() {
  const [activeHash, setActiveHash] = useState(
    typeof window !== "undefined" ? window.location.hash.replace("#", "") || "home" : "home",
  );

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash.replace("#", "") || "home");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return activeHash;
}

function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("gwb-language") as Language | null;
    return saved ?? "DE";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sheetState, setSheetState] = useState<"sample" | "connected">("sample");
  const [products, setProducts] = useState<ProductRecord[]>(sampleProducts);
  const [events, setEvents] = useState<EventRecord[]>(sampleEvents);
  const [blog, setBlog] = useState<BlogRecord[]>(sampleBlog);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("gwb-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [voucherValue, setVoucherValue] = useState(150);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [technologyFilter, setTechnologyFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [grapeFilter, setGrapeFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(80);
  const activeSection = useHashSection();
  const t = copy[language];

  useEffect(() => {
    localStorage.setItem("gwb-language", language);
    document.documentElement.lang = language === "KA" ? "ka" : language.toLowerCase();
  }, [language]);

  useEffect(() => {
    localStorage.setItem("gwb-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const config = window.GEORGIAN_WINE_CONFIG;
    if (!config?.spreadsheetId) {
      return;
    }

    const load = async () => {
      try {
        const productsSheet = config.sheets?.products ?? "Products";
        const eventsSheet = config.sheets?.events ?? "Events";
        const blogSheet = config.sheets?.blog ?? "Blog";

        const urls = [productsSheet, eventsSheet, blogSheet].map(
          sheet =>
            `https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheet)}`,
        );

        const [productsResponse, eventsResponse, blogResponse] = await Promise.all(
          urls.map(url => fetch(url).then(response => response.text())),
        );

        const loadedProducts = rowsFromGviz(productsResponse) as unknown as ProductRecord[];
        const loadedEvents = rowsFromGviz(eventsResponse) as unknown as EventRecord[];
        const loadedBlog = rowsFromGviz(blogResponse) as unknown as BlogRecord[];

        if (loadedProducts.length) {
          setProducts(loadedProducts);
        }
        if (loadedEvents.length) {
          setEvents(loadedEvents);
        }
        if (loadedBlog.length) {
          setBlog(loadedBlog);
        }
        setSheetState("connected");
      } catch (error) {
        console.error("Google Sheets loading failed", error);
        setSheetState("sample");
      }
    };

    load();
  }, []);

  const featuredProducts = useMemo(() => products.filter(item => item.featured).slice(0, 3), [products]);
  const featuredEvents = useMemo(() => events.filter(item => item.featured).slice(0, 2), [events]);

  const categories = useMemo(
    () =>
      ["bottle", "barrel", "qvevri", "voucher"].map(key => ({
        key,
        count: products.filter(product => product.category === key).length,
      })),
    [products],
  );

  const filterOptions = useMemo(() => {
    const onlyWineProducts = products.filter(item => item.category !== "voucher");
    return {
      technologies: Array.from(new Set(onlyWineProducts.map(item => item.technology).filter(Boolean))) as string[],
      regions: Array.from(new Set(onlyWineProducts.map(item => item.region).filter(Boolean))) as string[],
      grapes: Array.from(new Set(onlyWineProducts.map(item => item.grape).filter(Boolean))) as string[],
      colors: Array.from(new Set(onlyWineProducts.map(item => item.color).filter(Boolean))) as string[],
      types: Array.from(new Set(onlyWineProducts.map(item => item.type).filter(Boolean))) as string[],
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const localizedName = localize(item, "name", language).toLowerCase();
      const localizedDescription = localize(item, "description", language).toLowerCase();
      const matchesSearch =
        !searchTerm ||
        localizedName.includes(searchTerm.toLowerCase()) ||
        localizedDescription.includes(searchTerm.toLowerCase()) ||
        item.grape?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesTechnology = technologyFilter === "all" || item.technology === technologyFilter;
      const matchesRegion = regionFilter === "all" || item.region === regionFilter;
      const matchesGrape = grapeFilter === "all" || item.grape === grapeFilter;
      const matchesColor = colorFilter === "all" || item.color === colorFilter;
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesPrice = item.price <= maxPrice;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesTechnology &&
        matchesRegion &&
        matchesGrape &&
        matchesColor &&
        matchesType &&
        matchesPrice
      );
    });
  }, [products, language, searchTerm, categoryFilter, technologyFilter, regionFilter, grapeFilter, colorFilter, typeFilter, maxPrice]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "DE" ? "de-DE" : language === "KA" ? "ka-GE" : "en-US", {
        style: "currency",
        currency: "EUR",
      }),
    [language],
  );

  const addCartItem = (next: Omit<CartItem, "quantity">) => {
    setCart(current => {
      const existing = current.find(item => item.id === next.id);
      if (existing) {
        return current.map(item =>
          item.id === next.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...next, quantity: 1 }];
    });
    toast.success(
      language === "DE"
        ? `${next.name} wurde zum Warenkorb hinzugefügt`
        : language === "EN"
          ? `${next.name} was added to the cart`
          : `${next.name} დაემატა კალათაში`,
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(current =>
      current
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const categoryLabel = (key: string) => {
    const labels = {
      bottle: language === "DE" ? "Flaschenweine" : language === "EN" ? "Bottle Wines" : "ბოთლის ღვინოები",
      barrel: language === "DE" ? "Fassweine" : language === "EN" ? "Barrel Wines" : "კასრის ღვინოები",
      qvevri: language === "DE" ? "Qvevri Weine" : language === "EN" ? "Qvevri Wines" : "ქვევრის ღვინოები",
      voucher: language === "DE" ? "Gutschein" : language === "EN" ? "Voucher" : "ვაუჩერი",
      all: t.filters.all,
    } as const;

    return labels[key as keyof typeof labels] ?? key;
  };

  const handlePlaceholder = (label: string) => {
    toast.info(`${label} — ${t.placeholders}`);
  };

  const submitReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(t.reservationButton);
    event.currentTarget.reset();
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(t.forms.submitContact);
    event.currentTarget.reset();
  };

  const submitCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(t.checkout);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[rgba(182,123,71,0.25)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(17,13,12,0.82)] backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 py-4">
          <a href="#home" className="flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-stone-200">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(182,123,71,0.35)] bg-[radial-gradient(circle_at_30%_30%,rgba(196,146,95,0.26),rgba(40,27,21,0.88))] text-[rgba(229,211,186,1)]">
              <Wine className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[0.68rem] text-stone-400">Berlin</div>
              <div className="font-medium text-stone-100">Georgian Wine Atelier</div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {t.nav.map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className={`nav-link ${activeSection === key ? "nav-link-active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="language-switcher">
              {(["DE", "EN", "KA"] as Language[]).map(item => (
                <button
                  key={item}
                  type="button"
                  className={`language-chip ${language === item ? "language-chip-active" : ""}`}
                  onClick={() => setLanguage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <a href="#store" className="cart-pill">
              <ShoppingCart className="h-4 w-4" />
              <span>{cart.length}</span>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-100 lg:hidden"
            onClick={() => setMobileMenuOpen(current => !current)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[rgba(14,11,10,0.95)] lg:hidden">
            <div className="container space-y-4 py-5">
              <div className="flex flex-wrap gap-2">
                {(["DE", "EN", "KA"] as Language[]).map(item => (
                  <button
                    key={item}
                    type="button"
                    className={`language-chip ${language === item ? "language-chip-active" : ""}`}
                    onClick={() => setLanguage(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="grid gap-3">
                {t.nav.map(([key, label]) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="nav-link-mobile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-shell overflow-hidden border-b border-white/8">
          <div className="hero-noise" />
          <div className="container grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <Badge className="mb-5 rounded-full border border-[rgba(182,123,71,0.3)] bg-[rgba(255,248,239,0.05)] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-[rgba(227,204,180,0.88)]">
                {t.heroEyebrow}
              </Badge>
              <h1 className="max-w-xl text-5xl font-medium leading-[0.96] text-stone-50 md:text-6xl lg:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-stone-300/90">{t.heroText}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="hero-button-primary h-12 rounded-full px-7 text-sm uppercase tracking-[0.18em]">
                  <a href="#products">
                    {t.heroPrimary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="hero-button-secondary h-12 rounded-full border-white/15 px-7 text-sm uppercase tracking-[0.18em] text-stone-100"
                >
                  <a href="#reservation">{t.heroSecondary}</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-stone-400">
                <span className="hero-meta-chip">Shop</span>
                <span className="hero-meta-chip">Wine Bar</span>
                <span className="hero-meta-chip">Tastings</span>
                <span className="hero-meta-chip">Wholesale</span>
              </div>
            </div>

            <div className="relative flex min-h-[420px] items-end justify-center lg:justify-end">
              <div className="hero-panel">
                <span className="hero-kicker">{t.embedBadge}</span>
                <h2 className="text-2xl text-stone-100 md:text-3xl">{t.brandTitle}</h2>
                <p className="mt-4 max-w-md leading-7 text-stone-300/90">{t.brandText}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="metric-card">
                    <span>DE / EN / KA</span>
                    <strong>Multilingual</strong>
                  </div>
                  <div className="metric-card">
                    <span>Products / Events / Blog</span>
                    <strong>Google Sheets CMS</strong>
                  </div>
                </div>
              </div>
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <img
                src={heroAsset}
                alt="Editorial Georgian wine still life"
                className="hero-cutout"
              />
            </div>
          </div>
        </section>

        <section className="section-shell section-split border-b border-white/6">
          <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="eyebrow-block">
              <span className="section-label">{t.featuredCategories}</span>
              <h2 className="section-title">{t.brandTitle}</h2>
              <p className="section-copy">{t.brandText}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {categories.map(({ key, count }) => {
                const typedKey = key as ProductCategory;
                return (
                  <Card key={key} className="category-card border-white/8 bg-[rgba(255,250,245,0.03)] text-card-foreground">
                    <CardContent className="relative flex h-full flex-col gap-6 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(220,192,160,0.8)]">{count} items</p>
                          <h3 className="mt-2 text-2xl text-stone-100">{categoryLabel(key)}</h3>
                        </div>
                        <img src={sectionImages[typedKey]} alt="" className="h-20 w-20 object-contain opacity-90" />
                      </div>
                      <p className="max-w-sm text-sm leading-7 text-stone-300/86">{categorySummaries[typedKey][language]}</p>
                      <a href="#products" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgba(224,200,175,0.88)]">
                        {t.discoverMore}
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell border-b border-white/6">
          <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="about-visual-stack">
              <div className="visual-frame visual-frame-dark">
                <img src={qvevriAsset} alt="Qvevri-inspired visual" className="h-full w-full object-contain" />
              </div>
              <div className="visual-note-card">
                <span className="section-label">Qvevri / Bottle / Barrel</span>
                <p>
                  {language === "DE"
                    ? "Drei Ausdrucksformen, ein gemeinsamer Ursprung: Herkunft, Handwerk und Erzählung."
                    : language === "EN"
                      ? "Three expressions, one shared origin: provenance, craft, and storytelling."
                      : "სამი ფორმა, ერთი საერთო საფუძველი: წარმომავლობა, ხელობა და თხრობა."}
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="section-label">{t.aboutTitle}</span>
                <h2 className="section-title">{t.aboutLead}</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="story-card">
                  <h3>{t.storyTitle}</h3>
                  <p>{t.storyText}</p>
                </div>
                <div className="story-card">
                  <h3>{t.cultureTitle}</h3>
                  <p>{t.cultureText}</p>
                </div>
                <div className="story-card">
                  <h3>{t.conceptTitle}</h3>
                  <p>{t.conceptText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section-shell border-b border-white/6">
          <div className="container space-y-8">
            <div className="section-heading-row">
              <div>
                <span className="section-label">{t.productsTitle}</span>
                <h2 className="section-title">{t.featuredProducts}</h2>
              </div>
              <p className="section-copy max-w-2xl">{t.productsText}</p>
            </div>

            <div className="filter-panel">
              <div className="grid gap-4 lg:grid-cols-[2fr_repeat(6,1fr)_0.8fr]">
                <label className="field-wrap lg:col-span-2">
                  <span>{t.filters.search}</span>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <Input
                      value={searchTerm}
                      onChange={event => setSearchTerm(event.target.value)}
                      className="field-input pl-11"
                      placeholder={t.filters.search}
                    />
                  </div>
                </label>
                <SelectField label={t.filters.category} value={categoryFilter} onChange={setCategoryFilter} options={["all", "bottle", "barrel", "qvevri", "voucher"]} language={language} />
                <SelectField label={t.filters.technology} value={technologyFilter} onChange={setTechnologyFilter} options={["all", ...filterOptions.technologies]} language={language} />
                <SelectField label={t.filters.region} value={regionFilter} onChange={setRegionFilter} options={["all", ...filterOptions.regions]} language={language} />
                <SelectField label={t.filters.grape} value={grapeFilter} onChange={setGrapeFilter} options={["all", ...filterOptions.grapes]} language={language} />
                <SelectField label={t.filters.color} value={colorFilter} onChange={setColorFilter} options={["all", ...filterOptions.colors]} language={language} />
                <SelectField label={t.filters.type} value={typeFilter} onChange={setTypeFilter} options={["all", ...filterOptions.types]} language={language} />
                <label className="field-wrap">
                  <span>{t.filters.price}</span>
                  <div className="price-stack">
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={maxPrice}
                      onChange={event => setMaxPrice(Number(event.target.value))}
                    />
                    <strong>{currencyFormatter.format(maxPrice)}</strong>
                  </div>
                </label>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map(product => (
                <article key={product.id} className="product-card">
                  <div className="product-image-shell">
                    <img src={product.image} alt={localize(product, "name", language)} className="product-image" />
                    <Badge className="product-badge">{product.badge}</Badge>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl text-stone-100">{localize(product, "name", language)}</h3>
                        <p className="mt-2 text-sm leading-7 text-stone-300/85">{localize(product, "description", language)}</p>
                      </div>
                      <button
                        type="button"
                        className="ghost-icon-button"
                        onClick={() => handlePlaceholder(t.loginCards.wishlist)}
                        aria-label="Wishlist"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[product.volume, product.region, product.grape, product.technology]
                        .filter(Boolean)
                        .map(tag => (
                          <span key={tag} className="info-pill">
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 pt-2">
                      <strong className="text-lg font-medium text-stone-100">
                        {currencyFormatter.format(product.price)}
                      </strong>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full border-white/12 bg-transparent text-stone-100"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {t.productDetail}
                        </Button>
                        <Button
                          type="button"
                          className="rounded-full bg-[rgba(181,123,73,0.95)] text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]"
                          onClick={() =>
                            addCartItem({
                              id: `${product.category}-${product.id}`,
                              kind: product.category === "voucher" ? "voucher" : "product",
                              name: localize(product, "name", language),
                              price: product.price,
                              note: product.volume,
                            })
                          }
                        >
                          {t.addToCart}
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="store" className="section-shell border-b border-white/6">
          <div className="container grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <div>
                <span className="section-label">{t.storeTitle}</span>
                <h2 className="section-title">{t.voucherTitle}</h2>
                <p className="section-copy">{t.voucherText}</p>
              </div>
              <div className="voucher-panel">
                <img src={retailAsset} alt="Retail still life" className="h-28 w-28 object-contain" />
                <div className="space-y-4">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-stone-400">{t.voucherTitle}</div>
                    <div className="mt-1 text-3xl text-stone-100">{currencyFormatter.format(voucherValue)}</div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="5000"
                    step="5"
                    value={voucherValue}
                    onChange={event => setVoucherValue(Number(event.target.value))}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    className="rounded-full bg-[rgba(181,123,73,0.95)] text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]"
                    onClick={() =>
                      addCartItem({
                        id: `voucher-${voucherValue}`,
                        kind: "voucher",
                        name: `${t.voucherTitle} ${currencyFormatter.format(voucherValue)}`,
                        price: voucherValue,
                      })
                    }
                  >
                    {t.voucherButton}
                  </Button>
                </div>
              </div>
              <div className="story-card">
                <h3>{t.storeTitle}</h3>
                <p>{t.storeText}</p>
              </div>
            </div>

            <div className="checkout-panel">
              <div className="cart-header">
                <div>
                  <span className="section-label">{t.storeTitle}</span>
                  <h3 className="text-3xl text-stone-100">{cart.length} Items</h3>
                </div>
                <ShoppingBag className="h-6 w-6 text-[rgba(220,192,160,0.86)]" />
              </div>

              <div className="space-y-3">
                {cart.length === 0 ? (
                  <div className="empty-cart-card">{t.cartEmpty}</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="cart-row">
                      <div>
                        <p className="text-base text-stone-100">{item.name}</p>
                        <p className="text-sm text-stone-400">{item.note ?? item.kind}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="quantity-switcher">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                            <PlusIcon />
                          </button>
                        </div>
                        <strong className="min-w-24 text-right text-stone-100">
                          {currencyFormatter.format(item.price * item.quantity)}
                        </strong>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="subtotal-row">
                <span>{t.subtotal}</span>
                <strong>{currencyFormatter.format(cartSubtotal)}</strong>
              </div>

              <form className="grid gap-4 md:grid-cols-2" onSubmit={submitCheckout}>
                <label className="field-wrap md:col-span-1">
                  <span>{t.forms.checkoutName}</span>
                  <Input required className="field-input" />
                </label>
                <label className="field-wrap md:col-span-1">
                  <span>{t.forms.checkoutCompany}</span>
                  <Input className="field-input" />
                </label>
                <label className="field-wrap md:col-span-2">
                  <span>{t.forms.email}</span>
                  <Input type="email" required className="field-input" />
                </label>
                <label className="field-wrap md:col-span-2">
                  <span>{t.forms.message}</span>
                  <textarea className="field-textarea" rows={4} placeholder="Stripe / external checkout / invoice workflow can be connected later." />
                </label>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-[rgba(181,123,73,0.95)] px-8 text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]"
                  >
                    {t.forms.checkoutSubmit}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="events" className="section-shell border-b border-white/6">
          <div className="container space-y-8">
            <div className="section-heading-row">
              <div>
                <span className="section-label">{t.eventsTitle}</span>
                <h2 className="section-title">{t.featuredEvents}</h2>
              </div>
              <p className="section-copy max-w-2xl">{t.eventsText}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {events.map(eventItem => (
                <article key={eventItem.id} className="event-card">
                  <div className="event-image-shell">
                    <img src={eventItem.image} alt={localize(eventItem, "name", language)} className="event-image" />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="product-badge">{eventItem.badge}</Badge>
                      <span className="text-xs uppercase tracking-[0.2em] text-stone-400">{eventItem.volume}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl text-stone-100">{localize(eventItem, "name", language)}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-300/86">{localize(eventItem, "description", language)}</p>
                    </div>
                    <div className="event-meta-grid">
                      <div>
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(eventItem.date).toLocaleDateString(language === "DE" ? "de-DE" : language === "KA" ? "ka-GE" : "en-US")}</span>
                      </div>
                      <div>
                        <MapPin className="h-4 w-4" />
                        <span>{localize(eventItem, "venue", language)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <strong className="text-lg text-stone-100">
                        {eventItem.price > 0 ? currencyFormatter.format(eventItem.price) : "By request"}
                      </strong>
                      <Button
                        type="button"
                        className="rounded-full bg-[rgba(181,123,73,0.95)] text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]"
                        onClick={() =>
                          addCartItem({
                            id: `event-${eventItem.id}`,
                            kind: "event",
                            name: localize(eventItem, "name", language),
                            price: eventItem.price,
                            note: new Date(eventItem.date).toLocaleDateString(),
                          })
                        }
                      >
                        {t.buyTicket}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="section-shell border-b border-white/6">
          <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="section-label">{t.blogTitle}</span>
              <h2 className="section-title">{t.blogText}</h2>
            </div>
            <div className="grid gap-5">
              {blog.map(article => (
                <article key={article.id} className="blog-card">
                  <img src={article.image} alt={localize(article, "name", language)} className="blog-image" />
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-stone-400">
                      <span>{article.category}</span>
                      <span>{new Date(article.date).toLocaleDateString(language === "DE" ? "de-DE" : language === "KA" ? "ka-GE" : "en-US")}</span>
                    </div>
                    <h3 className="text-2xl text-stone-100">{localize(article, "name", language)}</h3>
                    <p className="max-w-2xl text-sm leading-7 text-stone-300/84">{localize(article, "description", language)}</p>
                    <button type="button" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgba(224,200,175,0.9)]" onClick={() => handlePlaceholder(t.viewArticle)}>
                      {t.viewArticle}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reservation" className="section-shell border-b border-white/6">
          <div className="container grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
            <div className="space-y-6">
              <span className="section-label">{t.reservationTitle}</span>
              <h2 className="section-title">{t.reservationCta}</h2>
              <p className="section-copy">{t.reservationText}</p>
              <div className="reservation-image-card">
                <img src={tastingAsset} alt="Tasting salon" className="h-40 w-full object-contain" />
              </div>
            </div>
            <form className="reservation-form" onSubmit={submitReservation}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="field-wrap">
                  <span>{t.forms.name}</span>
                  <Input required className="field-input" />
                </label>
                <label className="field-wrap">
                  <span>{t.forms.email}</span>
                  <Input required type="email" className="field-input" />
                </label>
                <label className="field-wrap">
                  <span>{t.forms.date}</span>
                  <Input required type="date" className="field-input" />
                </label>
                <label className="field-wrap">
                  <span>{t.forms.guests}</span>
                  <Input required type="number" min="1" defaultValue="4" className="field-input" />
                </label>
                <label className="field-wrap md:col-span-2">
                  <span>{t.forms.message}</span>
                  <textarea className="field-textarea" rows={5} placeholder={t.reservationText} />
                </label>
              </div>
              <Button type="submit" className="mt-6 h-12 rounded-full bg-[rgba(181,123,73,0.95)] px-8 text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]">
                {t.forms.submitReservation}
              </Button>
            </form>
          </div>
        </section>

        <section id="login" className="section-shell border-b border-white/6">
          <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="section-label">{t.loginTitle}</span>
              <h2 className="section-title">{t.loginText}</h2>
              <p className="section-copy">{t.wholesaleText}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: User, label: t.loginCards.profile },
                { icon: ShoppingBag, label: t.loginCards.history },
                { icon: Heart, label: t.loginCards.wishlist },
                { icon: ShieldCheck, label: t.loginCards.wholesale },
              ].map(card => (
                <button
                  key={card.label}
                  type="button"
                  className="login-card"
                  onClick={() => handlePlaceholder(card.label)}
                >
                  <card.icon className="h-5 w-5 text-[rgba(222,192,164,0.9)]" />
                  <div>
                    <h3>{card.label}</h3>
                    <p>{t.placeholders}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell border-b border-white/6">
          <div className="container grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-6">
              <span className="section-label">{t.contactTitle}</span>
              <h2 className="section-title">{t.contactText}</h2>
              <div className="contact-stack">
                <div className="contact-item">
                  <MapPin className="h-4 w-4" />
                  <span>Knesebeckstraße area, Berlin · Premium retail & tasting location</span>
                </div>
                <div className="contact-item">
                  <Phone className="h-4 w-4" />
                  <span>+49 (0)30 555 78 920</span>
                </div>
                <div className="contact-item">
                  <Clock3 className="h-4 w-4" />
                  <span>Tue–Sun · 14:00–23:00</span>
                </div>
                <div className="contact-item">
                  <Globe className="h-4 w-4" />
                  <span>hello@georgianwine.berlin</span>
                </div>
              </div>
              <form className="grid gap-4" onSubmit={submitContact}>
                <label className="field-wrap">
                  <span>{t.forms.name}</span>
                  <Input required className="field-input" />
                </label>
                <label className="field-wrap">
                  <span>{t.forms.email}</span>
                  <Input required type="email" className="field-input" />
                </label>
                <label className="field-wrap">
                  <span>{t.forms.message}</span>
                  <textarea className="field-textarea" rows={4} />
                </label>
                <Button type="submit" className="h-12 rounded-full bg-[rgba(181,123,73,0.95)] px-8 text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]">
                  {t.forms.submitContact}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="map-shell">
                <MapView
                  className="h-[420px] overflow-hidden rounded-[2rem]"
                  initialCenter={berlinLocation}
                  initialZoom={13}
                />
              </div>
              <div className="sheet-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="section-label">{t.sheetTitle}</span>
                    <h3 className="mt-2 text-2xl text-stone-100">{sheetState === "connected" ? t.sheetStatusReady : t.sheetStatusSample}</h3>
                  </div>
                  <Filter className="h-5 w-5 text-[rgba(223,194,166,0.88)]" />
                </div>
                <p className="mt-4 max-w-2xl leading-7 text-stone-300/88">{t.sheetText}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    "Products → name_DE / name_EN / name_KA",
                    "Events → tickets, seats, dates, prices",
                    "Blog → multilingual article previews",
                  ].map(item => (
                    <div key={item} className="info-panel-chip">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[rgba(12,9,8,1)]">
        <div className="container grid gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Georgian Wine Atelier Berlin</div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-400">{t.footerNote}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {featuredProducts.map(item => (
              <div key={item.id} className="footer-chip">
                <Star className="h-3.5 w-3.5" />
                <span>{localize(item, "name", language)}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={event => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X className="h-4 w-4" />
            </button>
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="modal-image-shell">
                <img src={selectedProduct.image} alt={localize(selectedProduct, "name", language)} className="h-full w-full object-contain" />
              </div>
              <div className="space-y-5">
                <Badge className="product-badge">{selectedProduct.badge}</Badge>
                <h3 className="text-3xl text-stone-100">{localize(selectedProduct, "name", language)}</h3>
                <p className="leading-7 text-stone-300/88">{localize(selectedProduct, "description", language)}</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <DetailPanel title="Aroma" value={localize(selectedProduct, "aroma", language)} />
                  <DetailPanel title="Taste" value={localize(selectedProduct, "taste", language)} />
                  <DetailPanel title="Recommendation" value={localize(selectedProduct, "recommendation", language)} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[selectedProduct.volume, selectedProduct.region, selectedProduct.grape, selectedProduct.technology, selectedProduct.color]
                    .filter(Boolean)
                    .map(tag => (
                      <span key={tag} className="info-pill">
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <strong className="text-2xl text-stone-100">{currencyFormatter.format(selectedProduct.price)}</strong>
                  <Button
                    type="button"
                    className="rounded-full bg-[rgba(181,123,73,0.95)] text-[rgb(32,16,11)] hover:bg-[rgba(205,147,96,1)]"
                    onClick={() => {
                      addCartItem({
                        id: `${selectedProduct.category}-${selectedProduct.id}`,
                        kind: selectedProduct.category === "voucher" ? "voucher" : "product",
                        name: localize(selectedProduct, "name", language),
                        price: selectedProduct.price,
                        note: selectedProduct.volume,
                      });
                      setSelectedProduct(null);
                    }}
                  >
                    {t.addToCart}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  language,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  language: Language;
}) {
  return (
    <label className="field-wrap">
      <span>{label}</span>
      <select value={value} onChange={event => onChange(event.target.value)} className="field-select">
        {options.map(option => (
          <option key={option} value={option}>
            {option === "all"
              ? language === "DE"
                ? "Alle"
                : language === "EN"
                  ? "All"
                  : "ყველა"
              : option === "bottle" || option === "barrel" || option === "qvevri" || option === "voucher"
                ? {
                    bottle: language === "DE" ? "Flaschenweine" : language === "EN" ? "Bottle Wines" : "ბოთლის ღვინოები",
                    barrel: language === "DE" ? "Fassweine" : language === "EN" ? "Barrel Wines" : "კასრის ღვინოები",
                    qvevri: language === "DE" ? "Qvevri Weine" : language === "EN" ? "Qvevri Wines" : "ქვევრის ღვინოები",
                    voucher: language === "DE" ? "Gutschein" : language === "EN" ? "Voucher" : "ვაუჩერი",
                  }[option]
                : option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailPanel({ title, value }: { title: string; value?: string }) {
  return (
    <div className="detail-panel">
      <span>{title}</span>
      <p>{value || "—"}</p>
    </div>
  );
}

function PlusIcon() {
  return <span className="text-sm leading-none">+</span>;
}

export default Home;
