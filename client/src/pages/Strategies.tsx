import { Link } from "wouter";
import { motion } from "framer-motion";
import { strategies } from "@/lib/data";
import FinancialChart from "@/components/FinancialChart";
import { Check } from "lucide-react";

const Strategies = () => {
  return (
    <section id="strategie" className="py-20 md:py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Strategie Quantitative</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Le nostre strategie proprietarie uniscono tecniche all'avanguardia di machine learning, big data e modellazione finanziaria tradizionale.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {strategies.map((strategy, index) => (
            <motion.div 
              key={strategy.id}
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-3 mr-4 flex-shrink-0">
                  {strategy.icon === 'chart-line' ? (
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  )}
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-bold mb-3">{strategy.title}</h3>
                  <p className="text-primary/70 mb-6">
                    {strategy.description}
                  </p>
                  <div className="bg-neutral rounded-lg p-4 mb-4">
                    <FinancialChart 
                      chartData={strategy.chartDataset} 
                      labels={strategy.labels}
                      title={strategy.title}
                      height={180}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-primary/70">Performance YTD</p>
                      <p className="text-lg font-bold text-secondary">{strategy.performance}</p>
                    </div>
                    <Link href={`/strategie/${strategy.id}`} className="text-secondary hover:text-secondary/80 font-medium">
                      Esplora la strategia
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-white p-8 md:p-10 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Soluzioni Customizzate</h3>
              <p className="text-primary/70 mb-6">
                Sviluppiamo strategie quantitative su misura in base alle esigenze specifiche, ai vincoli e agli obiettivi dei nostri clienti istituzionali.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">Implementazione di vincoli ESG personalizzati</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">Integrazione con i sistemi e processi esistenti</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">Ottimizzazione per obiettivi specifici di rischio-rendimento</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">Supporto implementativo completo, incluso codice produzione-ready</span>
                </li>
              </ul>
              <Link href="/contatti" className="inline-flex items-center px-6 py-3 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
                Richiedi una consulenza
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Mathematical financial model visualization" 
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-primary p-8 rounded-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Confronto di Performance</h3>
              <p className="text-neutral-200 mb-6">
                Le nostre strategie hanno costantemente sovraperformato i benchmark di riferimento negli ultimi 5 anni.
              </p>
              <div className="bg-primary-light/20 p-6 rounded-lg">
                <div className="h-64">
                  <FinancialChart 
                    chartData={[30, 35, 40, 50, 45, 60, 70, 80, 85, 90, 95]} 
                    labels={["2018", "2019", "Q1 2020", "Q2 2020", "Q3 2020", "Q4 2020", "Q1 2021", "Q2 2021", "Q3 2021", "Q4 2021", "2022"]}
                    title="Confronto Performance"
                    height={240}
                  />
                </div>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-secondary mr-2 rounded-full"></span>
                    <span>Strategie QuantumFinance</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-white/60 mr-2 rounded-full"></span>
                    <span>Benchmark di mercato</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2">Alpha Generato</h4>
                  <p className="text-4xl font-bold text-secondary mb-1">+3.8%</p>
                  <p className="text-sm text-neutral-300">annualizzato (5 anni)</p>
                </div>
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2">Sharpe Ratio</h4>
                  <p className="text-4xl font-bold text-secondary mb-1">1.75</p>
                  <p className="text-sm text-neutral-300">vs 0.92 benchmark</p>
                </div>
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2">Max Drawdown</h4>
                  <p className="text-4xl font-bold text-secondary mb-1">-12.4%</p>
                  <p className="text-sm text-neutral-300">vs -22.8% benchmark</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Strategies;
