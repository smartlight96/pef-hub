'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { sendWhatsAppOrder } from '@/lib/whatsapp';
import CartItem from '@/components/cart/CartItem';
import { 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  CreditCard, 
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Send,
  Loader2,
  Shield,
  Truck,
  Award,
  Clock
} from 'lucide-react';

export default function CheckoutForm() {
  const { cart, totalAmount } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: 'asap',
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    setReceipt(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('0123456789');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Customer Information Block */}
      <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-8 border border-zinc-800/60 shadow-2xl shadow-black/20">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/60">
          <div className="p-3 rounded-2xl bg-orange-500/20">
            <User className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Customer Information</h2>
            <p className="text-sm text-zinc-400 mt-0.5">Fill in your delivery details</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-zinc-200 mb-2.5">
              <User className="w-5 h-5 text-orange-500" />
              Full Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Doe"
              value={customerInfo.name}
              onChange={handleInputChange}
              className={`w-full bg-zinc-950/80 border-2 ${
                errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
              } rounded-2xl p-4 text-base text-white placeholder:text-zinc-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-200`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-zinc-200 mb-2.5">
              <Phone className="w-5 h-5 text-orange-500" />
              Phone Number <span className="text-orange-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 08012345678"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className={`w-full bg-zinc-950/80 border-2 ${
                errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
              } rounded-2xl p-4 text-base text-white placeholder:text-zinc-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-200`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5">
                <span>⚠️</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-zinc-200 mb-2.5">
              <MapPin className="w-5 h-5 text-orange-500" />
              Delivery Address <span className="text-orange-500">*</span>
            </label>
            <textarea
              rows={3}
              name="address"
              placeholder="Street name, Apartment details, Landmark, City"
              value={customerInfo.address}
              onChange={handleInputChange}
              className={`w-full bg-zinc-950/80 border-2 ${
                errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'
              } rounded-2xl p-4 text-base text-white placeholder:text-zinc-500 focus:ring-4 focus:ring-orange-500/20 outline-none resize-none transition-all duration-200`}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5">
                <span>⚠️</span> {errors.address}
              </p>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-zinc-200 mb-2.5">
              <Clock className="w-5 h-5 text-orange-500" />
              Delivery Time
            </label>
            <select
              name="deliveryTime"
              value={customerInfo.deliveryTime}
              onChange={handleInputChange}
              className="w-full bg-zinc-950/80 border-2 border-zinc-700 focus:border-orange-500 rounded-2xl p-4 text-base text-white cursor-pointer focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-200"
            >
              <option value="asap">🕐 ASAP</option>
              <option value="12:00">🕛 12:00 PM</option>
              <option value="13:00">🕐 1:00 PM</option>
              <option value="14:00">🕑 2:00 PM</option>
              <option value="15:00">🕒 3:00 PM</option>
              <option value="16:00">🕓 4:00 PM</option>
              <option value="17:00">🕔 5:00 PM</option>
              <option value="18:00">🕕 6:00 PM</option>
              <option value="19:00">🕖 7:00 PM</option>
              <option value="20:00">🕗 8:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Information Block */}
      <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-8 border border-zinc-800/60 shadow-2xl shadow-black/20">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/60">
          <div className="p-3 rounded-2xl bg-orange-500/20">
            <CreditCard className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Payment Information</h2>
            <p className="text-sm text-zinc-400 mt-0.5">Pay via bank transfer</p>
          </div>
        </div>
        
        {/* Step 1: Bank Details */}
        <div className="mb-6 bg-zinc-950/60 border-2 border-zinc-700/60 rounded-2xl p-5 flex items-center justify-between hover:border-orange-500/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <CreditCard size={22} className="text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">GTBank</p>
              <p className="text-sm text-zinc-300 font-medium">ServiceConnect Ltd.</p>
              <p className="text-xl font-black text-white tracking-wider mt-0.5">0123456789</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-orange-500/50 transition-all duration-200 active:scale-95"
          >
            {isCopied ? <CheckCircle2 size={18} className="text-green-400" /> : <Copy size={18} />}
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Step 2: Upload Receipt */}
        <div>
          <label className="flex items-center gap-2 text-base font-bold text-zinc-200 mb-2.5">
            <UploadCloud className="w-5 h-5 text-orange-500" />
            Upload Payment Receipt
          </label>
          <div className="relative group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleReceiptUpload}
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            <div className={`w-full bg-zinc-950/40 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 ${
              receipt ? 'border-green-500/40 bg-green-500/[0.02]' : 'border-zinc-700 group-hover:border-orange-500/40 group-hover:bg-zinc-900/30'
            }`}>
              {receipt ? (
                <>
                  <div className="p-4 rounded-full bg-green-500/10 text-green-400 mb-3">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-base font-semibold text-zinc-200 max-w-[300px] truncate">{receipt.name}</p>
                  <p className="text-sm text-green-400 mt-1">Click to replace receipt</p>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-zinc-900 border-2 border-zinc-800 text-zinc-400 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-all mb-3">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-base font-semibold text-zinc-300">Drop your receipt here</p>
                  <p className="text-sm text-zinc-500 mt-1">or click to browse • PNG, JPG up to 5MB</p>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2 text-center">
            Upload a screenshot of your bank transfer confirmation
          </p>
        </div>
      </div>

      {/* Order Summary Block */}
      <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-8 border border-zinc-800/60 shadow-2xl shadow-black/20">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/60">
          <div className="p-3 rounded-2xl bg-orange-500/20">
            <ShoppingBag className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Order Summary</h2>
            <p className="text-sm text-zinc-400 mt-0.5">{cart.length} item(s) in your cart</p>
          </div>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <ShoppingBag size={48} strokeWidth={1.5} className="mb-4 text-zinc-600" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-zinc-600 mt-1">Browse our menu and add items</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="max-h-[280px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="border-t-2 border-zinc-800/60 pt-5 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-zinc-400">Subtotal</span>
                <span className="text-xl font-black text-white">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-base font-semibold text-zinc-400">Delivery</span>
                <span className="text-base font-bold text-green-500">FREE</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-zinc-800/60">
                <span className="text-xl font-black text-white">Total</span>
                <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="space-y-4">
        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || cart.length === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed py-5 rounded-2xl font-black text-xl text-white shadow-2xl shadow-orange-500/20 transition-all duration-300 active:scale-[0.98] hover:scale-[1.01] flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Processing Order...
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              Send Order via WhatsApp
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Secure</span>
          </div>
          <span className="w-px h-5 bg-zinc-700" />
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Verified</span>
          </div>
          <span className="w-px h-5 bg-zinc-700" />
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
            <Truck className="w-5 h-5 text-orange-500" />
            <span>Fast Delivery</span>
          </div>
          <span className="w-px h-5 bg-zinc-700" />
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
            <Award className="w-5 h-5 text-orange-500" />
            <span>Premium Quality</span>
          </div>
        </div>

        <p className="text-xs text-zinc-500 text-center">
          By placing your order, you agree to our Terms & Conditions
        </p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}