import { useState, useCallback, useRef } from 'react';
import { ToastType } from '../components/ui/Toast';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastCountRef = useRef(0);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${toastCountRef.current++}`;
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'success', title, message, duration });
    },
    [addToast]
  );

  const showError = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'error', title, message, duration });
    },
    [addToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'warning', title, message, duration });
    },
    [addToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'info', title, message, duration });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
