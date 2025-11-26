import React from "react";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Hero />
          <Products />
          <Cart />
          <Contact />
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
