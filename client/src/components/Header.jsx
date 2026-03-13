import React from "react";
import { useAppContext } from "../AppContext";

function Header({ onCartClick }) {
  const { cartItems } = useAppContext();

  return (
    <header className="header">
      <div className="header-content">
        <img src="http://localhost:5000/images/logo.jpg" alt="Flower Shop Logo" className="logo" />
        <h1>Flower Shop</h1>
        <button type="button" className="cart-info" onClick={onCartClick}>
          🛒 {cartItems.length}
        </button>
      </div>
    </header>
  );
}

export default Header;