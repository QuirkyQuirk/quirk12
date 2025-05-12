import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useCheckout } from '../../contexts/CheckoutContext';
import { useAuth } from '../../contexts/AuthContext';

type AuthTab = 'login' | 'signup';

const AuthModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthModalOpen, closeAuthModal, proceedToPayment } = useCheckout();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsOpen(isAuthModalOpen);
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      proceedToPayment();
    }
  }, [isAuthenticated, isOpen, proceedToPayment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeAuthModal}
      ></div>
      
      {/* Modal */}
      <div 
        className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl mx-4 animate-bounce-in"
        style={{ animation: 'bounceIn 0.5s ease-out' }}
      >
        {/* Close button */}
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={20} />
        </button>
        
        {/* Modal header with gradient background */}
        <div className="bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] px-6 py-8 text-white">
          <h2 className="text-2xl font-bold mb-1 drop-shadow-md">
            {activeTab === 'login' ? 'Already Vibe-In?' : 'New Here?'}
          </h2>
          <p className="text-white/80">
            {activeTab === 'login' 
              ? 'Welcome back to the drip zone!' 
              : 'Join the Drip Club for exclusive drops!'}
          </p>
        </div>
        
        {/* Tab switcher */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-[#FF2E93] border-b-2 border-[#FF2E93]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'signup'
                ? 'text-[#00D2C3] border-b-2 border-[#00D2C3]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {/* Form content */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm switchToSignup={() => setActiveTab('signup')} />
          ) : (
            <SignupForm switchToLogin={() => setActiveTab('login')} />
          )}
          
          {/* Social logins */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Google Vibes
              </button>
              <button
                type="button"
                className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Insta Energy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;