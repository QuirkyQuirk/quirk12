import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Navbar from '../components/Navbar';
import { User, Package, Heart, CreditCard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('profile');
  const [isEditing, setIsEditing] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    avatar: user?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={userDetails.avatar}
                    alt={userDetails.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-[#FF2E93] text-white p-2 rounded-full">
                      <User size={16} />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {userDetails.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{userDetails.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'profile'
                      ? 'bg-[#FF2E93] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <User size={20} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'orders'
                      ? 'bg-[#FF2E93] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Package size={20} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'wishlist'
                      ? 'bg-[#FF2E93] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart size={20} />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'payment'
                      ? 'bg-[#FF2E93] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <CreditCard size={20} />
                  Payment Methods
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[#FF2E93] hover:underline"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={userDetails.phone}
                            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            value={userDetails.address}
                            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-6 px-6 py-2 bg-[#FF2E93] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h4>
                        <p className="text-gray-900 dark:text-white">{userDetails.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                        <p className="text-gray-900 dark:text-white">{userDetails.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                        <p className="text-gray-900 dark:text-white">{userDetails.phone || 'Not set'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                        <p className="text-gray-900 dark:text-white">{userDetails.address || 'Not set'}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Order History
                  </h3>
                  <div className="space-y-4">
                    {/* Sample order - you would map through actual orders here */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Order #12345</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Delivered
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src="https://images.pexels.com/photos/8484308/pexels-photo-8484308.jpeg"
                          alt="Product"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Neon Dream Tee</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: 1</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="font-medium text-gray-900 dark:text-white">$39.99</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">March 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    My Wishlist ({wishlistItems.length} items)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-[#FF2E93] font-medium">${item.price}</p>
                          <button className="mt-2 text-sm text-[#FF2E93] hover:underline">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Methods
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              •••• •••• •••• 4242
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                    <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-[#FF2E93] hover:text-[#FF2E93] transition-colors">
                      + Add New Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;