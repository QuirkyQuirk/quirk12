import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

type CheckoutContextType = {
  isCheckoutModalOpen: boolean;
  isAuthModalOpen: boolean;
  openCheckoutFlow: () => void;
  closeCheckoutFlow: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  proceedToPayment: () => void;
  checkoutStep: 'auth' | 'shipping' | 'payment' | 'review';
  setCheckoutStep: (step: 'auth' | 'shipping' | 'payment' | 'review') => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'auth' | 'shipping' | 'payment' | 'review'>('auth');
  
  const { isAuthenticated } = useAuth();

  const openCheckoutFlow = () => {
    if (isAuthenticated) {
      setIsCheckoutModalOpen(true);
      setCheckoutStep('shipping');
    } else {
      openAuthModal();
    }
  };

  const closeCheckoutFlow = () => {
    setIsCheckoutModalOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const proceedToPayment = () => {
    if (isAuthenticated) {
      closeAuthModal();
      setIsCheckoutModalOpen(true);
      setCheckoutStep('shipping');
    }
  };

  return (
    <CheckoutContext.Provider value={{
      isCheckoutModalOpen,
      isAuthModalOpen,
      openCheckoutFlow,
      closeCheckoutFlow,
      openAuthModal,
      closeAuthModal,
      proceedToPayment,
      checkoutStep,
      setCheckoutStep
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};