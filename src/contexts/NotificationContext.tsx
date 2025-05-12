import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  showNotification: (message: string, type: 'success' | 'error') => void;
  notification: {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  };
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as const,
    isVisible: false,
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};