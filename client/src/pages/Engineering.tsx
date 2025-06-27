import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight, Download, Code, Server, Database } from "lucide-react";
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

const engineeringPapers = {
  en: [
    {
      id: "eng-001",
      title: "Real-time Risk Management Systems Architecture",
      abstract: "Scalable infrastructure design for low-latency risk monitoring across multiple asset classes. This paper details the implementation of a distributed system capable of processing millions of market events per second.",
      date: "2025-06-10",
      author: "Dr. Alex Petrov, Engineering Team",
      category: "Systems Architecture",
      published: "June 2025",
      tags: ["Systems Architecture", "Low Latency", "Risk Management", "Distributed Systems"],
      downloadUrl: "/papers/realtime-risk-systems.pdf"
    },
    {
      id: "eng-002",
      title: "Distributed Computing for Monte Carlo Simulations",
      abstract: "High-performance computing frameworks for large-scale financial simulations and stress testing. We present a cloud-native solution that can scale to thousands of compute nodes.",
      date: "2025-04-25",
      author: "Sarah Kim, Platform Engineering",
      category: "Computational Finance",
      published: "April 2025",
      tags: ["HPC", "Monte Carlo", "Cloud Computing", "Stress Testing"],
      downloadUrl: "/papers/distributed-monte-carlo.pdf"
    },
    {
      id: "eng-003",
      title: "Blockchain Integration for Trade Settlement",
      abstract: "Implementation of distributed ledger technology for improving trade settlement efficiency and reducing counterparty risk in institutional trading environments.",
      date: "2025-03-30",
      author: "Dr. Maria Santos, Blockchain Research",
      category: "Blockchain Technology",
      published: "March 2025",
      tags: ["Blockchain", "Settlement", "DLT", "Trade Finance"],
      downloadUrl: "/papers/blockchain-settlement.pdf"
    },
    {
      id: "eng-004",
      title: "Time Series Database Optimization for Financial Data",
      abstract: "Advanced indexing and compression techniques for storing and querying high-frequency financial data with microsecond precision requirements.",
      date: "2025-02-15",
      author: "Dr. Chen Wang, Data Engineering",
      category: "Database Systems",
      published: "February 2025",
      tags: ["Time Series DB", "Data Storage", "Query Optimization", "HFT"],
      downloadUrl: "/papers/timeseries-db-optimization.pdf"
    },
    {
      id: "eng-005",
      title: "Microservices Architecture for Trading Platforms",
      abstract: "Design patterns and best practices for building resilient, scalable trading systems using microservices architecture with event-driven communication.",
      date: "2025-01-20",
      author: "Dr. Robert Fischer, Platform Architecture",
      category: "Software Architecture",
      published: "January 2025",
      tags: ["Microservices", "Trading Platforms", "Event-Driven", "Scalability"],
      downloadUrl: "/papers/microservices-trading.pdf"
    }
  ],
  it: [
    {
      id: "eng-001",
      title: "Architettura di Sistemi per la Gestione del Rischio in Tempo Reale",
      abstract: "Design di infrastrutture scalabili per il monitoraggio del rischio a bassa latenza su più classi di attivi. Questo paper dettaglia l'implementazione di un sistema distribuito capace di processare milioni di eventi di mercato al secondo.",
      date: "2025-06-10",
      author: "Dr. Alex Petrov, Team Engineering",
      category: "Architettura di Sistemi",
      published: "Giugno 2025",
      tags: ["Architettura Sistemi", "Bassa Latenza", "Gestione Rischio", "Sistemi Distribuiti"],
      downloadUrl: "/papers/realtime-risk-systems.pdf"
    },
    {
      id: "eng-002",
      title: "Calcolo Distribuito per Simulazioni Monte Carlo",
      abstract: "Framework di calcolo ad alte prestazioni per simulazioni finanziarie su larga scala e stress testing. Presentiamo una soluzione cloud-native che può scalare fino a migliaia di nodi di calcolo.",
      date: "2025-04-25",
      author: "Sarah Kim, Platform Engineering",
      category: "Finanza Computazionale",
      published: "Aprile 2025",
      tags: ["HPC", "Monte Carlo", "Cloud Computing", "Stress Testing"],
      downloadUrl: "/papers/distributed-monte-carlo.pdf"
    },
    {
      id: "eng-003",
      title: "Integrazione Blockchain per il Settlement di Trade",
      abstract: "Implementazione di tecnologie di distributed ledger per migliorare l'efficienza del settlement delle negoziazioni e ridurre il rischio di controparte negli ambienti di trading istituzionale.",
      date: "2025-03-30",
      author: "Dr.ssa Maria Santos, Ricerca Blockchain",
      category: "Tecnologia Blockchain",
      published: "Marzo 2025",
      tags: ["Blockchain", "Settlement", "DLT", "Trade Finance"],
      downloadUrl: "/papers/blockchain-settlement.pdf"
    },
    {
      id: "eng-004",
      title: "Ottimizzazione di Database Time Series per Dati Finanziari",
      abstract: "Tecniche avanzate di indicizzazione e compressione per memorizzare e interrogare dati finanziari ad alta frequenza con requisiti di precisione al microsecondo.",
      date: "2025-02-15",
      author: "Dr. Chen Wang, Data Engineering",
      category: "Sistemi Database",
      published: "Febbraio 2025",
      tags: ["Time Series DB", "Data Storage", "Ottimizzazione Query", "HFT"],
      downloadUrl: "/papers/timeseries-db-optimization.pdf"
    },
    {
      id: "eng-005",
      title: "Architettura Microservizi per Piattaforme di Trading",
      abstract: "Pattern di design e best practices per costruire sistemi di trading resilienti e scalabili utilizzando architettura microservizi con comunicazione event-driven.",
      date: "2025-01-20",
      author: "Dr. Robert Fischer, Platform Architecture",
      category: "Architettura Software",
      published: "Gennaio 2025",
      tags: ["Microservizi", "Piattaforme Trading", "Event-Driven", "Scalabilità"],
      downloadUrl: "/papers/microservices-trading.pdf"
    }
  ]
};

const Engineering = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  const papers = engineeringPapers[language];
  const categories = ["all", "Systems Architecture", "Computational Finance", "Blockchain Technology", "Database Systems", "Software Architecture"];

  const filteredPapers = papers.filter(paper => 
    selectedCategory === "all" || paper.category === selectedCategory
  );

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const getCategoryIcon = (category: string) => {
    if (category.includes("Systems") || category.includes("Sistemi")) return <Server className="h-5 w-5" />;
    if (category.includes("Database")) return <Database className="h-5 w-5" />;
    return <Code className="h-5 w-5" />;
  };

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
            Engineering Research
          </h1>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto">
            {language === 'it' 
              ? "Innovazione tecnologica e soluzioni infrastrutturali per sistemi finanziari di nuova generazione."
              : "Technological innovation and infrastructure solutions for next-generation financial systems."
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-secondary text-white"
                    : "bg-white text-primary border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category !== "all" && getCategoryIcon(category)}
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
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {getCategoryIcon(paper.category)}
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

export default Engineering;