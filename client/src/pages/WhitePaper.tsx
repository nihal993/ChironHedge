import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whitepaper } from "@/lib/whitepaper";

const WhitePaper = () => {
  const { language } = useLanguage();
  const [downloading, setDownloading] = useState(false);

  // Helper function to get translated content
  const t = (key: keyof typeof whitepaper) => {
    return whitepaper[key][language];
  };

  const handleDownload = () => {
    setDownloading(true);
    // Qui dovresti implementare la logica di download del documento
    // In un"implementazione reale, questo potrebbe essere un link diretto a un file
    // o una richiesta API per generare e scaricare il documento
    
    // Simulazione del download
    setTimeout(() => {
      setDownloading(false);
      // In un ambiente reale, questo punto potrebbe essere raggiunto 
      // dopo il completamento del download effettivo
      alert(t("downloadSuccess"));
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span className="mr-4">{t("publishedDate")}</span>
          <span className="mr-4">|</span>
          <span>{t("authors")}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">{t("summaryTitle")}</h2>
        
        <p className="mb-4">
          {t("summaryPara1")}
        </p>
        
        <p className="mb-4">
          {t("summaryPara2")}
        </p>
        
        <div className="my-8 border-l-4 border-secondary pl-6 py-2 bg-gray-50">
          <p className="text-lg italic">
            {t("keyQuote")}
          </p>
        </div>
        
        <p className="mb-6">
          {t("summaryPara3")}
        </p>
        
        <h3 className="text-xl font-semibold mb-4">{t("keyFindings")}</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>{t("finding1")}</li>
          <li>{t("finding2")}</li>
          <li>{t("finding3")}</li>
          <li>{t("finding4")}</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-4">{t("conclusion")}</h3>
        <p>
          {t("conclusionText")}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{t("downloadTitle")}</h3>
            <p className="text-gray-600 mb-4 md:mb-0">
              {t("downloadDescription")}
            </p>
          </div>
          
          <Button 
            onClick={handleDownload} 
            disabled={downloading}
            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-4 rounded-md"
          >
            {downloading ? (
              <span className="flex items-center">
                <ArrowDown className="animate-bounce mr-2 h-4 w-4" />
                {t("downloading")}
              </span>
            ) : (
              <span className="flex items-center">
                <FileDown className="mr-2 h-5 w-5" />
                {t("downloadButton")}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;
