import { Link } from "wouter";
import { 
  FaLinkedin, 
  FaTwitter 
} from "react-icons/fa";
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  
  // Helper function to handle dynamic year in translation string
  const formatCopyright = (str: string) => {
    return str.replace('${year}', year.toString());
  };
  
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.companyName')}</h3>
            <p className="text-neutral-300 text-sm mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-200 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-200 hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quantitative-model" className="text-neutral-300 hover:text-secondary transition-colors">{t('navbar.quantitativeModel')}</Link></li>
              <li><Link href="/markets-insight" className="text-neutral-300 hover:text-secondary transition-colors">{t('navbar.marketsInsight')}</Link></li>
              <li><Link href="/research" className="text-neutral-300 hover:text-secondary transition-colors">{t('navbar.research')}</Link></li>
              <li><Link href="/macro-report" className="text-neutral-300 hover:text-secondary transition-colors">{t('navbar.macroReport')}</Link></li>
              <li><Link href="/quantitative-strategies" className="text-neutral-300 hover:text-secondary transition-colors">{t('navbar.strategies')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link href="/leadership" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.leadership')}</Link></li>
              <li><Link href="/careers" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.careers')}</Link></li>
              <li><Link href="/media" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.media')}</Link></li>
              <li><Link href="/contact" className="text-neutral-300 hover:text-secondary transition-colors">{t('contact')}</Link></li>
              <li><Link href="/newsletter" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.newsletter')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/terms" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link href="/risk-warnings" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.risk')}</Link></li>
              <li><Link href="/cookie-policy" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.cookie')}</Link></li>
              <li><Link href="/security" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.security')}</Link></li>
              <li><Link href="/accessibility" className="text-neutral-300 hover:text-secondary transition-colors">{t('footer.accessibility')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 text-xs text-neutral-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{formatCopyright(t('footer.copyright'))}</p>
            <p className="mt-4 md:mt-0">{t('footer.registration')}</p>
          </div>
          <div className="mt-6">
            <p>{t('footer.disclaimer')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
