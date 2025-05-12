import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <Heart size={64} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start adding items you love!</p>
            <Link 
              to="/shop"
              className="inline-block px-6 py-3 bg-[#00D2C3] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard 
              key={item.id} 
              product={item} 
              showSizeSelector={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage