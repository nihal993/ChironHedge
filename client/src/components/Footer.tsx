import { Link } from "wouter";
import { 
  FaLinkedin, 
  FaTwitter 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4">QuantumFinance</h3>
            <p className="text-neutral-300 mb-6">
              Soluzioni di ricerca quantitativa avanzata per investitori istituzionali.
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
            <h4 className="font-bold mb-4">Ricerche</h4>
            <ul className="space-y-2">
              <li><Link href="/ricerche#macro" className="text-neutral-300 hover:text-white transition-colors">Macro Analysis</Link></li>
              <li><Link href="/ricerche#volatility" className="text-neutral-300 hover:text-white transition-colors">Volatilità</Link></li>
              <li><Link href="/ricerche#credit" className="text-neutral-300 hover:text-white transition-colors">Credit Research</Link></li>
              <li><Link href="/ricerche#equity" className="text-neutral-300 hover:text-white transition-colors">Equity Factors</Link></li>
              <li><Link href="/ricerche#fixed-income" className="text-neutral-300 hover:text-white transition-colors">Fixed Income</Link></li>
              <li><Link href="/ricerche#alternative-data" className="text-neutral-300 hover:text-white transition-colors">Alternative Data</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Azienda</h4>
            <ul className="space-y-2">
              <li><Link href="/chi-siamo" className="text-neutral-300 hover:text-white transition-colors">Chi Siamo</Link></li>
              <li><Link href="/chi-siamo#leadership" className="text-neutral-300 hover:text-white transition-colors">Leadership</Link></li>
              <li><Link href="/chi-siamo#carriere" className="text-neutral-300 hover:text-white transition-colors">Carriere</Link></li>
              <li><Link href="/media" className="text-neutral-300 hover:text-white transition-colors">Media</Link></li>
              <li><Link href="/contatti" className="text-neutral-300 hover:text-white transition-colors">Contatti</Link></li>
              <li><Link href="/newsletter" className="text-neutral-300 hover:text-white transition-colors">Newsletter</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legale</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini" className="text-neutral-300 hover:text-white transition-colors">Termini di Servizio</Link></li>
              <li><Link href="/avvertenze" className="text-neutral-300 hover:text-white transition-colors">Avvertenze sui Rischi</Link></li>
              <li><Link href="/cookie" className="text-neutral-300 hover:text-white transition-colors">Informativa sui Cookie</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-sm text-neutral-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} QuantumFinance S.p.A. Tutti i diritti riservati.</p>
            <p className="mt-4 md:mt-0">P.IVA 01234567890 | Capitale Sociale: € 1.000.000 i.v.</p>
          </div>
          <div className="mt-6">
            <p>
              Disclaimer: I contenuti forniti hanno scopo informativo e non costituiscono raccomandazioni di investimento o consulenza finanziaria. I risultati passati non sono indicativi di risultati futuri. Gli investimenti comportano rischi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
