import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  date: string;
  author: string;
  category: string;
  published: string;
  tags: string[];
  downloadUrl?: string;
}

const dataSciencePapers = {
  en: [
    {
      id: "ds-001",
      title: "Deep Learning Applications in High-Frequency Trading",
      abstract: "Novel neural network architectures for market microstructure analysis and execution optimization. This paper explores the implementation of transformer models for predicting short-term price movements in equity markets.",
      date: "2025-06-15",
      author: "Dr. Sarah Chen, Data Science Team",
      category: "Machine Learning",
      published: "June 2025",
      tags: ["Deep Learning", "HFT", "Market Microstructure", "Neural Networks"],
      downloadUrl: "/papers/deep-learning-hft.pdf"
    },
    {
      id: "ds-002",
      title: "NLP for Financial Sentiment Analysis at Scale",
      abstract: "Large language models for real-time sentiment extraction from financial news and social media. We present a framework for processing millions of text documents daily to generate trading signals.",
      date: "2025-05-20",
      author: "Dr. Michael Rodriguez, NLP Research Group",
      category: "Natural Language Processing",
      published: "May 2025",
      tags: ["NLP", "Sentiment Analysis", "LLMs", "Financial News"],
      downloadUrl: "/papers/nlp-sentiment-analysis.pdf"
    },
    {
      id: "ds-003",
      title: "Graph Neural Networks for Portfolio Risk Management",
      abstract: "Application of graph-based machine learning models to capture complex relationships between financial instruments and improve risk estimation accuracy.",
      date: "2025-04-10",
      author: "Dr. Elena Volkov, Quantitative Research",
      category: "Graph ML",
      published: "April 2025",
      tags: ["Graph Neural Networks", "Risk Management", "Portfolio Theory"],
      downloadUrl: "/papers/gnn-risk-management.pdf"
    },
    {
      id: "ds-004",
      title: "Reinforcement Learning for Algorithmic Trading",
      abstract: "Multi-agent reinforcement learning frameworks for developing adaptive trading strategies that can respond to changing market conditions in real-time.",
      date: "2025-03-15",
      author: "Dr. James Thompson, AI Research Lab",
      category: "Reinforcement Learning",
      published: "March 2025",
      tags: ["Reinforcement Learning", "Algorithmic Trading", "Multi-Agent Systems"],
      downloadUrl: "/papers/rl-algorithmic-trading.pdf"
    }
  ],
  it: [
    {
      id: "ds-001",
      title: "Applicazioni del Deep Learning nel Trading ad Alta Frequenza",
      abstract: "Architetture neurali innovative per l'analisi della microstruttura del mercato e l'ottimizzazione dell'esecuzione. Questo paper esplora l'implementazione di modelli transformer per predire movimenti di prezzo a breve termine nei mercati azionari.",
      date: "2025-06-15",
      author: "Dr.ssa Sarah Chen, Team Data Science",
      category: "Machine Learning",
      published: "Giugno 2025",
      tags: ["Deep Learning", "HFT", "Microstruttura di Mercato", "Reti Neurali"],
      downloadUrl: "/papers/deep-learning-hft.pdf"
    },
    {
      id: "ds-002",
      title: "NLP per l'Analisi del Sentiment Finanziario su Larga Scala",
      abstract: "Modelli linguistici avanzati per l'estrazione del sentiment in tempo reale da notizie finanziarie e social media. Presentiamo un framework per processare milioni di documenti di testo giornalmente per generare segnali di trading.",
      date: "2025-05-20",
      author: "Dr. Michael Rodriguez, Gruppo di Ricerca NLP",
      category: "Natural Language Processing",
      published: "Maggio 2025",
      tags: ["NLP", "Analisi Sentiment", "LLMs", "Notizie Finanziarie"],
      downloadUrl: "/papers/nlp-sentiment-analysis.pdf"
    },
    {
      id: "ds-003",
      title: "Reti Neurali a Grafo per la Gestione del Rischio di Portafoglio",
      abstract: "Applicazione di modelli di machine learning basati su grafi per catturare relazioni complesse tra strumenti finanziari e migliorare l'accuratezza della stima del rischio.",
      date: "2025-04-10",
      author: "Dr.ssa Elena Volkov, Ricerca Quantitativa",
      category: "Graph ML",
      published: "Aprile 2025",
      tags: ["Reti Neurali a Grafo", "Gestione Rischio", "Teoria del Portafoglio"],
      downloadUrl: "/papers/gnn-risk-management.pdf"
    },
    {
      id: "ds-004",
      title: "Reinforcement Learning per il Trading Algoritmico",
      abstract: "Framework di reinforcement learning multi-agente per sviluppare strategie di trading adattive che possono rispondere a condizioni di mercato in cambiamento in tempo reale.",
      date: "2025-03-15",
      author: "Dr. James Thompson, AI Research Lab",
      category: "Reinforcement Learning",
      published: "Marzo 2025",
      tags: ["Reinforcement Learning", "Trading Algoritmico", "Sistemi Multi-Agente"],
      downloadUrl: "/papers/rl-algorithmic-trading.pdf"
    }
  ]
};

const DataScience = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  const papers = dataSciencePapers[language];
  const categories = ["all", "Machine Learning", "Natural Language Processing", "Graph ML", "Reinforcement Learning"];

  const filteredPapers = papers.filter(paper => 
    selectedCategory === "all" || paper.category === selectedCategory
  );

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Data Science Research
          </h1>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto">
            {language === 'it' 
              ? "Ricerca all'avanguardia nell'applicazione del machine learning e dell'intelligenza artificiale ai mercati finanziari."
              : "Cutting-edge research in applying machine learning and artificial intelligence to financial markets."
            }
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-secondary text-white"
                    : "bg-white text-primary border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category === "all" ? (language === 'it' ? "Tutti" : "All") : category}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-md bg-white text-primary"
          >
            <option value="date">{language === 'it' ? "Per Data" : "By Date"}</option>
            <option value="title">{language === 'it' ? "Per Titolo" : "By Title"}</option>
          </select>
        </div>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sortedPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {paper.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {paper.published}
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-3">{paper.title}</h3>
              
              <p className="text-primary/70 text-sm mb-4 line-clamp-3">
                {paper.abstract}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" />
                {paper.author}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="text-secondary hover:text-secondary/80 font-medium text-sm flex items-center">
                  {language === 'it' ? "Leggi di più" : "Read more"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
                {paper.downloadUrl && (
                  <button className="text-primary hover:text-secondary text-sm flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {language === 'it' ? "Scarica PDF" : "Download PDF"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {sortedPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-primary/70 text-lg">
              {language === 'it' 
                ? "Nessun articolo trovato per questa categoria."
                : "No papers found for this category."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataScience;