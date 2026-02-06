
import React, { useState, useRef, useEffect } from 'react';
import { HealthState, ChatMessage } from '../types';
import { Send, User, Sparkles, AlertTriangle } from 'lucide-react';
import { getCoachResponse } from '../services/geminiService';

interface ChatProps {
  state: HealthState;
  addMessage: (msg: ChatMessage) => void;
}

const HealthChat: React.FC<ChatProps> = ({ state, addMessage }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    addMessage(userMsg);
    setInput('');
    setIsTyping(true);

    try {
      const coachText = await getCoachResponse(
        input, 
        state.profile, 
        state.dailyLogs, 
        state.messages
      );
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: coachText,
        timestamp: new Date()
      };
      addMessage(modelMsg);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-teal-600 dark:bg-teal-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">Coach AyushAI</h3>
            <p className="text-[10px] text-teal-100">AI Health Companion</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/30">
          <AlertTriangle className="w-3 h-3 text-yellow-300" />
          <span className="text-[10px] font-bold text-yellow-100">NON-CLINICAL</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900/50"
      >
        {state.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}>
                {msg.role === 'user' ? <User className="text-white w-4 h-4" /> : <Sparkles className="text-teal-600 dark:text-teal-400 w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
                <span className={`block mt-2 text-[10px] opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
        <div className="flex gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <textarea 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-2 px-3 text-slate-800 dark:text-slate-200 max-h-32"
            placeholder="Ask anything about health, diet, or symptoms..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="self-end p-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthChat;
