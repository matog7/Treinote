import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from './Toast';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className='fixed bottom-4 right-4 z-50 space-y-3 max-w-sm'>
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -50,
              scale: 0.3,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.3,
            }}
          >
            <Toast
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              onClose={onClose}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
