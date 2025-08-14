import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'error':
        return <XCircle className='w-5 h-5 text-red-500' />;
      case 'warning':
        return <AlertCircle className='w-5 h-5 text-yellow-500' />;
      case 'info':
        return <Info className='w-5 h-5 text-blue-500' />;
      default:
        return <Info className='w-5 h-5 text-blue-500' />;
    }
  };

  const getToastStyles = () => {
    const baseStyles = 'flex items-start p-4 rounded-lg shadow-lg border-l-4';

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-500 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-500 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-500 text-gray-800`;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 300,
        scale: 0.8,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      }}
      className={getToastStyles()}
    >
      <div className='flex-shrink-0 mr-3 mt-0.5'>{getIcon()}</div>

      <div className='flex-1 min-w-0'>
        <h4 className='text-sm font-semibold'>{title}</h4>
        {message && <p className='text-sm mt-1 opacity-90'>{message}</p>}
      </div>

      <motion.button
        onClick={() => onClose(id)}
        className='flex-shrink-0 ml-3 p-1 rounded-md hover:bg-black/10 transition-colors'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className='w-4 h-4' />
      </motion.button>
    </motion.div>
  );
};

export default Toast;
