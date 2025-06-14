import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  info: <FaInfoCircle />,
};

const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
}

const Toast = ({ message, type = 'info', onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`fixed top-5 right-5 flex items-center gap-4 p-4 rounded-lg text-white shadow-lg z-[100] ${colors[type]}`}
    >
      <div className="text-2xl">{icons[type]}</div>
      <p className="font-semibold">{message}</p>
      <button onClick={onDismiss} className="absolute top-1 right-1 text-white/70 hover:text-white">&times;</button>
    </motion.div>
  );
};

const ToastsContainer = ({ toasts, dismissToast }) => {
    return (
        <AnimatePresence>
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />
            ))}
        </AnimatePresence>
    )
}

export default ToastsContainer;
