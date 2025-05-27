import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUserSchema } from "@shared/schema";
import { passport } from "./passport";

// Mock financial news data for API
const mockFinancialNews = [
  {
    id: "news-1",
    title: "Federal Reserve Announces Shift in Interest Rate Policy",
    summary: "In a significant policy adjustment, the Federal Reserve has indicated a potential pivot in its approach to interest rates, suggesting a more accommodative stance may be forthcoming as inflation metrics show signs of moderation.",
    date: "15:42",
    source: "Bloomberg Financial",
    category: "Monetary Policy"
  },
  {
    id: "news-2",
    title: "Global Supply Chain Resilience Index Shows Marked Improvement",
    summary: "The latest Global Supply Chain Resilience Index reveals substantial improvements in supply chain stability across major economies, with key manufacturing hubs demonstrating enhanced adaptability to market disruptions.",
    date: "14:35",
    source: "Financial Times",
    category: "Global Trade"
  },
  {
    id: "news-3",
    title: "Emerging Markets Bond Yields Display Unusual Pattern Shift",
    summary: "Emerging market bond yields have exhibited an atypical pattern shift in recent trading sessions, pointing to a potential recalibration of risk assessment by institutional investors amid changing macroeconomic conditions.",
    date: "13:22",
    source: "Reuters",
    category: "Fixed Income"
  },
  {
    id: "news-4",
    title: "Tech Sector Valuations Face Scrutiny Amid AI Integration Challenges",
    summary: "Technology company valuations are under renewed scrutiny as investors reassess the timeline and implementation challenges associated with artificial intelligence integration into existing product ecosystems.",
    date: "12:08",
    source: "Wall Street Journal",
    category: "Technology"
  },
  {
    id: "news-5",
    title: "Commodities Markets Respond to Geopolitical Tensions in Key Regions",
    summary: "Global commodities markets are experiencing increased volatility as geopolitical tensions in resource-rich regions prompt concerns about potential supply disruptions and strategic reserve management.",
    date: "11:45",
    source: "Commodity Insights",
    category: "Commodities"
  },
  {
    id: "news-6",
    title: "ESG Investment Flows Accelerate Following Regulatory Framework Updates",
    summary: "Environmental, Social, and Governance (ESG) investment vehicles are experiencing accelerated inflows after recent regulatory framework updates in major markets provided greater standardization and transparency requirements.",
    date: "10:30",
    source: "Sustainable Finance Review",
    category: "ESG Investing"
  }
];

// JWT secret - in production, this should be a strong secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export async function registerRoutes(app: Express): Promise<Server> {
  // OAuth Routes
  
  // Google OAuth
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
    async (req, res) => {
      try {
        const user = req.user as any;
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        
        // Redirect to frontend with token
        res.redirect(`/login?token=${token}&success=true`);
      } catch (error) {
        res.redirect('/login?error=auth_failed');
      }
    }
  );

  // Microsoft OAuth
  app.get('/auth/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }));
  
  app.get('/auth/microsoft/callback',
    passport.authenticate('microsoft', { failureRedirect: '/login?error=microsoft_auth_failed' }),
    async (req, res) => {
      try {
        const user = req.user as any;
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        
        // Redirect to frontend with token
        res.redirect(`/login?token=${token}&success=true`);
      } catch (error) {
        res.redirect('/login?error=auth_failed');
      }
    }
  );

  // Apple OAuth
  app.get('/auth/apple', passport.authenticate('apple', { scope: ['email'] }));
  
  app.get('/auth/apple/callback',
    passport.authenticate('apple', { failureRedirect: '/login?error=apple_auth_failed' }),
    async (req, res) => {
      try {
        const user = req.user as any;
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        
        // Redirect to frontend with token
        res.redirect(`/login?token=${token}&success=true`);
      } catch (error) {
        res.redirect('/login?error=auth_failed');
      }
    }
  );

  // API routes
  
  // User registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      // Define registration schema with email validation
      const registerSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
      });

      const validatedData = registerSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "An account with this email already exists" 
        });
      }

      // Hash the password
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(validatedData.password, saltRounds);

      // Create the user
      const newUser = await storage.createUser({
        email: validatedData.email,
        password_hash,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          created_at: newUser.created_at,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors,
        });
      }

      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred during registration",
      });
    }
  });

  // User login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      // Define login schema
      const loginSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(1, "Password is required"),
      });

      const validatedData = loginSchema.parse(req.body);

      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors,
        });
      }

      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred during login",
      });
    }
  });
  
  // News AI API route
  app.get("/api/news-ai", (req, res) => {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll use mock data
    res.status(200).json(mockFinancialNews);
  });
  
  // Contact form API route
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
