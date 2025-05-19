import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { researchCategories } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

// Definizione di tipi per gli articoli di ricerca
interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  date: string;
  author: string;
  category: string;
}

// Featured Research Papers con supporto multilingua
const getFeaturedPapers = (language: string): ResearchPaper[] => {
  if (language === 'it') {
    return [
      {
        id: "paper1",
        title: "Implicazioni Macroeconomiche delle Valute Digitali delle Banche Centrali",
        abstract: "Questo studio esamina l'impatto potenziale delle valute digitali delle banche centrali (CBDC) sui sistemi economici globali, con particolare attenzione alle loro implicazioni per la politica monetaria e la stabilità finanziaria.",
        date: "Maggio 2025",
        author: "Team di Ricerca",
        category: "Macro"
      },
      {
        id: "paper2",
        title: "Premio al Rischio di Volatilità: Estrazione e Applicazioni nella Costruzione di Portafogli",
        abstract: "Questo paper analizza la struttura e l'evoluzione del premio al rischio di volatilità nei mercati azionari e le sue applicazioni pratiche nella costruzione di portafogli resistenti agli shock di mercato.",
        date: "Aprile 2025",
        author: "Team Quantitativo",
        category: "Volatilità"
      },
      {
        id: "paper3",
        title: "Integrazione ESG nell'Analisi del Reddito Fisso Sovrano",
        abstract: "Una metodologia innovativa per incorporare i fattori ESG nell'analisi del rischio sovrano, con un framework quantitativo per misurare l'impatto sui rendimenti attesi dei titoli di stato.",
        date: "Marzo 2025",
        author: "Team Credito",
        category: "Reddito Fisso"
      }
    ];
  } else {
    return [
      {
        id: "paper1",
        title: "Macroeconomic Implications of Central Bank Digital Currencies",
        abstract: "This study examines the potential impact of central bank digital currencies (CBDCs) on global economic systems, with particular attention to their implications for monetary policy and financial stability.",
        date: "May 2025",
        author: "Research Team",
        category: "Macro"
      },
      {
        id: "paper2",
        title: "Volatility Risk Premium: Extraction and Applications in Portfolio Construction",
        abstract: "This paper analyzes the structure and evolution of the volatility risk premium in equity markets and its practical applications in constructing portfolios resilient to market shocks.",
        date: "April 2025",
        author: "Quantitative Team",
        category: "Volatility"
      },
      {
        id: "paper3",
        title: "ESG Integration in Sovereign Fixed Income Analysis",
        abstract: "An innovative methodology for incorporating ESG factors into sovereign risk analysis, with a quantitative framework for measuring the impact on expected returns of government securities.",
        date: "March 2025",
        author: "Credit Team",
        category: "Fixed Income"
      }
    ];
  }
};

const Research = () => {
  const { t, language } = useLanguage();
  // Ottieni gli articoli nella lingua corrente
  const papers = getFeaturedPapers(language);
  
  return (
    <section className="py-20 md:py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Research</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Explore our cutting-edge research and insights that drive quantitative investment strategies and market analysis
          </p>
        </motion.div>
        
        {/* SEZIONE 1: Featured Research Papers */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-200">
            {t('research.featuredPapers')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {papers.map((paper, index) => (
              <motion.div 
                key={paper.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white bg-primary rounded-full px-3 py-1">
                      {paper.category}
                    </span>
                    <span className="text-xs text-gray-500">{paper.date}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{paper.title}</h4>
                  <p className="text-primary/70 text-sm mb-4">{paper.abstract}</p>
                  <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
                    <Link href={`/research/${paper.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center text-sm">
                      {t('research.readMore')} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* SEZIONE 2: Research Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-200">
            {t('research.researchCategories')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <img 
                  src={category.imageSrc} 
                  alt={category.imageAlt} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <p className="text-primary/70 mb-6">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">{category.reportsCount}+ {t('research.reports')}</span>
                    <Link href={`/research/${category.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                      {t('research.viewPapers')} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;