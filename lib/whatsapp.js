// lib/whatsapp.js

// Track active WhatsApp windows
let activeWindows = {};

/**
 * Open or focus existing WhatsApp window
 */
function openOrFocusWhatsApp(url, windowId) {
  if (typeof window === 'undefined') return;
  
  // Check if window exists and is not closed
  if (activeWindows[windowId] && !activeWindows[windowId].closed) {
    // Update URL and focus existing window
    activeWindows[windowId].location.href = url;
    activeWindows[windowId].focus();
  } else {
    // Open new window
    activeWindows[windowId] = window.open(url, '_blank');
  }
}

/**
 * Generate WhatsApp message for order - Customer to PEF-HUB
 */
export function generateWhatsAppMessage(customerInfo, cart, totalAmount) {
  const { name, phone, email, address, deliveryTime } = customerInfo;
  
  let message = `🛍️ *NEW ORDER - CUSTOMER TO PEF-HUB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Customer Details
  message += `👤 *Customer Information:*\n`;
  message += `┌─────────────────────────\n`;
  message += `│ Name: ${name}\n`;
  message += `│ Phone: ${phone}\n`;
  if (email) message += `│ Email: ${email}\n`;
  message += `│ Address: ${address}\n`;
  if (deliveryTime && deliveryTime !== 'asap') {
    message += `│ Delivery Time: ${deliveryTime}\n`;
  } else {
    message += `│ Delivery Time: ASAP\n`;
  }
  message += `└─────────────────────────\n\n`;
  
  // Order Items
  message += `📋 *Order Items:*\n`;
  message += `┌─────────────────────────\n`;
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `│ ${index + 1}. ${item.name}\n`;
    message += `│    Qty: ${item.quantity} × ₦${item.price.toLocaleString()}\n`;
    message += `│    Subtotal: ₦${subtotal.toLocaleString()}\n`;
    message += `│\n`;
  });
  message += `└─────────────────────────\n\n`;
  
  // Order Summary
  message += `💰 *Order Summary:*\n`;
  message += `┌─────────────────────────\n`;
  message += `│ Total Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  message += `│ Total Amount: ₦${totalAmount.toLocaleString()}\n`;
  message += `└─────────────────────────\n\n`;
  
  // Action Required - PEF-HUB Staff
  message += `📌 *Action Required - PEF-HUB Staff:*\n`;
  message += `1️⃣ Please confirm this order\n`;
  message += `2️⃣ Provide estimated delivery time\n`;
  message += `3️⃣ Contact customer if needed: ${phone}\n\n`;
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Delivery Address:* ${address}\n`;
  message += `📞 *Customer Phone:* ${phone}`;
  
  return encodeURIComponent(message);
}

/**
 * Generate separate messages for different recipients
 */
export function generateMessages(customerInfo, cart, totalAmount) {
  const { name, phone, address, deliveryTime } = customerInfo;
  
  // Message for owner/manager (full details)
  const ownerMessageText = `
🛍️ *NEW ORDER - CUSTOMER TO PEF-HUB*
━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Information:*
┌─────────────────────────
│ Name: ${name}
│ Phone: ${phone}
│ Address: ${address}
│ Delivery: ${deliveryTime || 'ASAP'}
└─────────────────────────

📋 *Order Items:*
${cart.map((item, i) => 
  `${i+1}. ${item.name}\n   Qty: ${item.quantity} × ₦${item.price.toLocaleString()}\n   Subtotal: ₦${(item.price * item.quantity).toLocaleString()}`
).join('\n\n')}

💰 *Total Amount: ₦${totalAmount.toLocaleString()}*

📞 *Customer Contact:* ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Please confirm this order and provide delivery time.
  `;
  
  // Message for kitchen (simplified - what to cook)
  const kitchenMessageText = `
👨‍🍳 *KITCHEN ORDER - PEF-HUB*
━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Items to Prepare:*
${cart.map((item, i) => `${i+1}. ${item.name} (${item.quantity}x)`).join('\n')}

👤 *Customer:* ${name}
📍 *Delivery Address:* ${address}
🕐 *Delivery Time:* ${deliveryTime || 'ASAP'}

━━━━━━━━━━━━━━━━━━━━━━━━
Total: ₦${totalAmount.toLocaleString()}
  `;
  
  return {
    ownerMessage: encodeURIComponent(ownerMessageText),
    kitchenMessage: encodeURIComponent(kitchenMessageText),
  };
}

/**
 * Send order to both contacts - Reuses existing WhatsApp tabs
 */
export function sendWhatsAppOrder(customerInfo, cart, totalAmount) {
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const { ownerMessage, kitchenMessage } = generateMessages(
    customerInfo,
    cart,
    totalAmount
  );
  
  // PEF-HUB Contacts (receiving the order)
  const contacts = {
    MAIN: '2348037925030',   // Main contact (Owner/Manager)
    BACKUP: '2348089537448', // Backup contact (Kitchen/Staff)
  };
  
  // Send to main contact - reuse existing tab
  const mainUrl = `https://wa.me/${contacts.MAIN}?text=${ownerMessage}`;
  openOrFocusWhatsApp(mainUrl, 'main');
  
  // Send to backup contact after delay - reuse existing tab
  setTimeout(() => {
    const backupUrl = `https://wa.me/${contacts.BACKUP}?text=${kitchenMessage}`;
    openOrFocusWhatsApp(backupUrl, 'backup');
  }, 500);
}

/**
 * Send order to specific contact
 */
export function sendWhatsAppToContact(customerInfo, cart, totalAmount, phoneNumber) {
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const url = `https://wa.me/${cleanNumber}?text=${message}`;
  openOrFocusWhatsApp(url, 'custom');
}

/**
 * Send order to multiple custom contacts
 */
export function sendWhatsAppToMultiple(customerInfo, cart, totalAmount, contacts) {
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
  
  contacts.forEach((contact, index) => {
    const cleanNumber = contact.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    setTimeout(() => {
      openOrFocusWhatsApp(url, `contact-${index}`);
    }, index * 500);
  });
}

/**
 * Send order with confirmation dialog
 */
export function sendWhatsAppOrderWithConfirmation(customerInfo, cart, totalAmount) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot send WhatsApp message from server side'));
      return;
    }

    try {
      const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
      
      const contacts = {
        MAIN: '2348037925030',
        BACKUP: '2348089537448',
      };
      
      const confirmed = window.confirm(
        '📱 *Send Order to PEF-HUB*\n\n' +
        'Your order will be sent to:\n' +
        '📞 Main Contact: ' + contacts.MAIN + '\n' +
        '📞 Backup Contact: ' + contacts.BACKUP + '\n\n' +
        'Existing WhatsApp tabs will be reused.\n' +
        'PEF-HUB will confirm your order shortly.\n\n' +
        'Continue?'
      );
      
      if (confirmed) {
        const mainUrl = `https://wa.me/${contacts.MAIN}?text=${message}`;
        openOrFocusWhatsApp(mainUrl, 'main');
        
        setTimeout(() => {
          const backupUrl = `https://wa.me/${contacts.BACKUP}?text=${message}`;
          openOrFocusWhatsApp(backupUrl, 'backup');
        }, 500);
        
        resolve();
      } else {
        reject(new Error('User cancelled'));
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Close all WhatsApp windows
 */
export function closeWhatsAppWindows() {
  Object.keys(activeWindows).forEach(key => {
    if (activeWindows[key] && !activeWindows[key].closed) {
      activeWindows[key].close();
    }
  });
  activeWindows = {};
}

/**
 * Get formatted order summary for display
 */
export function getOrderSummary(cart, totalAmount) {
  if (!cart || cart.length === 0) {
    return 'No items in cart';
  }
  
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const items = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
  
  return `${itemCount} items: ${items} | Total: ₦${totalAmount.toLocaleString()}`;
}

// Export PEF-HUB contacts
export const WHATSAPP_CONTACTS = {
  MAIN: '2348037925030',
  BACKUP: '2348089537448',
};