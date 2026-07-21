// context/AlertContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAlert } from '@/hooks/useAlert';
import CustomAlert from '@/components/ui/customAlert';

const AlertContext = createContext<ReturnType<typeof useAlert> | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const alert = useAlert();

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={alert.hideAlert}
        onConfirm={alert.alert?.onConfirm}
        type={alert.alert?.type || 'info'}
        title={alert.alert?.title || ''}
        message={alert.alert?.message || ''}
        icon={alert.alert?.icon}
        confirmLabel={alert.alert?.confirmLabel || 'Confirm'}
        cancelLabel={alert.alert?.cancelLabel || 'Cancel'}
        actions={alert.alert?.actions || []}
        showCancel={alert.alert?.showCancel !== undefined ? alert.alert.showCancel : true}
        size={alert.alert?.size || 'md'}
        loading={alert.loading}
      />
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
}