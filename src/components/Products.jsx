import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollContainerRef = useRef(null);

  const { addToCart } = useCart();
  const { products, categories, updateProduct, addProduct, deleteProduct } =
    useProducts();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      console.log("Added to cart:", product.name);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const toggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAdminLogin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }
    const pwd = window.prompt("Enter admin password:");
    if (pwd === "admin123") {
      setIsAdmin(true);
    } else if (pwd !== null) {
      alert("Incorrect password");
    }
  };

  const handleFieldChange = (id, field, value) => {
    if (field === "price") {
      const num = parseFloat(value);
      updateProduct(id, { [field]: isNaN(num) ? 0 : num });
    } else {
      updateProduct(id, { [field]: value });
    }
  };

  const handleAddNewProduct = () => {
    addProduct({
      name: "New Product",
      price: 0,
      image: "",
      description: "",
      category: categories[1] || "Classic",
    });
  };

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-orange-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Admin toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Our Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover our stunning range of stick-on nails. Each design is
              crafted with precision and passion.
            </p>
          </div>
          <button
            onClick={handleAdminLogin}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              isAdmin
                ? "bg-red-50 text-red-600 border-red-300"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {isAdmin ? "Exit Admin Mode" : "Admin Login"}
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-4">
          <div className="inline-flex space-x-2 bg-white p-2 rounded-full shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Horizontal Scroll */}
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

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full transition-transform duration-300 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedProducts.has(product.id)
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Admin: Edit Products
              </h3>
              <Button
                onClick={handleAddNewProduct}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) =>
                          handleFieldChange(p.id, "name", e.target.value)
                        }
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="w-28">
                      <label className="block text-xs font-medium text-gray-500">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={p.price}
                        onChange={(e) =>
                          handleFieldChange(p.id, "price", e.target.value)
                        }
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="w-40">
                      <label className="block text-xs font-medium text-gray-500">
                        Category
                      </label>
                      <select
                        value={p.category}
                        onChange={(e) =>
                          handleFieldChange(p.id, "category", e.target.value)
                        }
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        {categories
                          .filter((c) => c !== "All")
                          .map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={p.image}
                      onChange={(e) =>
                        handleFieldChange(p.id, "image", e.target.value)
                      }
                      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Description
                    </label>
                    <textarea
                      value={p.description}
                      onChange={(e) =>
                        handleFieldChange(p.id, "description", e.target.value)
                      }
                      rows={2}
                      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="inline-flex items-center text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Note: Changes are only stored in the browser while the page is
              open (no backend yet).
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
