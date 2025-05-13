import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ShoppingBag, Heart, ChevronRight, MessageCircle, Star, Shield, Truck, RotateCcw, Tag, Clock, ThumbsUp, BadgeCheck, CreditCard, Package, Smile } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const productImages = [product.image, '/product-alt1.jpg', '/product-alt2.jpg', '/product-alt3.jpg'];

  // Color scheme constants
  const theme = {
    primary: 'bg-gradient-to-r from-teal-400 to-blue-500',
    secondary: 'bg-gradient-to-r from-pink-400 to-purple-500',
    text: 'text-gray-900 dark:text-gray-100',
    bg: 'bg-white dark:bg-gray-900',
    cardBg: 'bg-gray-50 dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700'
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Welcome popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!product) {
    return (
      <div className={`min-h-screen ${theme.bg}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-24 text-center">
          <p className={`text-xl ${theme.text}`}>Product not found 😢</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <Navbar />

      {/* Sticky Promo Bar */}
      <div className={`${theme.primary} py-2 text-center text-sm font-bold sticky top-16 z-40 mt-16`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 text-white">
          <Clock size={16} />
          <span>FLASH SALE: {formatTime(timeLeft)} LEFT!</span>
          <span>USE CODE: <strong>DRIP24</strong> FOR 15% OFF</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className={`rounded-xl overflow-hidden mb-4 border ${theme.border}`}
              onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
            >
              {productImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Product View ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${activeImageIndex === index
                    ? 'border-teal-400 scale-105'
                    : `${theme.border} hover:border-teal-300`
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: BadgeCheck, text: 'Authentic', subtext: 'Quality Guaranteed' },
                { icon: Shield, text: 'Secure', subtext: '256-bit SSL' },
                { icon: Package, text: 'Free Shipping', subtext: 'Worldwide' }
              ].map((badge, index) => (
                <div key={index} className={`${theme.cardBg} p-3 rounded-lg text-center flex flex-col items-center`}>
                  <badge.icon size={24} className="mb-2 text-teal-400" />
                  <p className={`font-medium ${theme.text}`}>{badge.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{badge.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={theme.text}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Product Details */}
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${theme.text}`}>{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-3xl font-bold ${theme.primary} bg-clip-text text-transparent`}>
                  ${product.price}
                </span>
                <span className="line-through text-gray-500">${(product.price * 1.4).toFixed(2)}</span>
                <span className="text-green-500">30% OFF</span>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      className={`py-3 rounded-lg font-medium transition-colors ${selectedSize === size
                        ? 'bg-teal-400 text-white'
                        : `${theme.border} hover:border-teal-300 ${theme.text}`
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${theme.primary} text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-8 shadow-lg hover:shadow-teal-200/30 dark:hover:shadow-teal-800/30`}
                onClick={() => addToCart(product, 1, selectedSize)}
              >
                <ShoppingBag size={20} />
                Add to Cart - ${product.price}
              </motion.button>

              {/* Payment Options */}
              <div className={`${theme.cardBg} p-6 rounded-xl mb-8 border ${theme.border}`}>
                <h4 className={`font-semibold mb-4 ${theme.text}`}>Secure Payment Options</h4>
                <div className="grid grid-cols-4 gap-4">
                  {['visa', 'mastercard', 'paytm', 'phonepe', 'google-pay', 'apple-pay', 'cod', 'upi'].map((method) => (
                    <div key={method} className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-700">
                      <img
                        src={`/${method}.svg`}
                        alt={method}
                        className="h-8 object-contain mb-2 opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                        {method.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-teal-500">
                    <CreditCard size={18} />
                    <span>256-bit SSL Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-500">
                    <Shield size={18} />
                    <span>PCI-DSS Compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className={`mt-12 ${theme.cardBg} p-8 rounded-xl border ${theme.border}`}>
          <h3 className={`text-2xl font-bold mb-8 ${theme.text}`}>Customer Experiences (4.9/5)</h3>
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
            {[1, 2, 3, 4].map((review) => (
              <div key={review} className={`min-w-[300px] ${theme.bg} p-6 rounded-xl border ${theme.border}`}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`/avatar${review}.jpg`}
                    alt={`Reviewer ${review}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-medium ${theme.text}`}>Sarah J.</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-gray-600 dark:text-gray-300 mb-4`}>
                  "Absolutely love this product! The quality exceeded my expectations. Perfect fit and super comfortable."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ThumbsUp size={16} />
                  <span>12 people found this helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Assurance Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Shield,
              title: "Secure Checkout",
              content: "Your transactions are protected with bank-grade security",
              color: "text-teal-400"
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              content: "15-day hassle-free return policy",
              color: "text-pink-400"
            },
            {
              icon: Smile,
              title: "Satisfaction Guaranteed",
              content: "30-day money back guarantee",
              color: "text-teal-400"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`${theme.cardBg} p-6 rounded-xl border ${theme.border}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <feature.icon size={32} className={feature.color} />
                <h4 className={`text-xl font-bold ${theme.text}`}>{feature.title}</h4>
              </div>
              <p className={`text-gray-600 dark:text-gray-400`}>{feature.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${theme.bg} p-8 rounded-xl max-w-md w-full mx-4 border ${theme.border}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Tag size={32} className="text-teal-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Welcome! 🎉</h3>
                <p className={`text-gray-600 dark:text-gray-300 mb-4`}>
                  Enjoy <strong>20% OFF</strong> your first purchase with code:
                </p>
                <div className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6`}>
                  <span className="text-2xl font-bold text-teal-400">WELCOME20</span>
                </div>
                <button
                  className={`w-full py-3 ${theme.primary} text-white rounded-xl font-bold hover:opacity-90 transition-opacity`}
                  onClick={() => setShowWelcomePopup(false)}
                >
                  Start Shopping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;

// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import { ShoppingBag, Heart, ChevronRight, MessageCircle, Star, Shield, Truck, RotateCcw } from 'lucide-react';
// import { getProductById } from '../data/products';
// import { useCart } from '../contexts/CartContext';
// import Navbar from '../components/Navbar';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const ProductPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const product = getProductById(id || '');
//   const { addToCart } = useCart();
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
//   const viewers = Math.floor(Math.random() * 10) + 3; // Random number between 3-12
//   const recentBuyers = Math.floor(Math.random() * 50) + 30; // Random number between 30-79

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-black">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 pt-24 text-center text-white">
//           <p className="text-xl">Product not found 😢</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       <Navbar />

//       {/* Breadcrumbs */}
//       <div className="bg-gray-900 py-4 mt-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center text-sm text-gray-400">
//             <Link to="/" className="hover:text-white transition-colors">Home</Link>
//             <ChevronRight size={16} className="mx-2" />
//             <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
//             <ChevronRight size={16} className="mx-2" />
//             <span className="text-white">{product.name}</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <div className="relative">
//             <Swiper
//               modules={[Navigation, Pagination]}
//               navigation
//               pagination={{ clickable: true }}
//               className="rounded-2xl overflow-hidden aspect-square"
//             >
//               <SwiperSlide>
//                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//               </SwiperSlide>
//               {/* Additional images would go here */}
//             </Swiper>

//             {/* Floating badges */}
//             <div className="absolute top-4 left-4 z-10">
//               <span className="bg-[#ff2d95] text-white px-3 py-1 rounded-full text-sm font-medium">
//                 🔥 Trending Now
//               </span>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="text-white">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

//               {/* Social Proof */}
//               <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
//                 <span>{viewers} people viewing</span>
//                 <span>{recentBuyers} bought in last 24h</span>
//               </div>

//               {/* Price */}
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="text-3xl font-bold">${product.price}</span>
//                 <span className="text-[#00f0f0] text-sm font-medium">Free Shipping 🚀</span>
//               </div>

//               {/* Description */}
//               <p className="text-gray-400 mb-6">
//                 Swag level 200% 💥<br />
//                 Wearing this may attract compliments from strangers 😎
//               </p>

//               {/* Size Selection */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium">Select Size</span>
//                   <button
//                     onClick={() => setShowSizeChart(!showSizeChart)}
//                     className="text-sm text-[#00f0f0] hover:underline"
//                   >
//                     Size Chart
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-5 gap-2">
//                   {sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`py-3 rounded-lg font-medium transition-colors ${selectedSize === size
//                           ? 'bg-white text-black'
//                           : 'border border-gray-700 hover:border-white'
//                         }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Model is 5'10" wearing size L
//                 </p>
//               </div>

//               {/* Quantity */}
//               <div className="mb-6">
//                 <span className="font-medium mb-2 block">Quantity</span>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
//                   >
//                     -
//                   </button>
//                   <span className="w-12 text-center">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Add to Cart */}
//               <div className="flex gap-4 mb-8">
//                 <button
//                   onClick={() => addToCart(product)}
//                   className="flex-1 bg-gradient-to-r from-[#00f0f0] to-[#ff2d95] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
//                 >
//                   <ShoppingBag size={20} />
//                   Add Vibe to Cart
//                 </button>
//                 <button className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-lg hover:border-white transition-colors">
//                   <Heart size={20} />
//                 </button>
//               </div>

//               {/* Trust Badges */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 {[
//                   { icon: Shield, text: "✅ Verified Product" },
//                   { icon: Truck, text: "🚚 Ships in 3-5 Days" },
//                   { icon: RotateCcw, text: "↩️ Easy 7-day Return" },
//                   { icon: MessageCircle, text: "💬 24/7 Support" }
//                 ].map((badge, index) => (
//                   <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
//                     <badge.icon size={16} />
//                     <span>{badge.text}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Customer Review */}
//               <div className="bg-gray-900 rounded-xl p-6">
//                 <div className="flex items-start gap-4">
//                   <img
//                     src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
//                     alt="Customer"
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <div className="flex items-center gap-1 mb-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
//                       ))}
//                     </div>
//                     <p className="text-white font-medium mb-1">Bro... this tee got me 3 compliments in one day 💯</p>
//                     <p className="text-sm text-gray-400">@dripking · 2 days ago</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;