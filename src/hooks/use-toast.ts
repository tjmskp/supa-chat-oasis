
import { Toast } from "@/components/ui/toast";
import { useState, useCallback } from 'react';

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof Toast> {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

interface ToastOptions {
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback(({ title, description, type = 'info', variant = 'default', duration = 5000, action }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = {
      id,
      title,
      description,
      variant: type === 'error' ? 'destructive' : variant,
      action,
    };

    setToasts((toasts) => [...toasts, newToast]);

    // Auto dismiss
    setTimeout(() => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return { toast, toasts };
};

// Add compatibility exports for shadcn UI toast
export const toast = (options: ToastOptions) => {
  const { toast: showToast } = useToast();
  showToast(options);
};
