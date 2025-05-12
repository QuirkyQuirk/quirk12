import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { useCheckout } from '../../contexts/CheckoutContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const {
    cartItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const { openCheckoutFlow } = useCheckout();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-40 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>

        {/* Cart panel */}
        <motion.div 
          className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          {/* Header */}
          <div className="px-4 py-6 bg-black text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} />
              <h2 className="text-lg font-semibold">Your Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Cart content */}
          <div className="flex-1 overflow-y-auto py-6 px-4 bg-gray-50">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet!</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Cart items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.variantId} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer with total and checkout button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 py-6 px-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">Subtotal</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openCheckoutFlow();
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] text-white font-medium rounded-md flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;