import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ShoppingBag, Heart, ChevronRight, MessageCircle, Star, Shield, Truck, RotateCcw } from 'lucide-react';
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
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const viewers = Math.floor(Math.random() * 10) + 3; // Random number between 3-12
  const recentBuyers = Math.floor(Math.random() * 50) + 30; // Random number between 30-79

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-24 text-center text-white">
          <p className="text-xl">Product not found 😢</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-gray-900 py-4 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="rounded-2xl overflow-hidden aspect-square"
            >
              <SwiperSlide>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </SwiperSlide>
              {/* Additional images would go here */}
            </Swiper>

            {/* Floating badges */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#ff2d95] text-white px-3 py-1 rounded-full text-sm font-medium">
                🔥 Trending Now
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <span>{viewers} people viewing</span>
                <span>{recentBuyers} bought in last 24h</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-[#00f0f0] text-sm font-medium">Free Shipping 🚀</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6">
                Swag level 200% 💥<br />
                Wearing this may attract compliments from strangers 😎
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Select Size</span>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-sm text-[#00f0f0] hover:underline"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg font-medium transition-colors ${selectedSize === size
                          ? 'bg-white text-black'
                          : 'border border-gray-700 hover:border-white'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Model is 5'10" wearing size L
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-medium mb-2 block">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-gradient-to-r from-[#00f0f0] to-[#ff2d95] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag size={20} />
                  Add Vibe to Cart
                </button>
                <button className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-lg hover:border-white transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: "✅ Verified Product" },
                  { icon: Truck, text: "🚚 Ships in 3-5 Days" },
                  { icon: RotateCcw, text: "↩️ Easy 7-day Return" },
                  { icon: MessageCircle, text: "💬 24/7 Support" }
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <badge.icon size={16} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Customer Review */}
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                    alt="Customer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white font-medium mb-1">Bro... this tee got me 3 compliments in one day 💯</p>
                    <p className="text-sm text-gray-400">@dripking · 2 days ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;