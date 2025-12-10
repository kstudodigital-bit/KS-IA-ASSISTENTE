import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, X } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'model',
      text: 'Olá! Sou o KS Digital Helper. Como posso ajudar com sua estratégia de marketing hoje?',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      image: selectedImage || undefined,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setSelectedImage(null);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, inputText, selectedImage || undefined);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    // Simple Web Speech API Implementation for demo
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + " " + transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-ks-accent text-white rounded-br-none'
                  : 'bg-ks-secondary text-ks-text border border-slate-700 rounded-bl-none'
              }`}
            >
              {msg.image && (
                <img src={msg.image} alt="User upload" className="w-full h-auto rounded-lg mb-2 border border-white/20" />
              )}
              <div className="markdown-body text-sm leading-relaxed">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              <span className="text-[10px] opacity-50 block text-right mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-ks-secondary p-4 rounded-2xl rounded-bl-none border border-slate-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-ks-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-ks-muted rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-ks-muted rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-ks-primary border-t border-slate-800">
        {selectedImage && (
          <div className="relative inline-block mb-2">
            <img src={selectedImage} alt="Selected" className="h-16 w-16 object-cover rounded-lg border border-ks-accent" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white shadow-sm"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-ks-muted hover:text-ks-accent bg-ks-secondary rounded-full"
          >
            <ImageIcon size={20} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            accept="image/*" 
            className="hidden" 
          />
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua dúvida..."
            className="flex-1 bg-ks-secondary text-ks-text border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-ks-accent outline-none placeholder-slate-500"
          />

          <button 
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-ks-muted hover:text-ks-accent bg-ks-secondary'
            }`}
          >
            <Mic size={20} />
          </button>

          <button 
            onClick={handleSendMessage}
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`p-3 rounded-full ${
              (!inputText.trim() && !selectedImage) || isLoading 
                ? 'bg-slate-700 text-slate-500' 
                : 'bg-ks-accent text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;