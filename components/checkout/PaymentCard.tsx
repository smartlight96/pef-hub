// components/checkout/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { sendWhatsAppOrder } from '@/lib/whatsapp';
import CartItem from '@/components/cart/CartItem';
import { 
  User,
  Phone,
  MapPin,
  Send,
  Loader2,
  Shield,
  Truck,
  CheckCircle2,
  Clock,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutForm() {
  const { cart, totalAmount } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: 'asap',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (10-11 digits)';
    }
    
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Delivery address is required';
    } else if (customerInfo.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendWhatsAppOrder(customerInfo, cart, totalAmount);
    } catch (error) {
      console.error(error);
      alert('Failed to send order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between px-2 mb-6">
        {['Details', 'Review'].map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
              ${index === 0 ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500'}
            `}>
              {index + 1}
            </div>
            <span className={`hidden sm:block ml-2 text-sm font-medium ${index === 0 ? 'text-white' : 'text-zinc-500'}`}>
              {step}
            </span>
            {index < 1 && (
              <div className="w-12 sm:w-20 h-0.5 mx-2 bg-zinc-800">
                <div className="h-full w-full bg-orange-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Customer Information */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/60 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-zinc-800/60">
          <div className="p-2 rounded-xl bg-orange-500/10">
            <User className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Delivery Details</h2>
            <p className="text-xs text-zinc-400">Fill in your information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1.5">
              Full Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={customerInfo.name}
              onChange={handleInputChange}
              className={`w-full bg-zinc-950/80 border ${
                errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
              } rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-1.5">
                Phone <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="08012345678"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className={`w-full bg-zinc-950/80 border ${
                  errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
                } rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-1.5">
                Delivery Time
              </label>
              <select
                name="deliveryTime"
                value={customerInfo.deliveryTime}
                onChange={handleInputChange}
                className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white cursor-pointer focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              >
                <option value="asap">ASAP</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1.5">
              Delivery Address <span className="text-orange-500">*</span>
            </label>
            <textarea
              rows={2}
              name="address"
              placeholder="Street name, landmark, city"
              value={customerInfo.address}
              onChange={handleInputChange}
              className={`w-full bg-zinc-950/80 border ${
                errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
              } rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none transition-all`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1.5">{errors.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/60 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-zinc-800/60">
          <div className="p-2 rounded-xl bg-orange-500/10">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Order Summary</h2>
            <p className="text-xs text-zinc-400">{cart.length} items</p>
          </div>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
            <ShoppingBag size={32} strokeWidth={1.5} className="mb-2 text-zinc-600" />
            <p className="text-sm font-medium">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-zinc-800/30 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-orange-400 font-bold">×{item.quantity}</span>
                    <span className="text-sm text-zinc-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-zinc-800/60 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-zinc-400">Delivery</span>
                <span className="text-green-500 font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800/60">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-xl font-black text-orange-500">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitOrder}
        disabled={isSubmitting || cart.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Place Order via WhatsApp
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          Secure
        </span>
        <span className="w-px h-3 bg-zinc-700" />
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          Verified
        </span>
        <span className="w-px h-3 bg-zinc-700" />
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-orange-500" />
          Fast Delivery
        </span>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}