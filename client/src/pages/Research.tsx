import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { researchCategories } from "@/lib/data";

const Research = () => {
  return (
    <section id="ricerche" className="py-20 md:py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Le Nostre Ricerche</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Analisi quantitative avanzate ed insight di mercato per supportare le decisioni d'investimento istituzionali.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {researchCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              id={category.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">{category.reportsCount}+ Reports</span>
                  <Link href={`/ricerche/${category.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                    Scopri di più <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-primary p-8 md:p-12 rounded-xl text-white mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ricerche Personalizzate</h3>
              <p className="mb-6 text-neutral-300">
                Oltre alle nostre ricerche regolari, offriamo progetti di ricerca su misura per esigenze specifiche.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-neutral-200">Analisi dettagliata di settori o asset specifici</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-neutral-200">Sviluppo di modelli proprietari esclusivi</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-neutral-200">Backtesting di strategie proprietarie</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-neutral-200">Consulenza per l'implementazione</span>
                </li>
              </ul>
              <Link href="/contatti" className="inline-flex items-center px-6 py-3 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
                Richiedi informazioni
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Ricerca personalizzata" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-md mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6">Domande Frequenti</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">Quali informazioni contengono i vostri report?</h4>
                <p className="text-primary/70">I nostri report includono analisi dettagliate, grafici interattivi, codice Python per replicare i risultati e raccomandazioni pratiche per l'implementazione.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Con quale frequenza pubblicate nuove ricerche?</h4>
                <p className="text-primary/70">Pubblichiamo analisi settimanali per i mercati principali e report mensili più approfonditi per ogni area di ricerca.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Come posso accedere alle vostre ricerche?</h4>
                <p className="text-primary/70">Le nostre ricerche sono disponibili tramite abbonamento. Contattaci per maggiori informazioni sui nostri piani.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">Le ricerche sono adatte a investitori retail?</h4>
                <p className="text-primary/70">Le nostre ricerche sono progettate principalmente per investitori istituzionali e professionisti del settore, ma offriamo anche soluzioni semplificate per family office e HNWI.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Offrite supporto per l'implementazione?</h4>
                <p className="text-primary/70">Sì, forniamo supporto completo per l'implementazione delle strategie, inclusi codice, configurazioni e consulenza.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Come posso richiedere una demo?</h4>
                <p className="text-primary/70">Puoi richiedere una demo gratuita compilando il modulo nella pagina <Link href="/contatti" className="text-secondary hover:underline">Contatti</Link> o contattandoci direttamente.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

export default Research;
