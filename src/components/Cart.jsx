import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    alert("Checkout functionality will be implemented with backend!");
  };

  // Safely compute total
  const total =
    typeof getCartTotal === "function"
      ? Number(getCartTotal()) || 0
      : 0;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-white/90 mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">
                  Add some beautiful nails to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-orange-50 rounded-xl p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex space-x-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-bold mt-1">
                          ${item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mt-2">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-white hover:bg-orange-100 text-orange-600 p-1 rounded-md transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-white hover:bg-orange-100 text-orange-600 p-1 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-red-500 hover:text-red-600 text-sm font-medium py-2 transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
