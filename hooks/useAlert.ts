// hooks/useAlert.ts
'use client';

import { useState, useCallback } from 'react';
import { AlertType, AlertAction } from '@/components/ui/customAlert';

interface AlertOptions {
  type?: AlertType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  actions?: AlertAction[];
  size?: 'sm' | 'md' | 'lg';
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert(options);
    setIsOpen(true);
    setLoading(false);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setAlert(null);
      setLoading(false);
    }, 300);
  }, []);

  const showSuccess = useCallback((title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      type: 'success',
      title,
      message,
      confirmLabel: 'Great!',
      onConfirm,
    });
  }, [showAlert]);

  const showError = useCallback((title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      type: 'error',
      title,
      message,
      confirmLabel: 'OK',
      onConfirm,
    });
  }, [showAlert]);

  const showWarning = useCallback((title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      type: 'warning',
      title,
      message,
      confirmLabel: 'Continue',
      onConfirm,
    });
  }, [showAlert]);

  const showDelete = useCallback(
    (title: string, message: string, onConfirm: () => void) => {
      showAlert({
        type: 'delete',
        title,
        message,
        confirmLabel: 'Delete',
        onConfirm,
      });
    },
    [showAlert]
  );

  const showConfirm = useCallback(
    (title: string, message: string, onConfirm: () => void, confirmLabel?: string) => {
      showAlert({
        type: 'confirm',
        title,
        message,
        confirmLabel: confirmLabel || 'Confirm',
        onConfirm,
      });
    },
    [showAlert]
  );

  const showInfo = useCallback((title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      type: 'info',
      title,
      message,
      confirmLabel: 'Got it',
      onConfirm,
    });
  }, [showAlert]);

  const setAlertLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showDelete,
    showConfirm,
    showInfo,
    hideAlert,
    setAlertLoading,
    alert,
    isOpen,
    loading,
  };
}