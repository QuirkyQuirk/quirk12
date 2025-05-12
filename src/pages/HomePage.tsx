import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/products/ProductGrid';
import { ShoppingBag, Star, Zap, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.coverr.co/videos/coverr-young-people-having-fun-in-the-city-5244/1080p.mp4" type="video/mp4" />
        </video>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-white px-4">
          <div className="text-center">
            {/* New Drop Badge */}
            <div className="inline-block mb-6 animate-bounce">
              <div className="bg-[#ff2d95] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                🔥 NEW DROP JUST LANDED
              </div>
            </div>
            
            {/* Main Tagline */}
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f0f0] to-[#ff2d95]">
                Quirk Chahiye Toh
              </span>
              <span className="block text-white">QUIRKLO</span>
            </h1>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#00f0f0] text-black rounded-full font-bold hover:scale-105 transition-transform"
              >
                Start the Drip 💧
              </button>
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Shop Now 🛍️
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div id="bestsellers" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            🔥 Trending Drip
          </h2>
          <ProductGrid />
        </div>
      </div>

      {/* Why QUIRKLO Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Why We're Different 💅
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "Meme-worthy Designs", desc: "Each piece tells a story 🎨" },
              { icon: Zap, title: "Limited Edition Drops", desc: "Once gone, gone forever ⚡" },
              { icon: ShoppingBag, title: "Campus-Worthy Looks", desc: "Stand out in style 🎓" },
              { icon: Users, title: "20,000+ Gen Z Fam", desc: "Join the vibe tribe 🤝" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#00f0f0] to-[#ff2d95] rounded-full flex items-center justify-center">
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Capture Section */}
      <div className="py-20 bg-gradient-to-r from-[#00f0f0] to-[#ff2d95]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Wanna be first in line for the next drop? 👀
          </h2>
          <p className="text-white mb-8">
            Get 10% off your first order + early access to new drops!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Drop your email bestie..."
              className="flex-1 px-6 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
              Send Me the Drip 🚀
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0f0] to-[#ff2d95]">
              QUIRKLO
            </h3>
            <p className="text-gray-400">Fashion that breaks the rules.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Collections</li>
              <li>Sale</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-gray-400">
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Twitter</li>
              <li>WhatsApp</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;