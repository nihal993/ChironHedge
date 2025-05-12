import { Link } from "wouter";
import { motion } from "framer-motion";
import { marketInsights } from "@/lib/data";

const Insights = () => {
  return (
    <section id="insights" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Insights di Mercato</h2>
            <p className="text-primary/70 max-w-2xl">
              Analisi settimanali e mensili sulle principali dinamiche di mercato, con approfondimenti esclusivi.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Link href="/newsletter" className="inline-flex items-center px-6 py-3 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
              Iscriviti alla newsletter
            </Link>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {marketInsights.map((insight, index) => (
            <motion.div 
              key={insight.id}
              className="bg-neutral rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <span className="inline-block text-xs font-medium bg-white px-3 py-1 rounded-full mb-4">{insight.type}</span>
                <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                <p className="text-primary/70 mb-5">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary/60">{insight.date}</span>
                  <Link href={`/insights/${insight.id}`} className="text-secondary hover:text-secondary/80">Leggi di più</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-neutral p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">Webinar e Presentazioni</h3>
            <p className="text-primary/70 mb-6">
              Partecipa ai nostri webinar esclusivi con analisti e professionisti del settore per approfondimenti sulle tendenze di mercato.
            </p>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-bold">Prospettive Macroeconomiche Q1 2023</h4>
                <p className="text-sm text-primary/60">22 Gennaio 2023 • 14:00 CET</p>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-bold">Strategie Multi-Factor in Periodi di Incertezza</h4>
                <p className="text-sm text-primary/60">5 Febbraio 2023 • 16:00 CET</p>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-bold">Intelligenza Artificiale nelle Strategie Quantitative</h4>
                <p className="text-sm text-primary/60">19 Febbraio 2023 • 15:00 CET</p>
              </div>
            </div>
            <Link href="/webinar" className="inline-flex items-center text-secondary hover:text-secondary/80 font-medium">
              Visualizza tutti i webinar
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="bg-neutral p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">White Papers</h3>
            <p className="text-primary/70 mb-6">
              Ricerche approfondite su tematiche di particolare rilevanza per investitori istituzionali.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded mr-3">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold">L'Evoluzione dei Fattori di Rischio nei Mercati Emergenti</h4>
                  <p className="text-sm text-primary/60">42 pagine • Pubblicato: Gennaio 2023</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-2 rounded mr-3">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold">Alternative Data: Metodologie di Integrazione Quantitativa</h4>
                  <p className="text-sm text-primary/60">35 pagine • Pubblicato: Dicembre 2022</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-2 rounded mr-3">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold">Machine Learning per la Previsione della Volatilità</h4>
                  <p className="text-sm text-primary/60">29 pagine • Pubblicato: Novembre 2022</p>
                </div>
              </div>
            </div>
            <Link href="/whitepapers" className="inline-flex items-center text-secondary hover:text-secondary/80 font-medium">
              Scarica i White Papers
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 p-6 lg:p-10 bg-primary rounded-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-4">Report Premium</h3>
              <p className="mb-6 text-neutral-300">
                Accedi ai nostri report esclusivi e approfondimenti riservati agli investitori istituzionali.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Analisi proprietarie</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Modelli quantitativi</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Backtesting avanzato</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Codice Python</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <Link href="/premium" className="block w-full py-3 px-6 gold-gradient text-primary font-medium rounded-md text-center hover:brightness-105 transition-all mb-3">
                Richiedi accesso premium
              </Link>
              <Link href="/piani" className="block w-full py-3 px-6 bg-transparent border border-secondary text-secondary font-medium rounded-md text-center hover:bg-secondary/10 transition-colors">
                Scopri i nostri piani
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Insights;
