import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  nome: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri" }),
  cognome: z.string().min(2, { message: "Il cognome deve avere almeno 2 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  organizzazione: z.string().min(2, { message: "Inserisci la tua organizzazione" }),
  interesse: z.string().min(1, { message: "Seleziona un'area di interesse" }),
  messaggio: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, {
    message: "Devi accettare l'informativa sulla privacy",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      organizzazione: "",
      interesse: "",
      messaggio: "",
      privacy: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", values);
      toast({
        title: "Richiesta inviata",
        description: "Grazie per averci contattato. Ti risponderemo al più presto.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore nell'invio della richiesta. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contatti" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contattaci</h2>
            <p className="text-primary/70 mb-12 max-w-lg">
              Siamo a disposizione per discutere le tue esigenze di ricerca finanziaria avanzata e come possiamo supportare le tue decisioni d'investimento.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-3 mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Sede principale</h3>
                  <p className="text-primary/70">Via della Spiga 20, 20121 Milano, Italia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-3 mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-primary/70">info@quantumfinance.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-3 mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Telefono</h3>
                  <p className="text-primary/70">+39 02 1234 5678</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" 
                alt="Modern financial district in Milan" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-neutral rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold mb-6">Richiedi Informazioni</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome *</FormLabel>
                        <FormControl>
                          <Input placeholder="Il tuo nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cognome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cognome *</FormLabel>
                        <FormControl>
                          <Input placeholder="Il tuo cognome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="La tua email aziendale" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organizzazione"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Organizzazione *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome della tua organizzazione" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interesse"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Area di interesse *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona un'area di interesse" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="macro">Analisi Macro</SelectItem>
                          <SelectItem value="volatilita">Strategie di Volatilità</SelectItem>
                          <SelectItem value="credit">Credit Research</SelectItem>
                          <SelectItem value="equity">Equity Factors</SelectItem>
                          <SelectItem value="fixed-income">Fixed Income</SelectItem>
                          <SelectItem value="alternative-data">Alternative Data</SelectItem>
                          <SelectItem value="custom">Soluzioni Customizzate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="messaggio"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Messaggio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Dettagli sulla tua richiesta..." 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <div className="flex items-start space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-primary/70 font-normal">
                          Acconsento al trattamento dei dati personali come indicato nell'informativa sulla privacy. *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gold-gradient hover:brightness-105 text-primary"
                >
                  {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
