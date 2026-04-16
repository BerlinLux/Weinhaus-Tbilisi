import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "DE" | "EN" | "KA";

interface AgeVerificationProps {
  language: Language;
  onVerified: () => void;
}

export default function AgeVerification({ language, onVerified }: AgeVerificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      setIsOpen(true);
    } else {
      onVerified();
    }
  }, [onVerified]);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setIsOpen(false);
    onVerified();
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  const content = {
    DE: {
      title: "Altersbestätigung",
      message: "Sie müssen mindestens 18 Jahre alt sein, um diese Website zu besuchen.",
      confirm: "Ich bin 18 Jahre oder älter",
      decline: "Ich bin unter 18 Jahren",
    },
    EN: {
      title: "Age Verification",
      message: "You must be at least 18 years old to visit this website.",
      confirm: "I am 18 years or older",
      decline: "I am under 18 years",
    },
    KA: {
      title: "ასაკის გადამოწმება",
      message: "ამ ვებსაიტის ნახვისთვის თქვენ უნდა იყოთ მინიმუმ 18 წლის.",
      confirm: "მე ვარ 18 წლის ან უფროსი",
      decline: "მე ვარ 18 წლის ქვემოთ",
    },
  };

  const lang = content[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">{lang.title}</h2>
        <p className="text-gray-600 mb-6">{lang.message}</p>

        <div className="space-y-3">
          <Button
            onClick={handleConfirm}
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            {lang.confirm}
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full border-gray-300"
          >
            {lang.decline}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {language === "DE"
            ? "Diese Website verkauft alkoholische Getränke."
            : language === "EN"
            ? "This website sells alcoholic beverages."
            : "ეს ვებსაიტი ყიდის ალკოჰოლურ სასმელებს."}
        </p>
      </div>
    </div>
  );
}
