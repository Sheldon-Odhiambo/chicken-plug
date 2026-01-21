
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ChefHat, Info } from 'lucide-react';
import { getSpiceRecommendation } from '../services/gemini';

const SpiceAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (response && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const result = await getSpiceRecommendation(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full min-h-[550px] font-inter">
      <div className="p-10 border-b-2 border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-orange-600 p-2.5 rounded-xl">
            <ChefHat className="text-white w-6 h-6 animate-sway" />
          </div>
          <h3 className="text-3xl font-bangers tracking-wider uppercase text-gray-900">Alchemy Chef</h3>
        </div>
        <p className="text-gray-500 font-playfair italic text-lg leading-relaxed">
          Ask about our botanical heritage or flavor rituals.
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto no-scrollbar max-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6 py-10">
            <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin" />
            <p className="text-orange-600 font-bangers text-xl tracking-widest animate-pulse uppercase">CONSULTING...</p>
          </div>
        ) : response ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-4 mb-6">
               <div className="bg-emerald-100 p-2 rounded-lg">
                 <Info className="w-4 h-4 text-emerald-600 animate-float" />
               </div>
               <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">CHEF'S WISDOM</span>
            </div>
            <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100 text-emerald-900 font-playfair italic text-xl leading-relaxed shadow-sm">
              {response}
            </div>
            <button 
              onClick={() => { setResponse(null); setQuery(''); }}
              className="mt-8 text-orange-600 font-bangers text-xl tracking-widest hover:text-orange-700 transition-colors uppercase"
            >
              NEW QUESTION
            </button>
          </div>
        ) : (
          <div className="text-center py-16 opacity-30">
            <Sparkles className="w-16 h-16 mx-auto text-orange-200 mb-6 animate-float" />
            <p className="font-playfair italic text-xl text-gray-400">"How shall we flavor today?"</p>
          </div>
        )}
      </div>

      <div className="p-8 border-t-2 border-gray-50 bg-gray-50/50 rounded-b-[2.5rem]">
        <form onSubmit={handleSubmit} className="relative group">
          <input 
            type="text" 
            placeholder="e.g. 'Paired spices for Chicken?'" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="w-full bg-white border-2 border-orange-100 rounded-2xl py-5 pl-8 pr-20 focus:outline-none focus:border-orange-600 transition-all font-medium text-lg disabled:opacity-50 shadow-inner placeholder:text-gray-200"
          />
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700 transition-all shadow-md active:scale-95 group-hover:rotate-6"
          >
            <Send className="w-5 h-5 animate-float" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpiceAssistant;
