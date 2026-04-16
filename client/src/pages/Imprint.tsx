import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

type Language = "DE" | "EN" | "KA";

interface ImprintProps {
  language: Language;
}

export default function Imprint({ language }: ImprintProps) {
  const [, setLocation] = useLocation();

  const content = {
    DE: {
      title: "Impressum",
      sections: [
        {
          heading: "Angaben gemäß § 5 TMG",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
            "Deutschland",
          ],
        },
        {
          heading: "Kontakt",
          items: [
            "E-Mail: hello@georgianwine.berlin",
            "Telefon: +49 (0) 30 12345678",
          ],
        },
        {
          heading: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
          ],
        },
        {
          heading: "Haftungsausschluss",
          text: "Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.",
        },
        {
          heading: "Urheberrecht",
          text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers.",
        },
      ],
    },
    EN: {
      title: "Imprint",
      sections: [
        {
          heading: "Information according to § 5 TMG",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
            "Germany",
          ],
        },
        {
          heading: "Contact",
          items: [
            "Email: hello@georgianwine.berlin",
            "Phone: +49 (0) 30 12345678",
          ],
        },
        {
          heading: "Responsible for content according to § 55 Abs. 2 RStV",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
          ],
        },
        {
          heading: "Disclaimer",
          text: "The contents of this website are created with the greatest care. However, we assume no liability for the correctness, completeness and timeliness of the contents.",
        },
        {
          heading: "Copyright",
          text: "The contents and works created by the site operators are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the author or creator.",
        },
      ],
    },
    KA: {
      title: "იმპრინტი",
      sections: [
        {
          heading: "ინფორმაცია § 5 TMG-ის მიხედვით",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
            "გერმანია",
          ],
        },
        {
          heading: "კონტაქტი",
          items: [
            "ელ-ფოსტა: hello@georgianwine.berlin",
            "ტელეფონი: +49 (0) 30 12345678",
          ],
        },
        {
          heading: "პასუხისმგებელი კონტენტისთვის § 55 Abs. 2 RStV-ის მიხედვით",
          items: [
            "Georgian Wine Berlin",
            "Charlottenburg",
            "10587 Berlin",
          ],
        },
        {
          heading: "პასუხისმგებლობის უარყოფა",
          text: "ამ ვებსაიტის კონტენტი შედგენილია უდიდესი ზრუნვით. თუმცა, ჩვენ არ ვიღებთ პასუხისმგებლობას კონტენტის სისწორეზე, სრულყოფილებაზე და აქტუალობაზე.",
        },
        {
          heading: "ავტორის უფლება",
          text: "ამ საიტის ოპერატორების მიერ შექმნილი კონტენტი და ნამუშევარი ექვემდებარება გერმანული ავტორის უფლების კანონს.",
        },
      ],
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{lang.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {lang.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
              {section.items ? (
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <p key={itemIdx} className="text-gray-600">
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">{section.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
