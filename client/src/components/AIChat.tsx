import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  model?: string;
}

interface ChatResponse {
  message: string;
  usage?: any;
  model?: string;
}

type AIProvider = 'openai' | 'claude';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Ciao! Sono il tuo assistente AI specializzato in finanza e ricerca. Come posso aiutarti oggi?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [apiStatus, setApiStatus] = useState<'unknown' | 'available' | 'quota_exceeded' | 'error'>('unknown');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const callAI = async (message: string): Promise<string> => {
    const conversationHistory = messages
      .filter(msg => msg.sender !== 'ai' || msg.id !== 1) // Escludi il messaggio di benvenuto
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

    try {
      const response = await fetch(`/api/ai/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.message;
    } catch (error) {
      console.error('AI API Error:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await callAI(userMessage.text);

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        model: provider
      };

      setMessages(prev => [...prev, aiMessage]);
      setApiStatus('available');
    } catch (error) {
      let errorText = 'Si è verificato un errore. Riprova più tardi.';
      
      if (error instanceof Error) {
        if (error.message.includes('quota') || error.message.includes('Quota')) {
          errorText = 'Al momento il servizio AI ha raggiunto il limite di utilizzo. Per favore riprova più tardi o contatta il supporto per informazioni sui piani disponibili.';
          setApiStatus('quota_exceeded');
        } else if (error.message.includes('API key') || error.message.includes('401')) {
          errorText = 'Problema di configurazione del servizio AI. Contatta il supporto tecnico.';
          setApiStatus('error');
        } else {
          errorText = error.message;
          setApiStatus('error');
        }
      }
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Chat pulita. Come posso aiutarti?",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw]">
      <div className="bg-white rounded-lg shadow-2xl border overflow-hidden max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Assistente AI</h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as AIProvider)}
                className="text-xs bg-white/20 border border-white/30 rounded px-2 py-1 text-white"
                disabled={isLoading}
              >
                <option value="openai">GPT</option>
                <option value="claude">Claude</option>
              </select>
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white text-xs px-2 py-1 rounded"
                disabled={isLoading}
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[300px] max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-600 text-white'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Bot className="w-3 h-3" />
                )}
              </div>

              <div className={`max-w-[80%] ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                <div className={`px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                }`}>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-2">
                  <p className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </p>
                  {message.model && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-1 rounded">
                      {message.model}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <Bot className="w-3 h-3" />
              </div>
              <div className="bg-white rounded-lg rounded-bl-sm px-3 py-2 shadow-sm border">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                  <span className="text-xs text-gray-500">Sto pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrivi il tuo messaggio..."
              className="flex-1 resize-none border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-20"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Invio per inviare • Shift+Invio per nuova riga
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;