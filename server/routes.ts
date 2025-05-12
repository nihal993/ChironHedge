import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        nome: z.string().min(2),
        cognome: z.string().min(2),
        email: z.string().email(),
        organizzazione: z.string().min(2),
        interesse: z.string().min(1),
        messaggio: z.string().optional(),
        privacy: z.boolean().refine(val => val === true)
      });

      const validatedData = contactSchema.parse(req.body);
      // In a real application, you would save this data to a database
      // or send an email notification
      
      // For now, we'll just log it
      console.log("Contact form submission:", validatedData);
      
      res.status(200).json({ success: true, message: "Messaggio ricevuto. Ti contatteremo presto." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Dati del modulo non validi", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Si è verificato un errore durante l'elaborazione della richiesta." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
