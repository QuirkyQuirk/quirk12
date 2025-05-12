import React from 'react';
import { LogOut, User, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
  const { isAuthenticated, logout, user } = useAuth();
  
  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="user-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
      {isAuthenticated ? (
        <>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Hey there, {user?.name || 'Bestie'}! 👋</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <Link 
            to="/profile" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            <User size={16} className="mr-3" />
            <span>My Profile</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            <ShoppingBag size={16} className="mr-3" />
            <span>My Orders</span>
          </Link>
          
          <Link 
            to="/wishlist" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            <Heart size={16} className="mr-3" />
            <span>Wishlist</span>
          </Link>
          
          <button 
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100 mt-1"
          >
            <LogOut size={16} className="mr-3" />
            <span>👋 Log Out & Miss the Vibe?</span>
          </button>
        </>
      ) : (
        <div className="px-4 py-3 text-center">
          <p className="text-sm font-medium text-gray-900 mb-2">Join the Drip Club!</p>
          <button 
            onClick={onClose}
            className="w-full py-2 bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Sign In / Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;