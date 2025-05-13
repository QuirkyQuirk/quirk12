import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle } from 'lucide-react';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Close popup after 10 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {/* Sale Banner */}
            <div className="bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] text-white p-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold mb-1">🎉 Flash Sale Alert!</h2>
              <p className="opacity-90">Limited time offer - Don't miss out!</p>
            </div>

            {/* Promo Codes */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">New Customer Special</span>
                  <span className="text-[#FF2E93] font-bold">20% OFF</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  First-time customers get an extra special discount!
                </p>
                <button
                  onClick={() => copyCode('NEWDRIP20')}
                  className="w-full py-2 bg-gray-100 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <span className="font-mono font-bold">NEWDRIP20</span>
                  {copied ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Weekend Special</span>
                  <span className="text-[#00D2C3] font-bold">15% OFF</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Limited weekend offer - Ends soon!
                </p>
                <button
                  onClick={() => copyCode('WEEKEND15')}
                  className="w-full py-2 bg-gray-100 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <span className="font-mono font-bold">WEEKEND15</span>
                  {copied ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              * Terms and conditions apply. Cannot be combined with other offers.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;