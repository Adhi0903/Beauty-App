import React, { createContext, useContext, useState, useMemo } from "react";
import { products as initialProducts, categories } from "../mock";

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (id, fields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fields } : p))
    );
  };

  const addProduct = (product) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0);
      return [
        ...prev,
        {
          id: maxId + 1,
          name: "",
          price: 0,
          image: "",
          description: "",
          category: "Classic",
          ...product,
        },
      ];
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const value = useMemo(
    () => ({
      products,
      categories,
      updateProduct,
      addProduct,
      deleteProduct,
    }),
    [products]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
};
