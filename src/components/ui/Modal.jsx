import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, primaryAction, primaryLabel, secondaryAction, secondaryLabel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
            <div className="text-gray-600 mb-6">{children}</div>
            <div className="flex justify-end gap-3">
              {secondaryAction && (
                <button
                  onClick={secondaryAction}
                  className="px-6 py-2 rounded-lg bg-gray-100 text-primary font-semibold hover:bg-gray-200 transition-colors"
                >
                  {secondaryLabel || 'Cancel'}
                </button>
              )}
              <button
                onClick={primaryAction}
                className="px-6 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-orange-700 transition-colors"
              >
                {primaryLabel || 'Confirm'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
