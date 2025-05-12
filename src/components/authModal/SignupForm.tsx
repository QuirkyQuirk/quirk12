import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface SignupFormProps {
  switchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, authError, clearAuthError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(email, password, name);
      // Success will be handled by the parent component
    } catch (error) {
      // Error is already handled in the AuthContext
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {authError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start">
          <AlertCircle size={20} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{authError}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearAuthError();
          }}
          placeholder="What should we call you?"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#00D2C3] focus:ring-2 focus:ring-[#00D2C3]/20 focus:outline-none transition-all placeholder-gray-300"
        />
      </div>
      
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearAuthError();
          }}
          placeholder="you@quirky.af"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#00D2C3] focus:ring-2 focus:ring-[#00D2C3]/20 focus:outline-none transition-all placeholder-gray-300"
          required
        />
      </div>
      
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearAuthError();
          }}
          placeholder="Make it quirky but strong 💪"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#00D2C3] focus:ring-2 focus:ring-[#00D2C3]/20 focus:outline-none transition-all placeholder-gray-300"
          required
        />
      </div>
      
      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 mt-1 text-[#00D2C3] focus:ring-[#00D2C3] border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
          I agree to the <a href="#" className="text-[#00D2C3] hover:underline">Terms</a> and{' '}
          <a href="#" className="text-[#00D2C3] hover:underline">Privacy Policy</a>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-[#00D2C3] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D2C3] transition-colors ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#00b0a5]'
        }`}
      >
        {isLoading ? 'Loading...' : 'Get Drippy 💧'}
      </button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already one of us?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-[#FF2E93] font-medium hover:underline"
          >
            Login instead
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;