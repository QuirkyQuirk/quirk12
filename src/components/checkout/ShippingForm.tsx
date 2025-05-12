import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';

const ShippingForm: React.FC = () => {
  const { setCheckoutStep } = useCheckout();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Shipping Information</h2>
      
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <label htmlFor="first-name" className="block text-sm text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            id="first-name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-3">
          <label htmlFor="last-name" className="block text-sm text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            id="last-name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-6">
          <label htmlFor="address" className="block text-sm text-gray-700 mb-1">Address</label>
          <input
            type="text"
            id="address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="city" className="block text-sm text-gray-700 mb-1">City</label>
          <input
            type="text"
            id="city"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="state" className="block text-sm text-gray-700 mb-1">State</label>
          <input
            type="text"
            id="state"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="zip" className="block text-sm text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            id="zip"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
        
        <div className="col-span-6">
          <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF2E93] focus:border-[#FF2E93]"
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setCheckoutStep('payment')}
          className="px-4 py-2 bg-[#FF2E93] text-white rounded-md text-sm font-medium hover:bg-[#ff0080] transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingForm;