import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-orange-600" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-sm font-medium">
                Premium Quality Nails
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Glamorous Nails
              <span className="block mt-2">In Seconds</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
              Transform your look instantly with our premium stick-on nails.
              Salon-quality designs that last for weeks, no appointment needed.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToProducts}
                className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-7 py-4 md:px-8 md:py-5 text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={scrollToProducts}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-7 py-4 md:px-8 md:py-5 text-base md:text-lg transition-all duration-300 bg-transparent"
              >
                View Collection
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  100+
                </div>
                <div className="text-white/80 text-xs md:text-sm mt-1">
                  Designs
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  2 Weeks
                </div>
                <div className="text-white/80 text-xs md:text-sm mt-1">
                  Lasting
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  5 Min
                </div>
                <div className="text-white/80 text-xs md:text-sm mt-1">
                  Application
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto md:max-w-none transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
                alt="Beautiful stick-on nails"
                className="w-full h-full max-h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm md:text-base">
                    4.9/5.0
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Customer Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
