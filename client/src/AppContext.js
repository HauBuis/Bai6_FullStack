import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi fetch API:", err));
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev
        .map((c) =>
          c.product.id === productId ? { ...c, quantity: newQty } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const categoryLabels = {
    Roses: "Hoa hồng",
    Hydrangea: "Hoa cẩm tú cầu",
    Lily: "Hoa ly",
    Tulips: "Hoa tulip",
    Lotus: "Hoa sen",
    General: "Chung",
  };

  const categories = Array.from(
    products.reduce((map, p) => {
      const cat = p.category || "General";
      map.set(cat, (map.get(cat) || 0) + 1);
      return map;
    }, new Map())
  ).map(([key, count]) => ({
    key,
    label: categoryLabels[key] || key,
    count,
  }));

  const getCategoryLabel = (key) => categoryLabels[key] || key;

  return (
    <AppContext.Provider value={{
      products,
      cartItems,
      addToCart,
      updateQuantity,
      categories,
      getCategoryLabel,
    }}>
      {children}
    </AppContext.Provider>
  );
};