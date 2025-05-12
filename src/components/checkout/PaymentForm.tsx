import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';

const PaymentForm: React.FC = () => {
  const { setCheckoutStep } = useCheckout();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Payment Method</h2>
      
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <input 
            type="radio" 
            id="credit-card" 
            name="payment-method" 
            className="h-4 w-4 text-[#FF2E93] focus:ring-[#FF2E93]"
            defaultChecked
          />
          <label htmlFor="credit-card" className="block text-sm font-medium">Credit Card</label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="card-number" className="block text-sm text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
            />
          </div>
          
          <div>
            <label htmlFor="expiration" className="block text-sm text-gray-700 mb-1">Expiration Date</label>
            <input
              type="text"
              id="expiration"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
            />
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <input 
            type="radio" 
            id="paypal" 
            name="payment-method" 
            className="h-4 w-4 text-[#FF2E93] focus:ring-[#FF2E93]"
          />
          <label htmlFor="paypal" className="block text-sm font-medium">PayPal</label>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setCheckoutStep('shipping')}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Shipping
        </button>
        
        <button
          type="button"
          onClick={() => setCheckoutStep('review')}
          className="px-4 py-2 bg-[#FF2E93] text-white rounded-md text-sm font-medium hover:bg-[#ff0080] transition-colors"
        >
          Review Order
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;