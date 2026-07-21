// lib/whatsapp.js

/**
 * Generate order number with date prefix
 * Format: PEF-YYYYMMDD-XXX
 */
function generateOrderNumber() {
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
    localStorage.setItem(todayKey, String(orderCount));
  }
  
  return `PEF-${datePrefix}-${String(orderCount).padStart(3, '0')}`;
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
 * Generate WhatsApp message for order
 */
export function generateWhatsAppMessage(customerInfo, cart, totalAmount) {
  const { name, phone, address, deliveryTime } = customerInfo;
  
  const orderNumber = generateOrderNumber();
  const orderDate = getFormattedDate();
  
  let message = `🛍️ *NEW ORDER - PEF-HUB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📋 *Order #: ${orderNumber}*\n`;
  message += `📅 *Date: ${orderDate}*\n\n`;
  
  message += `👤 *Customer Details:*\n`;
  message += `┌─────────────\n`;
  message += `│ *Name:* ${name}\n`;
  message += `│ *Phone:* ${phone}\n`;
  message += `│ *Address:* ${address}\n`;
  message += `│ *Delivery Time:* ${deliveryTime || 'ASAP'}\n`;
  message += `└─────────────\n\n`;
  
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
  
  message += `💰 *Order Summary:*\n`;
  message += `┌─────────────\n`;
  message += `│ *Total Items:* ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  message += `│ *Total Amount:* ₦${totalAmount.toLocaleString()}\n`;
  message += `└─────────────\n\n`;
  
  message += `📌 *Action Required:*\n`;
  message += `Please confirm this order and provide delivery time.\n\n`;
  message += `📞 *Customer Phone:* ${phone}`;
  
  return message;
}

/**
 * Generate separate messages for different recipients
 */
export function generateMessages(customerInfo, cart, totalAmount) {
  const { name, phone, address, deliveryTime } = customerInfo;
  
  const orderNumber = generateOrderNumber();
  const orderDate = getFormattedDate();
  
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
    ownerMessage: ownerMessageText,
    kitchenMessage: kitchenMessageText,
  };
}

/**
 * Send order to both contacts - FIXED 404 ERROR
 */
export function sendWhatsAppOrder(customerInfo, cart, totalAmount) {
  // Check if running in browser
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return false;
  }

  try {
    // Generate messages
    const { ownerMessage, kitchenMessage } = generateMessages(
      customerInfo,
      cart,
      totalAmount
    );
    
    // Encode messages for URL
    const encodedOwner = encodeURIComponent(ownerMessage);
    const encodedKitchen = encodeURIComponent(kitchenMessage);
    
    // Contacts - Make sure numbers are correct (NO + sign)
    const contacts = {
      MAIN: '2348037925030',     // Remove the + sign
      BACKUP: '2347033381862',   // Remove the + sign
    };
    
    // Build URLs - Correct format: https://wa.me/2348037925030?text=message
    const mainUrl = `https://wa.me/${contacts.MAIN}?text=${encodedOwner}`;
    const backupUrl = `https://wa.me/${contacts.BACKUP}?text=${encodedKitchen}`;
    
    console.log('Main URL:', mainUrl);
    console.log('Backup URL:', backupUrl);
    
    // Open main WhatsApp - Use _blank to open in new tab
    const mainWindow = window.open(mainUrl, '_blank');
    
    // If popup was blocked, show fallback
    if (!mainWindow) {
      console.warn('Popup blocked. Opening fallback...');
      window.location.href = mainUrl;
      return true;
    }
    
    // Open backup WhatsApp after delay
    setTimeout(() => {
      try {
        const backupWindow = window.open(backupUrl, '_blank');
        if (!backupWindow) {
          console.warn('Backup popup blocked.');
        }
      } catch (err) {
        console.warn('Could not open backup:', err);
      }
    }, 800);
    
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp order:', error);
    return false;
  }
}

/**
 * Simple test function to verify WhatsApp link
 */
export function testWhatsAppLink() {
  if (typeof window === 'undefined') return;
  
  const testMessage = encodeURIComponent('Test message from PEF-HUB');
  const url = `https://wa.me/2348037925030?text=${testMessage}`;
  console.log('Test URL:', url);
  window.open(url, '_blank');
}

// Export contacts
export const WHATSAPP_CONTACTS = {
  MAIN: '2348037925030',
  BACKUP: '2347033381862',
};