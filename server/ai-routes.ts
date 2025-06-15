// server/ai-routes.ts
import { Request, Response } from 'express';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface AnthropicResponse {
  content: Array<{
    text: string;
  }>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

// Rate limiting semplice
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // 20 richieste per ora
const WINDOW_MS = 60 * 60 * 1000; // 1 ora

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  const userLimit = rateLimitMap.get(ip)!;

  if (now > userLimit.resetTime) {
    userLimit.count = 1;
    userLimit.resetTime = now + WINDOW_MS;
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
};

// OpenAI Chat Handler
export const handleOpenAIChat = async (req: Request, res: Response) => {
  try {
    const clientIP = req.ip || req.socket.remoteAddress || 'unknown';

    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Prepara i messaggi per OpenAI
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'Sei un assistente AI professionale che risponde in italiano. Sei esperto in finanza, tecnologia e ricerca. Fornisci risposte precise, utili e ben strutturate.'
      },
      ...conversationHistory.slice(-10), // Mantieni solo gli ultimi 10 messaggi per il contesto
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();

    const aiMessage = data.choices[0]?.message?.content;
    if (!aiMessage) {
      throw new Error('No response from OpenAI');
    }

    res.json({
      message: aiMessage,
      usage: data.usage,
      model: 'gpt-3.5-turbo'
    });

  } catch (error) {
    console.error('OpenAI Chat Error:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
};

// Claude (Anthropic) Chat Handler
export const handleClaudeChat = async (req: Request, res: Response) => {
  try {
    const clientIP = req.ip || req.socket.remoteAddress || 'unknown';

    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }

    // Prepara i messaggi per Claude
    const messages: ChatMessage[] = [
      ...conversationHistory.slice(-8),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Più economico di sonnet
        max_tokens: 1500,
        messages: messages,
        system: 'Sei un assistente AI professionale che risponde in italiano. Sei esperto in finanza, tecnologia e ricerca. Fornisci risposte precise, utili e ben strutturate.'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data: AnthropicResponse = await response.json();

    const aiMessage = data.content[0]?.text;
    if (!aiMessage) {
      throw new Error('No response from Claude');
    }

    res.json({
      message: aiMessage,
      usage: data.usage,
      model: 'claude-3-haiku'
    });

  } catch (error) {
    console.error('Claude Chat Error:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
};

// Health check per l'AI
export const handleAIHealth = (req: Request, res: Response) => {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasClaude = !!process.env.ANTHROPIC_API_KEY;

  res.json({
    status: 'OK',
    services: {
      openai: hasOpenAI ? 'configured' : 'not configured',
      claude: hasClaude ? 'configured' : 'not configured'
    },
    timestamp: new Date().toISOString()
  });
};