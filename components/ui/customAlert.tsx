// components/ui/CustomAlert.tsx
'use client';

import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  AlertCircle,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';

export type AlertType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'delete' 
  | 'confirm';

export type AlertAction = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'success' | 'warning';
};

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type?: AlertType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  actions?: AlertAction[];
  showCancel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function CustomAlert({
  isOpen,
  onClose,
  onConfirm,
  type = 'info',
  title,
  message,
  icon,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  actions = [],
  showCancel = true,
  size = 'md',
  loading = false,
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (!actions.length) {
      handleClose();
    }
  };

  // Get icon based on type
  const getDefaultIcon = () => {
    const iconProps = { size: 24, className: 'text-current' };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-emerald-400" />;
      case 'error':
        return <AlertCircle {...iconProps} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="text-amber-400" />;
      case 'delete':
        return <Trash2 {...iconProps} className="text-red-400" />;
      case 'confirm':
        return <CheckCircle {...iconProps} className="text-blue-400" />;
      default:
        return <Info {...iconProps} className="text-blue-400" />;
    }
  };

  // Get color scheme based on type
  const getColorScheme = () => {
    switch (type) {
      case 'success':
        return {
          iconBg: 'bg-emerald-500/10',
          iconBorder: 'border-emerald-500/20',
          gradient: 'from-emerald-500 to-emerald-600',
          button: 'bg-emerald-500 hover:bg-emerald-600',
          shadow: 'shadow-emerald-500/25',
        };
      case 'error':
      case 'delete':
        return {
          iconBg: 'bg-red-500/10',
          iconBorder: 'border-red-500/20',
          gradient: 'from-red-500 to-red-600',
          button: 'bg-red-500 hover:bg-red-600',
          shadow: 'shadow-red-500/25',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-500/10',
          iconBorder: 'border-amber-500/20',
          gradient: 'from-amber-500 to-amber-600',
          button: 'bg-amber-500 hover:bg-amber-600',
          shadow: 'shadow-amber-500/25',
        };
      default:
        return {
          iconBg: 'bg-blue-500/10',
          iconBorder: 'border-blue-500/20',
          gradient: 'from-blue-500 to-blue-600',
          button: 'bg-blue-500 hover:bg-blue-600',
          shadow: 'shadow-blue-500/25',
        };
    }
  };

  const colorScheme = getColorScheme();

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div
          className={`
            relative w-full ${sizeClasses[size]}
            bg-gradient-to-br from-zinc-900 to-zinc-950 
            rounded-3xl border border-zinc-800/60 
            shadow-2xl shadow-black/50
            transition-all duration-300 ease-out
            ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}
          `}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Icon */}
          <div className="flex justify-center pt-8">
            <div className="relative">
              <div className={`absolute inset-0 ${colorScheme.iconBg} rounded-full blur-2xl animate-pulse`} />
              <div className={`relative w-20 h-20 rounded-full ${colorScheme.iconBg} border-2 ${colorScheme.iconBorder} flex items-center justify-center`}>
                {icon || getDefaultIcon()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center px-6 pb-6">
            <h3 className="mt-4 text-xl font-bold text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              {message}
            </p>

            {/* Custom Actions */}
            {actions.length > 0 && (
              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      if (action.variant !== 'danger') {
                        handleClose();
                      }
                    }}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
                      transition-all duration-200 hover:scale-[1.02] active:scale-95
                      ${
                        action.variant === 'danger' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25'
                          : action.variant === 'success'
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                          : action.variant === 'warning'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Default Confirm/Cancel Buttons */}
            {actions.length === 0 && (
              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                {showCancel && (
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-all duration-200 font-medium text-sm"
                    disabled={loading}
                  >
                    {cancelLabel}
                  </button>
                )}
                {onConfirm && (
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
                      transition-all duration-200 hover:scale-[1.02] active:scale-95
                      bg-gradient-to-r ${colorScheme.gradient} text-white shadow-lg ${colorScheme.shadow}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                    `}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      confirmLabel
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}