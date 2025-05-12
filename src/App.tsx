import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import Cart from './components/cart/Cart';
import AuthModal from './components/authModal/AuthModal';
import CheckoutModal from './components/checkout/CheckoutModal';
import Notification from './components/Notification';
import { useNotification } from './contexts/NotificationContext';
import './styles/animations.css';

function App() {
  const { notification, hideNotification } = useNotification();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      <Cart />
      <AuthModal />
      <CheckoutModal />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
}

export default App