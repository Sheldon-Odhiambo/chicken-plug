
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronDown, 
  Sparkles, 
  Utensils, 
  Egg, 
  Coffee, 
  Cake, 
  Search,
  Instagram,
  Facebook,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS, BUSINESS_DETAILS } from './constants';
import { Product, CartItem } from './types';
import Cart from './components/Cart';
import SpiceAssistant from './components/SpiceAssistant';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const categories = [
    { name: 'Chicken', id: 'section-chicken', icon: <Utensils className="w-5 h-5 animate-float" />, accent: 'orange' },
    { name: 'Dairy', id: 'section-dairy', icon: <Coffee className="w-5 h-5 animate-float" />, accent: 'emerald' },
    { name: 'Bakery', id: 'section-bakery', icon: <Cake className="w-5 h-5 animate-float" />, accent: 'amber' },
    { name: 'Eggs', id: 'section-eggs', icon: <Egg className="w-5 h-5 animate-float" />, accent: 'emerald' },
    { name: 'Spices', id: 'section-spices', icon: <Sparkles className="w-5 h-5 animate-float" />, accent: 'orange' },
  ] as const;

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const groupedProducts = categories.reduce((acc, cat) => {
    acc[cat.name] = PRODUCTS.filter(p => 
      p.category === cat.name && 
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen pb-12 bg-[#fffcfb] font-inter">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-orange-600 p-2 rounded-lg shadow-lg ring-2 ring-orange-100 group-hover:scale-110 transition-transform">
              <Utensils className="text-white w-5 h-5 animate-sway" />
            </div>
            <h1 className={`text-2xl md:text-3xl font-bangers tracking-wider transition-colors duration-500 ${scrolled ? 'text-[#064e3b]' : 'text-white'}`}>
              CHICKEN PLUG
            </h1>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-orange-600 text-white p-3 rounded-xl shadow-xl hover:bg-orange-700 hover:scale-105 transition-all ring-4 ring-orange-50/20"
          >
            <ShoppingCart className="w-5 h-5 animate-float" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#064e3b] text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md font-inter">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=2000&auto=format&fit=crop" 
            alt="Roasted Chicken" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-[#fffcfb]" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.4em] mb-6 inline-block shadow-lg font-inter">
            Barut • Nakuru • Local Heritage
          </span>
          <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bangers mb-4 leading-none drop-shadow-xl tracking-normal uppercase">
            TASTE THE <br/> <span className="text-orange-500">BLESSING</span>
          </h2>
          <p className="text-lg md:text-2xl mb-10 font-medium text-orange-50/90 max-w-2xl mx-auto font-playfair italic leading-relaxed">
            Authentic roasting daily at <span className="text-orange-500 font-bold border-b-2 border-orange-500">4:00 PM</span>. Freshness you can taste, heritage you can feel.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
              <Clock className="w-5 h-5 text-orange-400 animate-float" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold text-orange-200 tracking-widest">Time</p>
                <p className="font-bold text-base font-playfair">4-7 PM Daily</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
              <MapPin className="w-5 h-5 text-emerald-400 animate-float" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold text-emerald-200 tracking-widest">At</p>
                <p className="font-bold text-base font-playfair">Barut Area</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('section-chicken')}
            className="group inline-flex items-center gap-4 bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full text-xl font-bangers tracking-widest shadow-xl transition-all hover:translate-y-[-4px]"
          >
            ORDER NOW
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-float" />
          </button>
        </div>
      </section>

      {/* Main Menu */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto mb-16 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search our selection..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-orange-50 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-orange-500 transition-all text-lg font-medium shadow-lg placeholder:text-gray-200"
          />
        </div>

        {categories.map(cat => {
          const items = groupedProducts[cat.name];
          if (items.length === 0) return null;

          return (
            <div key={cat.id} id={cat.id} className="mb-24 scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md rotate-3 ${cat.accent === 'emerald' ? 'bg-[#064e3b] text-white' : 'bg-orange-600 text-white'}`}>
                  {React.cloneElement(cat.icon as React.ReactElement, { className: (cat.icon as React.ReactElement).props.className + " animate-float" })}
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bangers tracking-wider text-gray-900 uppercase">
                    {cat.name}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {items.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] flex flex-col group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full shadow-sm">
                        <span className="text-orange-600 font-numbers font-bold text-xs">{product.price}/-</span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 font-playfair group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-inter">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 flex flex-col gap-3">
                        {product.unit && (
                          <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                            <span className="text-[9px] uppercase font-bold text-gray-400">Measure</span>
                            <span className="text-[9px] uppercase font-black text-emerald-600">{product.unit}</span>
                          </div>
                        )}
                        <button 
                          onClick={() => addToCart(product)}
                          className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm whitespace-nowrap ${
                            cat.accent === 'emerald' 
                              ? 'bg-[#064e3b] hover:bg-[#0a3a2d] text-white' 
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5 animate-float" />
                          ADD TO BASKET
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Spice Assistant Section */}
      <section className="py-24 bg-[#042f1e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <div className="grid grid-cols-12 h-full w-full">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border border-white/20 aspect-square" />
              ))}
           </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-600 p-3 rounded-xl shadow-lg">
                   <Sparkles className="text-white w-6 h-6 animate-float" />
                </div>
                <span className="text-orange-400 font-bold uppercase tracking-[0.4em] text-[10px]">Alchemist Corner</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bangers mb-6 leading-none uppercase">
                THE SPICE <br/> <span className="text-orange-500">EXPERTISE</span>
              </h2>
              <p className="text-emerald-100/70 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-playfair italic">
                Every sprinkle tells a story. Consult our AI Chef for authentic pairings from the heart of Nakuru.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-3 shadow-2xl transform lg:rotate-2">
               <SpiceAssistant />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="bg-[#064e3b] p-6 rounded-2xl shadow-lg mb-8 hover:scale-105 transition-transform cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Utensils className="text-white w-8 h-8 animate-sway" />
            </div>
            <h2 className="text-6xl md:text-7xl font-bangers text-gray-900 mb-2 tracking-normal uppercase">Chicken Plug</h2>
            <p className="text-orange-600 font-bold tracking-[0.5em] uppercase text-[10px] mb-12">Barut Area • Nakuru</p>
            
            <div className="flex gap-6">
              <a href="#" className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:text-orange-600 transition-all border border-gray-100">
                <Instagram className="w-5 h-5 animate-float" />
              </a>
              <a href="#" className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:text-emerald-600 transition-all border border-gray-100">
                <Facebook className="w-5 h-5 animate-float" />
              </a>
              <a href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}`} className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:text-orange-600 transition-all border border-gray-100">
                <MessageSquare className="w-5 h-5 animate-float" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20">
            <div className="text-center group">
              <MapPin className="w-6 h-6 text-orange-600 mx-auto mb-4 animate-float" />
              <h4 className="font-bold text-gray-400 uppercase text-[9px] tracking-widest mb-2">Visit</h4>
              <p className="text-lg font-bold font-playfair">{BUSINESS_DETAILS.location}</p>
            </div>
            <div className="text-center group">
              <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-4 animate-float" />
              <h4 className="font-bold text-gray-400 uppercase text-[9px] tracking-widest mb-2">Service</h4>
              <p className="text-lg font-bold font-playfair">{BUSINESS_DETAILS.hours}</p>
            </div>
            <div className="text-center group">
              <Phone className="w-6 h-6 text-orange-600 mx-auto mb-4 animate-sway" />
              <h4 className="font-bold text-gray-400 uppercase text-[9px] tracking-widest mb-2">Order</h4>
              <p className="text-3xl font-numbers text-orange-600 tracking-wider leading-none mt-1 hover:scale-110 transition-transform cursor-pointer">
                {BUSINESS_DETAILS.phone}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em]">
            <p>&copy; {new Date().getFullYear()} Chicken Plug Barut. Artisan Flavor, Local Care.</p>
            <div className="flex gap-8">
              <button onClick={() => scrollToSection('section-spices')} className="hover:text-orange-600 transition-colors">Spices</button>
              <button onClick={() => scrollToSection('section-chicken')} className="hover:text-emerald-600 transition-colors">Roast</button>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        items={cartItems} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
