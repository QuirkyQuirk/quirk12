import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCheckout } from '../../contexts/CheckoutContext';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderReview from './OrderReview';

const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    closeCheckoutFlow,
    checkoutStep,
    setCheckoutStep
  } = useCheckout();

  useEffect(() => {
    // Reset to shipping step when modal opens
    if (isCheckoutModalOpen) {
      setCheckoutStep('shipping');
    }
  }, [isCheckoutModalOpen, setCheckoutStep]);

  if (!isCheckoutModalOpen) return null;

  const steps = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeCheckoutFlow}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-xl mx-4 my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button 
          onClick={closeCheckoutFlow}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] px-6 py-5 text-white">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          
          {/* Steps indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.key}>
                {/* Step circle */}
                <div 
                  className={`flex items-center justify-center h-8 w-8 rounded-full ${
                    checkoutStep === step.key 
                      ? 'bg-white text-[#FF2E93] font-bold' 
                      : steps.indexOf({ key: checkoutStep, label: '' }) > index
                        ? 'bg-white text-[#00D2C3]'
                        : 'bg-white/30 text-white'
                  }`}
                >
                  {index + 1}
                </div>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-white/30">
                    <div 
                      className="h-full bg-white transition-all duration-300"
                      style={{ 
                        width: steps.indexOf({ key: checkoutStep, label: '' }) > index 
                          ? '100%' 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Step labels */}
          <div className="flex items-center justify-between mt-2 text-xs">
            {steps.map((step) => (
              <div 
                key={`label-${step.key}`}
                className={`px-1 ${
                  checkoutStep === step.key ? 'font-bold' : 'text-white/80'
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {checkoutStep === 'shipping' && <ShippingForm />}
          {checkoutStep === 'payment' && <PaymentForm />}
          {checkoutStep === 'review' && <OrderReview />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;