// components/checkout/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
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
  Clock,
  Building2,
  User as UserIcon,
  Minus,
  Plus,
  Trash2,
  Utensils,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';

export default function CheckoutForm() {
  const { cart, totalAmount, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  
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

  const bankDetails = {
    bank: 'OPAY',
    accountName: 'CALEB MOSES OKPU',
    accountNumber: '6405311644',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
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
    navigator.clipboard.writeText(bankDetails.accountNumber);
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
    // Validate form
    if (!validateForm()) {
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Check if cart is empty
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before ordering.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate the WhatsApp message
      const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp contact
      const phoneNumber = '2348037925030';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      console.log('📱 Opening WhatsApp...');
      console.log('Message preview:', message.substring(0, 200) + '...');
      
      // Open WhatsApp in new tab
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // If popup blocked, try alternative
      if (!newWindow || newWindow.closed) {
        console.log('Popup blocked, opening in same tab...');
        window.location.href = whatsappUrl;
      }
      
      // Show instruction after opening WhatsApp
      setTimeout(() => {
        alert(
          '📱 WhatsApp Opened!\n\n' +
          'Please review your order and click SEND on WhatsApp.\n\n' +
          'Your order will only be confirmed once you send the message.'
        );
      }, 1500);
      
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('❌ Failed to open WhatsApp. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = totalAmount;
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4 sm:px-0">
      {/* Left Column - Forms (3/5) */}
      <div className="lg:col-span-3 space-y-6">
        {/* Customer Information */}
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/60 p-6">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-800/60">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <User className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Delivery Details</h2>
              <p className="text-xs text-zinc-400">Fill in your information</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name <span className="text-orange-500">*</span></label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={customerInfo.name}
                onChange={handleInputChange}
                className={`w-full bg-zinc-950/80 border ${errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'} rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone <span className="text-orange-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="08012345678"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-zinc-950/80 border ${errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'} rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Delivery Time</label>
                <select
                  name="deliveryTime"
                  value={customerInfo.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-orange-500 rounded-lg px-3 py-2 text-sm text-white cursor-pointer focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
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
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Delivery Address <span className="text-orange-500">*</span></label>
              <textarea
                rows={2}
                name="address"
                placeholder="Street name, landmark, city"
                value={customerInfo.address}
                onChange={handleInputChange}
                className={`w-full bg-zinc-950/80 border ${errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-orange-500'} rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none transition-all`}
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/60 p-6">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-800/60">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <CreditCard className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Payment</h2>
              <p className="text-xs text-zinc-400">Pay via bank transfer</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-zinc-950/60 border border-zinc-700/60 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  Bank
                </span>
                <span className="text-sm font-semibold text-white">{bankDetails.bank}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-zinc-800/50">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-2">
                  <UserIcon className="w-3.5 h-3.5 text-zinc-500" />
                  Account Name
                </span>
                <span className="text-sm font-semibold text-white">{bankDetails.accountName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-zinc-800/50">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                  Account Number
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-orange-500 tracking-wider">
                    {bankDetails.accountNumber}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Upload Receipt</label>
              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className={`w-full bg-zinc-950/40 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${receipt ? 'border-green-500/40 bg-green-500/[0.02]' : 'border-zinc-700 group-hover:border-orange-500/40'}`}>
                  {receipt ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-400 mb-1" />
                      <p className="text-xs font-medium text-zinc-200 truncate max-w-[150px]">{receipt.name}</p>
                      <p className="text-[10px] text-green-400 mt-0.5">Click to replace</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={20} className="text-zinc-400 group-hover:text-orange-400 transition-colors mb-1" />
                      <p className="text-xs font-medium text-zinc-300">Upload receipt</p>
                      <p className="text-[10px] text-zinc-500">PNG, JPG • Max 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary (2/5) */}
      <div className="lg:col-span-2">
        <div className="sticky top-24">
          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-2xl border border-zinc-800/60 p-6 shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm font-bold text-white">Your Order</span>
              </div>
              <span className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded-full">
                {cart.length} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                <ShoppingBag size={28} strokeWidth={1.5} className="mb-2 text-zinc-600" />
                <p className="text-sm font-medium">Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 p-2 bg-zinc-950/50 rounded-xl border border-zinc-800/30 hover:border-orange-500/20 transition-all group"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-500">
                            <Utensils size={14} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs font-bold text-orange-500">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-0.5 bg-zinc-800/50 rounded-lg p-0.5">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center transition-colors active:scale-95"
                        >
                          <Minus className="w-2.5 h-2.5 text-zinc-400" />
                        </button>
                        <span className="w-5 text-center font-bold text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center transition-colors active:scale-95"
                        >
                          <Plus className="w-2.5 h-2.5 text-zinc-400" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Remove "${item.name}" from your cart?`)) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="w-5 h-5 rounded hover:bg-red-500/20 flex items-center justify-center transition-colors text-red-400 hover:text-red-300"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Delivery</span>
                    <span className="text-green-500 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800/60">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-lg font-black text-orange-500">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Send via WhatsApp
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    Secure
                  </span>
                  <span className="w-px h-3 bg-zinc-700" />
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-orange-500" />
                    Fast
                  </span>
                  <span className="w-px h-3 bg-zinc-700" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-500" />
                    On Time
                  </span>
                </div>

                {/* Important Note */}
                <div className="mt-3 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-center">
                  <p className="text-[10px] text-zinc-400">
                    ⚠️ Your order is only processed after payment is confirmed please attach transaction receipt to the message
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
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