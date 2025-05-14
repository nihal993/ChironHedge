import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();
  return (
    <section id="chi-siamo" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('aboutpage.title')}</h2>
            <p className="text-primary/70 text-lg mb-6">
              {t('aboutpage.description')}
            </p>
            <p className="text-primary/70 mb-8">
              {t('aboutpage.approach')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral p-5 rounded-lg">
                <p className="text-secondary text-3xl font-bold mb-2">15+</p>
                <p className="text-primary/70">{t('aboutpage.stats.years')}</p>
              </div>
              <div className="bg-neutral p-5 rounded-lg">
                <p className="text-secondary text-3xl font-bold mb-2">30+</p>
                <p className="text-primary/70">{t('aboutpage.stats.publications')}</p>
              </div>
              <div className="bg-neutral p-5 rounded-lg">
                <p className="text-secondary text-3xl font-bold mb-2">$50B+</p>
                <p className="text-primary/70">{t('aboutpage.stats.assets')}</p>
              </div>
              <div className="bg-neutral p-5 rounded-lg">
                <p className="text-secondary text-3xl font-bold mb-2">98%</p>
                <p className="text-primary/70">{t('aboutpage.stats.retention')}</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Team di professionisti finanziari" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute bottom-6 right-6 gold-gradient p-4 rounded-lg shadow-lg">
              <p className="font-bold text-primary">Approccio Data-Driven</p>
              <p className="text-sm text-primary/80">Combinazione unica di teoria e pratica</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('aboutpage.mission.title')}</h2>
            <p className="text-primary/70 max-w-3xl mx-auto">
              {t('aboutpage.mission.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral p-6 rounded-xl shadow-sm">
              <div className="bg-secondary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutpage.values.research')}</h3>
              <p className="text-primary/70">
                {t('aboutpage.values.research.desc')}
              </p>
            </div>

            <div className="bg-neutral p-6 rounded-xl shadow-sm">
              <div className="bg-secondary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutpage.values.innovation')}</h3>
              <p className="text-primary/70">
                {t('aboutpage.values.innovation.desc')}
              </p>
            </div>

            <div className="bg-neutral p-6 rounded-xl shadow-sm">
              <div className="bg-secondary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('aboutpage.values.collaboration')}</h3>
              <p className="text-primary/70">
                {t('aboutpage.values.collaboration.desc')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-24 bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('aboutpage.approach.title')}</h2>
              <p className="text-primary/70 mb-8">
                {t('aboutpage.approach.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">{t('aboutpage.approach.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">{t('aboutpage.approach.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">{t('aboutpage.approach.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">{t('aboutpage.approach.feature4')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-primary/70">{t('aboutpage.approach.feature5')}</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Mathematical financial model visualization" 
                className="w-full h-auto rounded-xl shadow-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
