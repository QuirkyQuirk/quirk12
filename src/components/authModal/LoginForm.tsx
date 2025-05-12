import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface LoginFormProps {
  switchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, authError, clearAuthError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Success will be handled by the parent component
    } catch (error) {
      // Error is already handled in the AuthContext
      console.error('Login error:', error);
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearAuthError();
          }}
          placeholder="you@quirky.af"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#FF2E93] focus:ring-2 focus:ring-[#FF2E93]/20 focus:outline-none transition-all placeholder-gray-300"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearAuthError();
          }}
          placeholder="•••••• (don't worry, we can't see it either 👀)"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#FF2E93] focus:ring-2 focus:ring-[#FF2E93]/20 focus:outline-none transition-all placeholder-gray-300"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#FF2E93] focus:ring-[#FF2E93] border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="text-[#FF2E93] hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-[#FF2E93] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2E93] transition-colors ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#ff0080]'
        }`}
      >
        {isLoading ? 'Loading...' : 'Enter the Vibe 🚀'}
      </button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Not part of the squad yet?{' '}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-[#00D2C3] font-medium hover:underline"
          >
            Join the Drip Club
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;