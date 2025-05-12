import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { useCart } from '../../contexts/CartContext';

const OrderReview: React.FC = () => {
  const { setCheckoutStep } = useCheckout();
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Review Your Order</h2>
      
      {/* Order summary */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 text-sm font-medium">
          Order Summary
        </div>
        
        <div className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center p-4 gap-4">
              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              
              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Totals */}
        <div className="bg-gray-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${(totalPrice * 0.08).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${(totalPrice + (totalPrice * 0.08)).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Shipping info */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 text-sm font-medium flex justify-between">
          <span>Shipping Information</span>
          <button 
            onClick={() => setCheckoutStep('shipping')}
            className="text-[#FF2E93] text-xs hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="p-4 text-sm">
          <p>John Doe</p>
          <p>123 Main St</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
          <p>(123) 456-7890</p>
        </div>
      </div>
      
      {/* Payment info */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 text-sm font-medium flex justify-between">
          <span>Payment Method</span>
          <button 
            onClick={() => setCheckoutStep('payment')}
            className="text-[#FF2E93] text-xs hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="p-4 text-sm">
          <p>Credit Card (•••• •••• •••• 4242)</p>
        </div>
      </div>
      
      {/* Place order button */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setCheckoutStep('payment')}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Payment
        </button>
        
        <button
          type="button"
          className="px-6 py-3 bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] text-white rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Place Order 🚀
        </button>
      </div>
    </div>
  );
};

export default OrderReview;