import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Calendar, User, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { researchCategories, ResearchCategory } from "@/lib/data";
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

// Featured Research Papers in italiano
const italianPapers: ResearchPaper[] = [
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

// Featured Research Papers in inglese
const englishPapers: ResearchPaper[] = [
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

// Categorie di ricerca in italiano
const italianCategories: ResearchCategory[] = [
  {
    id: "macro",
    title: "Analisi Macroeconomica",
    description: "Valutazioni tempestive sui principali trend macroeconomici e il loro impatto sui mercati globali.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Modelli finanziari matematici",
    reportsCount: 20
  },
  {
    id: "volatility",
    title: "Volatilità",
    description: "Modelli proprietari di previsione della volatilità e strategie di trading relative.",
    imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Visualizzazione della volatilità",
    reportsCount: 15
  },
  {
    id: "credit",
    title: "Ricerca sul Credito",
    description: "Analisi approfondite sui mercati del credito con focus su pricing relativo e anomalie.",
    imageSrc: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Visualizzazione dati mercato del credito",
    reportsCount: 18
  },
  {
    id: "equity",
    title: "Fattori Azionari",
    description: "Ricerche sui fattori azionari, dalla value al momentum, con applicazioni pratiche.",
    imageSrc: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Modelli di fattori azionari",
    reportsCount: 25
  },
  {
    id: "fixed-income",
    title: "Strategie di Reddito Fisso",
    description: "Strategie di trading e investimento sui mercati obbligazionari globali.",
    imageSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Modelli di strategia a reddito fisso",
    reportsCount: 22
  },
  {
    id: "alternative-data",
    title: "Dati Alternativi",
    description: "Sfruttamento di dataset non convenzionali per generare alpha nei mercati finanziari.",
    imageSrc: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Visualizzazione di dati alternativi",
    reportsCount: 12
  }
];

// Research subsections data
const researchSubsections = {
  en: {
    dataScience: {
      title: "Data Science",
      description: "Advanced machine learning and statistical modeling for financial markets",
      papers: [
        {
          id: "ds1",
          title: "Deep Learning Applications in High-Frequency Trading",
          abstract: "Novel neural network architectures for market microstructure analysis and execution optimization.",
          date: "June 2025",
          author: "Data Science Team",
          category: "Machine Learning"
        },
        {
          id: "ds2", 
          title: "NLP for Financial Sentiment Analysis at Scale",
          abstract: "Large language models for real-time sentiment extraction from financial news and social media.",
          date: "May 2025",
          author: "NLP Research Group",
          category: "Natural Language Processing"
        }
      ]
    },
    engineering: {
      title: "Engineering",
      description: "Infrastructure, systems architecture, and computational finance solutions",
      papers: [
        {
          id: "eng1",
          title: "Real-time Risk Management Systems Architecture",
          abstract: "Scalable infrastructure design for low-latency risk monitoring across multiple asset classes.",
          date: "June 2025",
          author: "Engineering Team",
          category: "Systems Architecture"
        },
        {
          id: "eng2",
          title: "Distributed Computing for Monte Carlo Simulations",
          abstract: "High-performance computing frameworks for large-scale financial simulations and stress testing.",
          date: "April 2025",
          author: "Platform Engineering",
          category: "Computational Finance"
        }
      ]
    }
  },
  it: {
    dataScience: {
      title: "Data Science",
      description: "Machine learning avanzato e modelli statistici per i mercati finanziari",
      papers: [
        {
          id: "ds1",
          title: "Applicazioni del Deep Learning nel Trading ad Alta Frequenza",
          abstract: "Architetture neurali innovative per l'analisi della microstruttura del mercato e l'ottimizzazione dell'esecuzione.",
          date: "Giugno 2025",
          author: "Team Data Science",
          category: "Machine Learning"
        },
        {
          id: "ds2",
          title: "NLP per l'Analisi del Sentiment Finanziario su Larga Scala",
          abstract: "Modelli linguistici avanzati per l'estrazione del sentiment in tempo reale da notizie finanziarie e social media.",
          date: "Maggio 2025", 
          author: "Gruppo di Ricerca NLP",
          category: "Natural Language Processing"
        }
      ]
    },
    engineering: {
      title: "Engineering",
      description: "Infrastrutture, architetture di sistema e soluzioni di finanza computazionale",
      papers: [
        {
          id: "eng1",
          title: "Architettura di Sistemi per la Gestione del Rischio in Tempo Reale",
          abstract: "Design di infrastrutture scalabili per il monitoraggio del rischio a bassa latenza su più classi di attivi.",
          date: "Giugno 2025",
          author: "Team Engineering",
          category: "Architettura di Sistemi"
        },
        {
          id: "eng2",
          title: "Calcolo Distribuito per Simulazioni Monte Carlo",
          abstract: "Framework di calcolo ad alte prestazioni per simulazioni finanziarie su larga scala e stress testing.",
          date: "Aprile 2025",
          author: "Platform Engineering",
          category: "Finanza Computazionale"
        }
      ]
    }
  }
};

const Research = () => {
  const { t, language } = useLanguage();
  const [activeSubsection, setActiveSubsection] = useState<'overview' | 'dataScience' | 'engineering'>('overview');
  
  // Seleziona gli articoli e le categorie in base alla lingua
  const papers = language === 'it' ? italianPapers : englishPapers;
  const categories = language === 'it' ? italianCategories : researchCategories;
  const subsections = researchSubsections[language];
  
  return (
    <section className="py-20 md:py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('research.title')}</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            {t('research.description')}
          </p>
        </motion.div>

        {/* Research Section Navigation - Inspired by Two Sigma */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setActiveSubsection('overview')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSubsection === 'overview'
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSubsection('dataScience')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSubsection === 'dataScience'
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                {subsections.dataScience.title}
              </button>
              <button
                onClick={() => setActiveSubsection('engineering')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSubsection === 'engineering'
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                {subsections.engineering.title}
              </button>
            </div>
          </div>
        </div>
        
        {/* Conditional Content based on active subsection */}
        <AnimatePresence mode="wait">
          {activeSubsection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* SEZIONE 1: Featured Research Papers */}
              <div className="mb-20">
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
              </div>

              {/* Research Categories within Overview */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-200">
                  {t('research.researchCategories')}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category, index) => (
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
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-secondary font-medium">
                            {category.reportsCount} {t('research.reports')}
                          </span>
                          <ChevronRight className="h-5 w-5 text-secondary" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubsection === 'dataScience' && (
            <motion.div
              key="dataScience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{subsections.dataScience.title}</h3>
                <p className="text-primary/70 text-lg">{subsections.dataScience.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {subsections.dataScience.papers.map((paper, index) => (
                  <motion.div 
                    key={paper.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-white bg-purple-600 rounded-full px-3 py-1">
                          {paper.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {paper.date}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-3">{paper.title}</h4>
                      <p className="text-primary/70 text-sm mb-4">{paper.abstract}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          {paper.author}
                        </div>
                        <Link href={`/research/data-science/${paper.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center text-sm">
                          Read more <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSubsection === 'engineering' && (
            <motion.div
              key="engineering"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{subsections.engineering.title}</h3>
                <p className="text-primary/70 text-lg">{subsections.engineering.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {subsections.engineering.papers.map((paper, index) => (
                  <motion.div 
                    key={paper.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-white bg-green-600 rounded-full px-3 py-1">
                          {paper.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {paper.date}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-3">{paper.title}</h4>
                      <p className="text-primary/70 text-sm mb-4">{paper.abstract}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          {paper.author}
                        </div>
                        <Link href={`/research/engineering/${paper.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center text-sm">
                          Read more <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
            {categories.map((category, index) => (
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