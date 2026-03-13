import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

import Categories from "./Categories";
import Cart from "./Cart";
import Contact from "./Contact";

function Home() {
  const { products, addToCart } = useAppContext();
  const [currentPage, setCurrentPage] = useState("Home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectPage = (page) => {
    setCurrentPage(page);
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

  const HomeContent = () => (
    <section className="home-intro">
      <h2>Chào mừng bạn đến với Cửa hàng Hoa</h2>
      <p>
        Tại cửa hàng hoa của chúng tôi, mỗi ngày đều chọn lọc những bông hoa tươi
        nhất. Hãy duyệt qua các mục, thêm sản phẩm yêu thích vào giỏ hoặc liên hệ chúng tôi để
        đặt bó hoa theo yêu cầu. Sự hài lòng của bạn là ưu tiên hàng đầu.
      </p>
      <ProductList products={products} onAdd={addToCart} />
    </section>
  );

  const ProductsContent = () => {
    const filtered = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    return (
      <section className="product-view">
        {selectedCategory && (
          <div className="product-view-header">
            <div>
              <h2>Danh mục: {getCategoryLabel(selectedCategory)}</h2>
              <p>Hiển thị {filtered.length} sản phẩm</p>
            </div>
            <button
              className="clear-filter"
              onClick={() => setSelectedCategory(null)}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        <ProductList products={filtered} onAdd={addToCart} />
      </section>
    );
  };

  const Pages = {
    Home: HomeContent,
    Products: ProductsContent,
    Categories: () => (
      <Categories
        categories={categories}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage("Products");
        }}
      />
    ),
    Cart: Cart,
    Contact: Contact,
  };

  const Content = Pages[currentPage] || HomeContent;

  return (
    <div className="container">
      <Header onCartClick={() => selectPage("Cart")} />
      <div className="main-content">
        <Sidebar
          currentPage={currentPage}
          onSelect={(page) => {
            // clear category filter when directly selecting Products
            if (page === "Products") setSelectedCategory(null);
            selectPage(page);
          }}
        />
        <Content />
      </div>
    </div>
  );
}

export default Home;