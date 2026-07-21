// lib/whatsapp.js

/**
 * Generate order number with date prefix
 * Format: PEF-YYYYMMDD-XXX
 * Example: PEF-20240721-001
 */
function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;
  
  // Get today's order count from localStorage
  let orderCount = 1;
  const todayKey = `order_count_${datePrefix}`;
  
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      orderCount = parseInt(saved) + 1;
    }
    localStorage.setItem(todayKey, String(orderCount));
  }
  
  const orderNumber = `PEF-${datePrefix}-${String(orderCount).padStart(3, '0')}`;
  return orderNumber;
}

/**
 * Get today's date in readable format
 */
function getFormattedDate() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return now.toLocaleDateString('en-NG', options);
}

/**
 * Generate WhatsApp message for order - Customer to PEF-HUB
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @returns {string} Encoded WhatsApp message
 */
export function generateWhatsAppMessage(customerInfo, cart, totalAmount) {
  const { name, phone, address, deliveryTime } = customerInfo;
  
  // Generate order number and date
  const orderNumber = generateOrderNumber();
  const orderDate = getFormattedDate();
  
  let message = `🛍️ *NEW ORDER - PEF-HUB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Order Header
  message += `📋 *Order #: ${orderNumber}*\n`;
  message += `📅 *Date: ${orderDate}*\n\n`;
  
  // Customer Details - ALL BOLD LABELS (NO EMAIL)
  message += `👤 *Customer Details:*\n`;
  message += `┌─────────────\n`;
  message += `│ *Name:* ${name}\n`;
  message += `│ *Phone:* ${phone}\n`;
  message += `│ *Address:* ${address}\n`;
  message += `│ *Delivery Time:* ${deliveryTime || 'ASAP'}\n`;
  message += `└─────────────\n\n`;
  
  // Order Items
  message += `📋 *Order Items:*\n`;
  message += `┌─────────────\n`;
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `│ ${index + 1}. *${item.name}*\n`;
    message += `│    *Qty:* ${item.quantity}\n`;
    message += `│    *Price:* ₦${item.price.toLocaleString()}\n`;
    message += `│    *Subtotal:* ₦${subtotal.toLocaleString()}\n`;
    message += `│\n`;
  });
  message += `└─────────────\n\n`;
  
  // Order Summary
  message += `💰 *Order Summary:*\n`;
  message += `┌─────────────\n`;
  message += `│ *Total Items:* ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  message += `│ *Total Amount:* ₦${totalAmount.toLocaleString()}\n`;
  message += `└─────────────\n\n`;
  
  // Action Required
  message += `📌 *Action Required:*\n`;
  message += `Please confirm this order and provide delivery time.\n\n`;
  message += `📞 *Customer Phone:* ${phone}`;
  
  return encodeURIComponent(message);
}

/**
 * Generate separate messages for different recipients
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @returns {Object} Object containing owner and kitchen messages
 */
export function generateMessages(customerInfo, cart, totalAmount) {
  const { name, phone, address, deliveryTime } = customerInfo;
  
  const orderNumber = generateOrderNumber();
  const orderDate = getFormattedDate();
  
  // Message for owner (full details - NO EMAIL)
  const ownerMessageText = `
🛍️ *NEW ORDER - PEF-HUB*
━━━━━━━━━━━━━━━━━━━━

📋 *Order #: ${orderNumber}*
📅 *Date: ${orderDate}*

👤 *Customer Details:*
┌─────────────
│ *Name:* ${name}
│ *Phone:* ${phone}
│ *Address:* ${address}
│ *Delivery Time:* ${deliveryTime || 'ASAP'}
└─────────────

📋 *Order Items:*
${cart.map((item, i) => 
  `${i+1}. *${item.name}*\n   *Qty:* ${item.quantity}\n   *Price:* ₦${item.price.toLocaleString()}\n   *Subtotal:* ₦${(item.price * item.quantity).toLocaleString()}`
).join('\n\n')}

💰 *Order Summary:*
┌─────────────
│ *Total Items:* ${cart.reduce((sum, item) => sum + item.quantity, 0)}
│ *Total Amount:* ₦${totalAmount.toLocaleString()}
└─────────────

📞 *Customer Phone:* ${phone}
  `;
  
  // Message for kitchen (simplified - NO EMAIL)
  const kitchenMessageText = `
👨‍🍳 *KITCHEN ORDER - PEF-HUB*
━━━━━━━━━━━━━━━━━━━━

📋 *Order #: ${orderNumber}*
📅 *Date: ${orderDate}*

📋 *Items to Prepare:*
${cart.map((item, i) => `${i+1}. *${item.name}* (${item.quantity}x)`).join('\n')}

👤 *Customer Details:*
┌─────────────
│ *Name:* ${name}
│ *Address:* ${address}
│ *Delivery Time:* ${deliveryTime || 'ASAP'}
└─────────────

💰 *Total Amount:* ₦${totalAmount.toLocaleString()}
  `;
  
  return {
    ownerMessage: encodeURIComponent(ownerMessageText),
    kitchenMessage: encodeURIComponent(kitchenMessageText),
  };
}

/**
 * Send order to both contacts - Customer to PEF-HUB
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 */
export function sendWhatsAppOrder(customerInfo, cart, totalAmount) {
  // Check if running in browser
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const { ownerMessage, kitchenMessage } = generateMessages(
    customerInfo,
    cart,
    totalAmount
  );
  
  // Contacts - PEF-HUB Staff
  const contacts = {
    MAIN: '2348037925030',
    BACKUP: '2347033381862',
  };
  
  // Send to main contact
  window.open(`https://wa.me/${contacts.MAIN}?text=${ownerMessage}`, '_blank');
  
  // Send to backup contact after short delay
  setTimeout(() => {
    window.open(`https://wa.me/${contacts.BACKUP}?text=${kitchenMessage}`, '_blank');
  }, 500);
}

/**
 * Get current order number (for display)
 * @returns {string} Current order number
 */
export function getCurrentOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;
  
  let orderCount = 1;
  const todayKey = `order_count_${datePrefix}`;
  
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      orderCount = parseInt(saved) + 1;
    }
  }
  
  return `PEF-${datePrefix}-${String(orderCount).padStart(3, '0')}`;
}

/**
 * Reset order count for a specific date (admin function)
 * @param {string} date - Date in YYYYMMDD format
 */
export function resetOrderCount(date) {
  if (typeof window !== 'undefined') {
    const key = `order_count_${date}`;
    localStorage.removeItem(key);
    console.log(`Order count reset for ${date}`);
  }
}

// Export contacts
export const WHATSAPP_CONTACTS = {
  MAIN: '2348037925030',
  BACKUP: '2347033381862',
};