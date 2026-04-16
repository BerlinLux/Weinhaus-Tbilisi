import { useLocation } from "wouter";
import { Calendar, Tag } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface BlogDetailProps {
  language: Language;
  articleId?: string;
}

type Article = {
  id: string;
  date: string;
  category: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
};

const articles: Article[] = [
  {
    id: "qvevri-tradition",
    date: "2026-04-10",
    category: "Tradition",
    title: {
      DE: "Die Qvevri-Tradition",
      EN: "The Qvevri Tradition",
      KA: "ქვევრის ტრადიცია",
    },
    excerpt: {
      DE: "Erfahren Sie mehr über die alte georgische Weinmachungstechnik.",
      EN: "Learn more about the ancient Georgian winemaking technique.",
      KA: "შეიტყვეთ მეტი ძველი ქართული ღვინის დამზადების ტექნიკის შესახებ.",
    },
    content: {
      DE: "Die Qvevri ist eine große, birnenförmige Tonvase, die traditionell in Georgien zur Herstellung von Wein verwendet wird. Diese Technik ist über 8000 Jahre alt und wurde 2001 von der UNESCO zum Meisterwerk der mündlichen und immateriellen Erbe der Menschheit erklärt.",
      EN: "The Qvevri is a large, pear-shaped clay vessel traditionally used in Georgia for winemaking. This technique is over 8,000 years old and was declared a Masterpiece of the Oral and Intangible Heritage of Humanity by UNESCO in 2001.",
      KA: "ქვევრი არის დიდი, მსხლის ფორმის თიხის ჭურჭელი, რომელიც ტრადიციულად გამოიყენება ქართველებმა ღვინის დამზადებისთვის. ეს ტექნიკა 8000 წელზე ძველია და 2001 წელს UNESCO-მ გამოცხაદა როგორც კაცობრიობის ზეპირი და არამატერიალური მემკვიდრეობის შედევრი.",
    },
  },
];

export default function BlogDetail({ language, articleId }: BlogDetailProps) {
  const [, setLocation] = useLocation();
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">
            {language === "DE" ? "Artikel nicht gefunden" : language === "EN" ? "Article not found" : "სტატია არ მოიძებნა"}
          </h1>
          <button
            onClick={() => setLocation("/blog")}
            className="text-accent hover:text-accent/80 transition"
          >
            ← {language === "DE" ? "Zurück zum Blog" : language === "EN" ? "Back to Blog" : "ბლოგში დაბრუნება"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setLocation("/blog")}
          className="text-accent hover:text-accent/80 transition mb-8"
        >
          ← {language === "DE" ? "Zurück zum Blog" : language === "EN" ? "Back to Blog" : "ბლოგში დაბრუნება"}
        </button>

        <article>
          <div className="flex flex-wrap gap-4 mb-6">
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

          <h1 className="text-4xl font-semibold mb-6">{article.title[language]}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt[language]}</p>
            <p className="text-base leading-relaxed">{article.content[language]}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
