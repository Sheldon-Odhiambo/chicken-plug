
import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Truck, Store, MapPin, CreditCard, Wallet } from 'lucide-react';
import { CartItem } from '../types';
import { BUSINESS_DETAILS, DELIVERY_OPTIONS } from '../constants';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onUpdateQuantity, onRemove }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'direct' | 'delivery_pay'>('direct');
  const [selectedFee, setSelectedFee] = useState<number>(DELIVERY_OPTIONS[0].fee);
  const [location, setLocation] = useState('');

  const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = deliveryMethod === 'delivery' ? selectedFee : 0;
  const grandTotal = itemsTotal + deliveryCost;

  const getMeasureText = (item: CartItem) => {
    if (item.category !== 'Spices') return `x${item.quantity}`;
    if (item.quantity === 1) return 'Quarter Measure';
    if (item.quantity === 2) return 'Half Measure';
    if (item.quantity === 4) return 'Full Measure (1kg)';
    return `${item.quantity} Quarters`;
  };

  const handleCheckout = () => {
    if (deliveryMethod === 'delivery' && !location.trim()) {
      alert("Please enter your delivery location.");
      return;
    }

    const itemStrings = items.map(item => {
      const measure = getMeasureText(item);
      return `${item.name} (${measure}) - KES ${item.price * item.quantity}`;
    });

    const methodStr = deliveryMethod === 'pickup' ? "Pickup at Barut" : `Delivery to: ${location} (Fee: ${selectedFee})`;
    const paymentStr = paymentMethod === 'direct' ? "Direct M-Pesa" : "Pay on Delivery";

    const message = `*NEW ORDER - CHICKEN PLUG BARUT*
\n🛍️ *ITEMS*:
${itemStrings.join('\n')}
\n📍 *FULFILLMENT*: ${methodStr}
💳 *PAYMENT METHOD*: ${paymentStr}
\n💰 *SUBTOTAL*: KES ${itemsTotal}
🚚 *DELIVERY FEE*: KES ${deliveryCost}
🔥 *TOTAL AMOUNT*: KES ${grandTotal}
\n📞 *Contact Phone*: ${BUSINESS_DETAILS.phone}`;

    window.open(`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col font-inter ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center bg-[#064e3b] text-white">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
               <ShoppingBag className="w-5 h-5 animate-float" />
            </div>
            <h2 className="text-2xl font-bangers tracking-wider uppercase">Your Order</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <X className="w-6 h-6 animate-sway" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-gray-100 mx-auto mb-4 animate-float" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Your basket is currently empty</p>
              <button onClick={onClose} className="mt-6 text-orange-600 font-bangers text-xl tracking-widest">START SHOPPING</button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100 group">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm font-playfair">{item.name}</h3>
                      <p className="text-emerald-600 font-bold text-xs">{getMeasureText(item)}</p>
                      <p className="text-orange-600 font-numbers font-bold text-xs mt-1">KES {item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 border border-gray-200 shadow-sm">
                      <button onClick={() => item.quantity > 1 ? onUpdateQuantity(item.id, -1) : onRemove(item.id)} className="p-1 text-gray-400 hover:text-orange-600 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs w-4 text-center font-numbers">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-orange-600 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-bangers text-lg tracking-widest text-gray-400 uppercase">Fulfillment</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-emerald-100'}`}
                  >
                    <Store className={`w-4 h-4 ${deliveryMethod === 'pickup' ? 'animate-float' : ''}`} />
                    <span className="font-bold text-[10px] tracking-widest uppercase">PICKUP</span>
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'delivery' ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-emerald-100'}`}
                  >
                    <Truck className={`w-4 h-4 ${deliveryMethod === 'delivery' ? 'animate-float' : ''}`} />
                    <span className="font-bold text-[10px] tracking-widest uppercase">DELIVERY</span>
                  </button>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Distance Fee</p>
                    <div className="grid grid-cols-3 gap-2">
                      {DELIVERY_OPTIONS.map((opt) => (
                        <button
                          key={opt.fee}
                          onClick={() => setSelectedFee(opt.fee)}
                          className={`py-2 px-1 rounded-lg border-2 text-[10px] font-bold transition-all ${selectedFee === opt.fee ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-400 bg-gray-50 hover:border-orange-200'}`}
                        >
                          {opt.label}<br/><span className="font-numbers">{opt.fee}/-</span>
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-3.5 h-3.5 animate-float" />
                      <input 
                        type="text" 
                        placeholder="Location in Barut/Nakuru..." 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 text-sm font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-bangers text-lg tracking-widest text-gray-400 uppercase">Payment Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('direct')}
                    className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'direct' ? 'bg-orange-600 text-white border-orange-600 shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-100'}`}
                  >
                    <Wallet className={`w-5 h-5 ${paymentMethod === 'direct' ? 'animate-float' : ''}`} />
                    <span className="font-bold text-[10px] tracking-widest uppercase">Direct M-Pesa</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('delivery_pay')}
                    className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'delivery_pay' ? 'bg-orange-600 text-white border-orange-600 shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-100'}`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'delivery_pay' ? 'animate-float' : ''}`} />
                    <span className="font-bold text-[10px] tracking-widest uppercase">Pay on Delivery</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-end pt-3 border-t border-gray-200">
                <div>
                  <p className="text-[8px] uppercase font-black text-gray-300 tracking-[0.4em] mb-1">TOTAL PAYABLE</p>
                  <p className="text-4xl font-numbers text-[#064e3b] tracking-wider leading-none">
                    KES {grandTotal}
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#064e3b] hover:bg-[#0a3629] text-white py-4 rounded-xl font-bangers text-xl tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              ORDER ON WHATSAPP
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform animate-float" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
