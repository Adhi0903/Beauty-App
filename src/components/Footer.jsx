import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">SpoilMe</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-white/90">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-white" />
            <span>© 2025 SpoilMe. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;