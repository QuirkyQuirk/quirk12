import React from 'react';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { useWishlist } from '../contexts/WishlistContext';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useCheckout();
  const { totalWishlistItems } = useWishlist();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00D2C3] to-[#00D2C3] dark:from-[#FF2E93] dark:to-[#00D2C3]">
            QUIRKLO
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-[#00D2C3] transition-colors">
            New In
          </Link>
          <Link to="/shop" className="hover:text-[#00D2C3] transition-colors">
            🛍️ Shop
          </Link>
          <Link to="/" className="hover:text-[#00D2C3] transition-colors">
            Tops
          </Link>
          <Link to="/" className="hover:text-[#00D2C3] transition-colors">
            Bottoms
          </Link>
          <Link to="/" className="hover:text-[#00D2C3] transition-colors">
            Sale
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Heart size={22} />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00D2C3] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => isAuthenticated ? setShowUserMenu(!showUserMenu) : openAuthModal()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User size={22} />
            </button>
            
            {showUserMenu && isAuthenticated && (
              <UserMenu onClose={() => setShowUserMenu(false)} />
            )}
          </div>
          
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00D2C3] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;