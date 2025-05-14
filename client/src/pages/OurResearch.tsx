import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { researchCategories } from "@/lib/data";

// Sample research papers data
const researchPapers = [
  {
    id: "paper-1",
    title: "Factor Timing: A Quantitative Framework for Regime Identification",
    abstract: "This study presents a novel quantitative framework for identifying market regimes and optimizing factor exposures based on macroeconomic and market signals.",
    authors: "Dr. Maria Rossi, Dr. James Chen",
    date: "April 2025",
    category: "Equity Factors",
    featured: true
  },
  {
    id: "paper-2",
    title: "Entropy-Based Portfolio Construction: Beyond Markowitz",
    abstract: "We propose an entropy-based portfolio optimization methodology that demonstrates superior risk-adjusted returns compared to traditional mean-variance approaches across different market environments.",
    authors: "Dr. Alessandro Bianchi, Sarah Johnson, PhD",
    date: "March 2025",
    category: "Portfolio Construction",
    featured: true
  },
  {
    id: "paper-3",
    title: "Yield Curve Dynamics and Recession Prediction: A Machine Learning Approach",
    abstract: "Employing advanced machine learning techniques to analyze yield curve dynamics and improve recession prediction accuracy beyond traditional indicators.",
    authors: "Michael Zhang, PhD, Emma Roberts",
    date: "February 2025",
    category: "Fixed Income",
    featured: true
  },
  {
    id: "paper-4",
    title: "ESG Factor Integration: Impact on Risk-Adjusted Returns",
    abstract: "A comprehensive analysis of how ESG factor integration affects portfolio risk-adjusted returns across different regions and sectors.",
    authors: "Dr. Sophie Williams, Thomas Nelson",
    date: "January 2025",
    category: "ESG Research",
    featured: false
  },
  {
    id: "paper-5",
    title: "Alternative Data Alpha: Satellite Imagery for Agricultural Commodities",
    abstract: "Exploring how satellite imagery analysis can provide alpha-generating signals for agricultural commodity trading strategies.",
    authors: "Dr. Robert Garcia, Anna Kim, PhD",
    date: "December 2024",
    category: "Alternative Data",
    featured: false
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Dr. Alessandro Rossi",
    title: "Chief Research Officer",
    bio: "PhD in Economics with specialization in quantitative research and computational finance. Leader in developing innovative financial models.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 2,
    name: "Dr. Maria Chen",
    title: "Head of Quantitative Strategies",
    bio: "Specializes in machine learning applications in finance and quantitative analysis. Expert in developing predictive algorithms for financial markets.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    title: "Head of Macro Research",
    bio: "Esperto di analisi macroeconomica e ricerca sui mercati globali. Specializzato in politiche monetarie e impatto sui mercati finanziari.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 4,
    name: "Dr. Sofia Martinez",
    title: "Head of Fixed Income Research",
    bio: "Leading expert in credit analysis and sovereign debt with a PhD from Stanford University.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  }
];

const OurResearch = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Research</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Cutting-edge financial research combining rigorous academic methodologies with practical applications for institutional investors.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8">Featured Research Papers</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchPapers.filter(paper => paper.featured).map((paper, index) => (
              <div 
                key={paper.id}
                className="bg-neutral p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block text-xs font-medium bg-white px-3 py-1 rounded-full">
                    {paper.category}
                  </span>
                  <span className="text-xs text-primary/50">{paper.date}</span>
                </div>
                <h4 className="font-bold mb-3">{paper.title}</h4>
                <p className="text-primary/70 text-sm mb-4">
                  {paper.abstract.length > 120 
                    ? `${paper.abstract.substring(0, 120)}...` 
                    : paper.abstract}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-primary/60 mb-2">Authors: {paper.authors}</p>
                  <Link href={`/our-research/${paper.id}`} className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    Read Full Paper <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8">Research Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchCategories.map((category, index) => (
              <div 
                key={category.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-neutral hover:border-secondary transition-colors"
              >
                <img 
                  src={category.imageSrc} 
                  alt={category.imageAlt} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-3">{category.title}</h4>
                  <p className="text-primary/70 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-neutral inline-block px-3 py-1 rounded-full">{category.reportsCount}+ Reports</span>
                    <Link href={`/our-research/${category.id}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                      View Collection <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="papers" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Research Library</h3>
              <TabsList>
                <TabsTrigger value="papers">Papers</TabsTrigger>
                <TabsTrigger value="whitepapers">White Papers</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="papers">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-sm">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Authors</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {researchPapers.map((paper) => (
                        <tr key={paper.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <p className="font-medium">{paper.title}</p>
                          </td>
                          <td className="py-3 px-4 text-sm text-primary/70">{paper.authors}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className="inline-block text-xs font-medium bg-white px-2 py-1 rounded-full border border-gray-200">
                              {paper.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-primary/70">{paper.date}</td>
                          <td className="py-3 px-4">
                            <Link href={`/our-research/${paper.id}`} className="text-secondary hover:text-secondary/80 text-sm font-medium">
                              Read
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/research-library" className="inline-flex items-center px-5 py-2.5 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
                    View Full Research Library
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="whitepapers">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex items-start mb-4">
                      <div className="bg-neutral p-2 rounded mr-3">
                        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">Volatility Risk Premia: Harvesting Returns in Uncertain Markets</h4>
                        <p className="text-sm text-primary/60 mt-1">42 pages • April 2025</p>
                      </div>
                    </div>
                    <p className="text-primary/70 text-sm mb-4">
                      A comprehensive analysis of volatility risk premia across asset classes, with practical implementation strategies for institutional investors.
                    </p>
                    <Link href="/whitepapers/volatility-risk-premia" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Download White Paper
                    </Link>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex items-start mb-4">
                      <div className="bg-neutral p-2 rounded mr-3">
                        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">AI in Investment Management: Beyond the Hype</h4>
                        <p className="text-sm text-primary/60 mt-1">38 pages • March 2025</p>
                      </div>
                    </div>
                    <p className="text-primary/70 text-sm mb-4">
                      Examining the practical applications of artificial intelligence in investment processes, with case studies and implementation guidelines.
                    </p>
                    <Link href="/whitepapers/ai-investment-management" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Download White Paper
                    </Link>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/whitepapers" className="inline-flex items-center px-5 py-2.5 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
                    View All White Papers
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="articles">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">The Evolution of Systematic Fixed Income Strategies</h4>
                      <span className="text-xs text-primary/50">May 8, 2025</span>
                    </div>
                    <p className="text-primary/70 text-sm mb-3">
                      Exploring how systematic approaches are transforming fixed income investing, with implications for portfolio construction and risk management.
                    </p>
                    <Link href="/articles/systematic-fixed-income" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Read Article
                    </Link>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">ESG Integration: From Theory to Practice</h4>
                      <span className="text-xs text-primary/50">May 2, 2025</span>
                    </div>
                    <p className="text-primary/70 text-sm mb-3">
                      A practical guide to integrating environmental, social, and governance factors into the investment process for institutional investors.
                    </p>
                    <Link href="/articles/esg-integration" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Read Article
                    </Link>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">Private Markets: Alternative Data Applications</h4>
                      <span className="text-xs text-primary/50">April 24, 2025</span>
                    </div>
                    <p className="text-primary/70 text-sm mb-3">
                      How alternative data sources can provide unique insights for private equity, real estate, and infrastructure investments.
                    </p>
                    <Link href="/articles/private-markets-alt-data" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Read Article
                    </Link>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/articles" className="inline-flex items-center px-5 py-2.5 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
                    View All Articles
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8">Research Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-neutral">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-6">
                  <h4 className="font-bold mb-1">{member.name}</h4>
                  <p className="text-secondary text-sm mb-3">{member.title}</p>
                  <p className="text-primary/70 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/research-team" className="inline-flex items-center px-6 py-3 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
              Meet Our Full Research Team
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-primary p-8 rounded-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-4">Research Subscription</h3>
              <p className="mb-6 text-neutral-300">
                Subscribe to our premium research service for full access to our complete library of papers, analyses, and quantitative models.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Full research library access</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Quantitative model implementations</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Analyst Q&A sessions</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Custom research requests</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <Link href="/subscription" className="block w-full py-3 px-6 gold-gradient text-primary font-medium rounded-md text-center hover:brightness-105 transition-all mb-3">
                Subscribe to Premium Research
              </Link>
              <Link href="/contact" className="block w-full py-3 px-6 bg-transparent border border-secondary text-secondary font-medium rounded-md text-center hover:bg-secondary/10 transition-colors">
                Request Research Sample
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurResearch;