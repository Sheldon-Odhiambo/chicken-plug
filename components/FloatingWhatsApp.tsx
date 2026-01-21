
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_DETAILS } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all group ring-8 ring-white/10 animate-float"
      aria-label="Order on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white text-gray-900 px-6 py-3 rounded-2xl font-black text-sm whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
        Order via WhatsApp
      </div>
      <MessageCircle className="w-8 h-8 fill-current" />
    </a>
  );
};

export default FloatingWhatsApp;
