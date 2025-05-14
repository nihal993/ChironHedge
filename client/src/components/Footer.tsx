import { Link } from "wouter";
import { 
  FaLinkedin, 
  FaTwitter 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-bold mb-4">Banane&Carote</h3>
            <p className="text-neutral-300 text-sm mb-6">
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
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news-ai" className="text-neutral-300 hover:text-secondary transition-colors">News AI</Link></li>
              <li><Link href="/quantitative-model" className="text-neutral-300 hover:text-secondary transition-colors">Quantitative Model</Link></li>
              <li><Link href="/markets-insight" className="text-neutral-300 hover:text-secondary transition-colors">Markets Insight</Link></li>
              <li><Link href="/our-research" className="text-neutral-300 hover:text-secondary transition-colors">Our Research</Link></li>
              <li><Link href="/macro-report" className="text-neutral-300 hover:text-secondary transition-colors">Macro Report</Link></li>
              <li><Link href="/quantitative-strategies" className="text-neutral-300 hover:text-secondary transition-colors">Quantitative Strategies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-300 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="text-neutral-300 hover:text-secondary transition-colors">Leadership</Link></li>
              <li><Link href="/careers" className="text-neutral-300 hover:text-secondary transition-colors">Careers</Link></li>
              <li><Link href="/media" className="text-neutral-300 hover:text-secondary transition-colors">Media</Link></li>
              <li><Link href="/contact" className="text-neutral-300 hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link href="/newsletter" className="text-neutral-300 hover:text-secondary transition-colors">Newsletter</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-neutral-300 hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-300 hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link href="/risk-warnings" className="text-neutral-300 hover:text-secondary transition-colors">Risk Warnings</Link></li>
              <li><Link href="/cookie-policy" className="text-neutral-300 hover:text-secondary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-neutral-300 hover:text-secondary transition-colors">Security</Link></li>
              <li><Link href="/accessibility" className="text-neutral-300 hover:text-secondary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 text-xs text-neutral-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} ChironResearch Global Services Ltd. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Company Reg: 01234567890 | Authorized and regulated by Financial Conduct Authority</p>
          </div>
          <div className="mt-6">
            <p>
              Disclaimer: The information provided is for informational purposes only and does not constitute investment advice or financial recommendations. Past performance is not indicative of future results. Investments involve risk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
