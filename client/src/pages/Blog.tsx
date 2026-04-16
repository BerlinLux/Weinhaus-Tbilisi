import { useLocation } from "wouter";
import { Calendar, Tag } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface BlogProps {
  language: Language;
}

const articles = [
  {
    id: "why-qvevri",
    date: "2026-04-10",
    category: "Tradition",
    title: {
      DE: "Warum Qvevri wichtig ist",
      EN: "Why Qvevri Matters",
      KA: "რატომ მნიშვნელოვანია ქვევრი",
    },
    excerpt: {
      DE: "Die Qvevri-Technologie ist das Herzstück der georgischen Weinkultur und eine der ältesten Methoden der Welt.",
      EN: "The qvevri technique is the heart of Georgian wine culture and one of the oldest methods in the world.",
      KA: "ქვევრის ტექნოლოგია არის ქართული ღვინის კულტურის გული და მსოფლიოს ერთ-ერთი უძველესი მეთოდი.",
    },
    content: {
      DE: "Die Qvevri ist ein großes, eierförmiges Tongefäß, das in den Boden eingegraben wird. Diese 8000 Jahre alte Methode ermöglicht eine natürliche Gärung und Reifung des Weins. Die Tannine und Säuren entwickeln sich auf natürliche Weise, was zu komplexen, strukturierten Weinen führt.",
      EN: "The qvevri is a large, egg-shaped clay vessel buried in the ground. This 8,000-year-old method enables natural fermentation and aging of wine. Tannins and acids develop naturally, resulting in complex, structured wines.",
      KA: "ქვევრი არის დიდი, კვერცხის ფორმის თიხის ჭურჭელი, რომელიც მიწაში ჩაძირულია. ეს 8000 წლის წინანდელი მეთოდი ღვინის ბუნებრივი დუღილისა და დამდეგის საშუალებას იძლევა.",
    },
  },
  {
    id: "berlin-wine-scene",
    date: "2026-04-05",
    category: "Culture",
    title: {
      DE: "Berlins aufstrebende Weinszene",
      EN: "Berlin's Emerging Wine Scene",
      KA: "ბერლინის აღმავალი ღვინის სცენა",
    },
    excerpt: {
      DE: "Wie georgische Weine die Berliner Gastronomieszene transformieren.",
      EN: "How Georgian wines are transforming Berlin's culinary scene.",
      KA: "როგორ ცვლის ქართული ღვინე ბერლინის კულინარიულ სცენას.",
    },
    content: {
      DE: "Berlin ist nicht nur für Bier bekannt. In den letzten Jahren hat sich die Stadt zu einem Zentrum für natürliche und handwerkliche Weine entwickelt. Georgische Weine, mit ihrer Tiefe und Komplexität, passen perfekt in diese Bewegung.",
      EN: "Berlin is known for more than just beer. In recent years, the city has become a hub for natural and artisanal wines. Georgian wines, with their depth and complexity, fit perfectly into this movement.",
      KA: "ბერლინი ცნობილია არა მხოლოდ ლუდით. ბოლო წლებში ქალაქი გახდა ბუნებრივი და ხელოვნური ღვინეების ცენტრი. ქართული ღვინე, მათი სიღრმე და სირთულით, სრულყოფილად ჯდება ამ მოძრაობაში.",
    },
  },
  {
    id: "amber-guide",
    date: "2026-03-28",
    category: "Education",
    title: {
      DE: "Anfängerleitfaden zu Amber Wines",
      EN: "Beginner's Guide to Amber Wines",
      KA: "დამწყებთა გზამკვლელი ქარვისფერი ღვინებში",
    },
    excerpt: {
      DE: "Alles was Sie über Amber Wines wissen müssen.",
      EN: "Everything you need to know about amber wines.",
      KA: "ყველაფერი რაც უნდა იცოდეთ ქარვისფერი ღვინებზე.",
    },
    content: {
      DE: "Amber Wines sind weiße Weine, die wie rote Weine hergestellt werden – mit Traubenschalen in Kontakt. Dies gibt ihnen ihre charakteristische bernsteinfarbene Farbe und komplexe Geschmacksprofile.",
      EN: "Amber wines are white wines made like red wines – in contact with grape skins. This gives them their characteristic amber color and complex flavor profiles.",
      KA: "ქარვისფერი ღვინე არის თეთრი ღვინე, რომელიც წითელი ღვინის მსგავსად დამზადებულია - ყურძლის კожასთან კონტაქტში. ეს მათ აძლევს მახასიათებელ ქარვის ფერს და რთულ გემოს პროფილებს.",
    },
  },
];

export default function Blog({ language }: BlogProps) {
  const [, setLocation] = useLocation();

  const labels = {
    DE: {
      title: "Blog",
      readMore: "Mehr lesen",
      back: "Zurück",
    },
    EN: {
      title: "Blog",
      readMore: "Read More",
      back: "Back",
    },
    KA: {
      title: "ბლოგი",
      readMore: "მეტის წაკითხვა",
      back: "უკან",
    },
  };

  const lang = labels[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border-b border-border pb-8 last:border-b-0"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString(
                    language === "DE" ? "de-DE" : language === "EN" ? "en-US" : "ka-GE"
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  {article.category}
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-3">{article.title[language]}</h2>
              <p className="text-muted-foreground mb-4">{article.excerpt[language]}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{article.content[language]}</p>

              <button
                onClick={() => setLocation(`/blog/${article.id}`)}
                className="text-accent font-medium hover:text-accent/80 transition"
              >
                {lang.readMore} →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
