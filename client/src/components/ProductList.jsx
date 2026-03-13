import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onAdd }) {
  return (
    <section className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </section>
  );
}

export default ProductList;