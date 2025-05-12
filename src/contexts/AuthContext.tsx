import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
  clearAuthError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const location = useLocation();

  const login = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email.trim() === '' || password.trim() === '') {
        throw new Error("Oof! Fill out all fields bestie! 🙄");
      }
      
      if (password === 'wrongpassword') {
        throw new Error("Bro... Wrong password. Wanna try again or cry? 😢");
      }
      
      setUser({
        id: '1',
        email,
        name: email.split('@')[0]
      });
      setAuthError(null);
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Login failed. The vibes were off... Try again? 👀");
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email.trim() === '' || password.trim() === '') {
        throw new Error("Fill in the blanks! Don't leave us hanging! 😫");
      }
      
      if (password.length < 6) {
        throw new Error("Weak password energy! Make it 6+ characters! 💪");
      }
      
      setUser({
        id: '1',
        email,
        name: name || email.split('@')[0]
      });
      setAuthError(null);
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Signup glitched out. Not the vibe we wanted... 😬");
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout, 
      authError, 
      clearAuthError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};