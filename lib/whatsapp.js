// lib/whatsapp.js

/**
 * Generate WhatsApp message for order - Customer to PEF-HUB
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @returns {string} Encoded WhatsApp message
 */
export function generateWhatsAppMessage(customerInfo, cart, totalAmount) {
  const { name, phone, email, address, deliveryTime } = customerInfo;
  
  // Clean message - optimized for mobile view
  let message = `🛍️ *NEW ORDER - PEF-HUB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Customer Details - Compact
  message += `👤 *Customer:*\n`;
  message += `┌─────────────\n`;
  message += `│ ${name}\n`;
  message += `│ ${phone}\n`;
  if (email) message += `│ ${email}\n`;
  message += `│ ${address}\n`;
  message += `│ ${deliveryTime || 'ASAP'}\n`;
  message += `└─────────────\n\n`;
  
  // Order Items - Compact
  message += `📋 *Items:*\n`;
  message += `┌─────────────\n`;
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `│ ${index + 1}. ${item.name}\n`;
    message += `│    ${item.quantity}x × ₦${item.price.toLocaleString()}\n`;
    message += `│    = ₦${subtotal.toLocaleString()}\n`;
    message += `│\n`;
  });
  message += `└─────────────\n\n`;
  
  // Order Summary - Clear
  message += `💰 *Total: ₦${totalAmount.toLocaleString()}*\n\n`;
  
  // Action Required - Short
  message += `📌 Please confirm & reply.\n`;
  message += `📞 Customer: ${phone}`;
  
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
  
  // Message for owner (full details)
  const ownerMessageText = `
🛍️ *NEW ORDER - PEF-HUB*
━━━━━━━━━━━━━━━━━━━━

👤 *Customer:*
┌─────────────
│ ${name}
│ ${phone}
│ ${address}
│ ${deliveryTime || 'ASAP'}
└─────────────

📋 *Items:*
${cart.map((item, i) => 
  `${i+1}. ${item.name}\n   ${item.quantity}x × ₦${item.price.toLocaleString()}\n   = ₦${(item.price * item.quantity).toLocaleString()}`
).join('\n\n')}

💰 *Total: ₦${totalAmount.toLocaleString()}*

📞 Contact: ${phone}
  `;
  
  // Message for kitchen (simplified)
  const kitchenMessageText = `
👨‍🍳 *KITCHEN ORDER*
━━━━━━━━━━━━━━━━━━━━

📋 *Items:*
${cart.map((item, i) => `${i+1}. ${item.name} (${item.quantity}x)`).join('\n')}

👤 *Customer:* ${name}
📍 *Address:* ${address}
🕐 *Time:* ${deliveryTime || 'ASAP'}
💰 *Total: ₦${totalAmount.toLocaleString()}*
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
 * Send order to specific contact
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @param {string} phoneNumber - Phone number to send to
 */
export function sendWhatsAppToContact(customerInfo, cart, totalAmount, phoneNumber) {
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
}

/**
 * Send order to multiple custom contacts
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @param {Array} contacts - Array of phone numbers
 */
export function sendWhatsAppToMultiple(customerInfo, cart, totalAmount, contacts) {
  if (typeof window === 'undefined') {
    console.error('Cannot send WhatsApp message from server side');
    return;
  }

  const message = generateWhatsAppMessage(customerInfo, cart, totalAmount);
  
  contacts.forEach((contact, index) => {
    const cleanNumber = contact.replace(/\D/g, '');
    setTimeout(() => {
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    }, index * 500);
  });
}

/**
 * Send order with confirmation dialog
 * @param {Object} customerInfo - Customer details
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @returns {Promise} Resolves when order is sent
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
        BACKUP: '2347033381862',
      };
      
      const confirmed = window.confirm(
        '📱 *Send Order to PEF-HUB*\n\n' +
        'Your order will be sent to:\n' +
        '📞 Main: ' + contacts.MAIN + '\n' +
        '📞 Backup: ' + contacts.BACKUP + '\n\n' +
        'Continue?'
      );
      
      if (confirmed) {
        window.open(`https://wa.me/${contacts.MAIN}?text=${message}`, '_blank');
        setTimeout(() => {
          window.open(`https://wa.me/${contacts.BACKUP}?text=${message}`, '_blank');
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
 * Get formatted order summary for display
 * @param {Array} cart - Cart items
 * @param {number} totalAmount - Total order amount
 * @returns {string} Formatted order summary
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
  BACKUP: '2347033381862',
};