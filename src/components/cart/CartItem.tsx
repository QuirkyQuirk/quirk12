import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: {
    variantId: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.variantId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.variantId);
  };

  return (
    <motion.div 
      className="flex items-start border border-gray-200 rounded-lg p-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      {/* Product image */}
      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">Size: {item.size}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500">
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Quantity controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Minus size={14} />
            </motion.button>
            
            <span className="text-gray-700 w-8 text-center">{item.quantity}</span>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </motion.button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;