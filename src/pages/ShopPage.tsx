import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X, TrendingUp, ArrowDownUp, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/products/ProductGrid';

const categories = ['All', 'Tees', 'Oversized', 'Pop Culture', 'Meme Drops'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Neon', 'Turquoise', 'Pink'];
const sortOptions = [
  { icon: TrendingUp, label: 'Trending' },
  { icon: ArrowDownUp, label: 'Price: Low to High' },
  { icon: Clock, label: 'Latest' }
];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Trending');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  useEffect(() => {
    // Show promo after 2 seconds
    const timer = setTimeout(() => setShowPromo(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#00f0f0] to-[#ff2d95] py-20 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Drip Shop 💧
          </motion.h1>
          <motion.p
            className="text-white/90 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Cop the latest drops before they're gone! 🔥
          </motion.p>
        </div>
      </div>

      {/* Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#FF2E93] text-white text-center py-3 relative"
          >
            <p className="font-medium">
              💥 QUIRKLO DROP ALERT! Use code <span className="font-bold">STAYQUIRKY</span> for 10% OFF today only
            </p>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filters Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h2 className="text-white font-bold text-xl mb-6">Filters</h2>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${selectedSizes.includes(size)
                      ? 'bg-white text-black'
                      : 'text-white border border-gray-700 hover:border-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedColors.includes(color)
                      ? 'bg-white text-black'
                      : 'text-white border border-gray-700 hover:border-white'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full py-3 px-4 bg-gray-900 rounded-lg text-white font-medium flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              <span>Show Filters</span>
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-xl">
              {selectedCategory} Products
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00f0f0]"
              >
                {sortOptions.map(({ label }) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <ProductGrid />
            </motion.div>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-[#00f0f0] to-[#ff2d95] text-white rounded-full font-bold hover:scale-105 transition-transform">
              Load More Drip 💧
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-gray-900 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile filters content - same as sidebar */}
              {/* ... Copy the filters content from sidebar here ... */}

              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-3 bg-white text-black rounded-lg font-bold mt-6"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart (Mobile) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button className="w-12 h-12 bg-[#FF2E93] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
          <Sparkles size={24} />
        </button>
      </div>
    </div>
  );
};

export default ShopPage;