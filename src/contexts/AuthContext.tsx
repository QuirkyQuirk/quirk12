import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
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
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const login = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email.trim() === '' || password.trim() === '') {
        throw new Error("Oof! Fill out all fields bestie! 🙄");
      }
      
      if (password === 'wrongpassword') {
        throw new Error("Bro... Wrong password. Wanna try again or cry? 😢");
      }
      
      const newUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      };
      
      setUser(newUser);
      setAuthError(null);
      showNotification('Successfully logged in! 🎉', 'success');
      
      // Navigate back to the previous page or home
      if (location.pathname === '/profile') {
        navigate('/');
      }
      
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
        showNotification(error.message, 'error');
      } else {
        setAuthError("Login failed. The vibes were off... Try again? 👀");
        showNotification("Login failed. The vibes were off... Try again? 👀", 'error');
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
      
      const newUser = {
        id: '1',
        email,
        name: name || email.split('@')[0],
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      };
      
      setUser(newUser);
      setAuthError(null);
      showNotification('Welcome to the squad! 🎉', 'success');
      
      // Navigate back to the previous page or home
      if (location.pathname === '/profile') {
        navigate('/');
      }
      
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
        showNotification(error.message, 'error');
      } else {
        setAuthError("Signup glitched out. Not the vibe we wanted... 😬");
        showNotification("Signup glitched out. Not the vibe we wanted... 😬", 'error');
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    showNotification('Successfully logged out! Come back soon! 👋', 'success');
    navigate('/');
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