import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 blur-load">
          <img 
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80" 
            alt="Abstract financial data visualization" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h5 className="text-secondary font-medium mb-3">RICERCA FINANZIARIA AVANZATA</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Soluzioni di Ricerca Quantitativa di Livello Hedge Fund
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl">
              Forniamo analisi finanziarie avanzate e modelli quantitativi proprietari progettati specificamente per le esigenze degli investitori istituzionali.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/ricerche" className="px-8 py-3.5 gold-gradient hover:brightness-105 font-medium rounded-md text-primary transition-all text-center inline-flex items-center justify-center">
                Scopri le nostre ricerche
              </Link>
              <Link href="/contatti" className="px-8 py-3.5 bg-transparent border border-secondary hover:bg-secondary/10 font-medium rounded-md text-secondary transition-all text-center inline-flex items-center justify-center">
                Richiedi una demo
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary to-transparent"></div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary/70 font-medium">TRUSTED BY LEADING INSTITUTIONS</p>
          </div>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-10 md:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-8 w-28 bg-primary/30 rounded"></div>
            </div>
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-8 w-32 bg-primary/30 rounded"></div>
            </div>
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-8 w-24 bg-primary/30 rounded"></div>
            </div>
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-8 w-36 bg-primary/30 rounded"></div>
            </div>
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-8 w-30 bg-primary/30 rounded"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Le Nostre Ricerche in Evidenza</h2>
              <p className="text-primary/70 max-w-3xl mx-auto">
                Analisi quantitative avanzate ed insight di mercato per supportare le decisioni d'investimento istituzionali.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80" 
                alt="Mathematical financial models" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Macro Analysis</h3>
                <p className="text-primary/70 mb-6">
                  Valutazioni tempestive sui principali trend macroeconomici e il loro impatto sui mercati globali.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">20+ Reports</span>
                  <Link href="/ricerche#macro" className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                    Scopri di più <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80" 
                alt="Volatility visualization" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Volatilità</h3>
                <p className="text-primary/70 mb-6">
                  Modelli proprietari di previsione della volatilità e strategie di trading relative.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">15+ Reports</span>
                  <Link href="/ricerche#volatility" className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                    Scopri di più <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80" 
                alt="Credit market data visualization" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Credit Research</h3>
                <p className="text-primary/70 mb-6">
                  Analisi approfondite sui mercati del credito con focus su pricing relativo e anomalie.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">18+ Reports</span>
                  <Link href="/ricerche#credit" className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                    Scopri di più <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/ricerche" 
              className="inline-flex items-center px-6 py-3 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors"
            >
              Visualizza tutte le ricerche <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto a portare le tue strategie d'investimento al livello successivo?
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              Scopri come le nostre ricerche quantitative avanzate possono supportare le tue decisioni d'investimento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contatti" className="px-8 py-3.5 gold-gradient hover:brightness-105 font-medium rounded-md text-primary transition-all text-center inline-flex items-center justify-center">
                Richiedi una consulenza
              </Link>
              <Link href="/ricerche" className="px-8 py-3.5 bg-transparent border border-secondary hover:bg-secondary/10 font-medium rounded-md text-secondary transition-all text-center inline-flex items-center justify-center">
                Esplora le nostre ricerche
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
