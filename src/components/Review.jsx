import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Thompson",
    message:
      "Absolutely love these nails! They look salon-made and lasted over 10 days. I get compliments everywhere!",
    rating: 5,
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Emily Carter",
    message:
      "The designs are stunning and the application is so easy. Saved me so much time!",
    rating: 5,
    avatar:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Grace Miller",
    message:
      "Beautiful colors and great quality. Definitely buying more soon!",
    rating: 4,
    avatar:
      "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const Review = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const slider = scrollRef.current;
    if (slider) {
      const distance = 350;
      slider.scrollBy({
        left: direction === "left" ? -distance : distance,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <p className="text-gray-600 mt-2">
            Real experiences from real customers
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 text-gray-800 hover:text-white p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 text-gray-800 hover:text-white p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:-translate-x-4"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-96 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <div className="flex text-orange-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-500" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm">
                  {review.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
