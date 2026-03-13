import React from "react";

function Categories({ categories, onSelect }) {
  const descriptions = {
    Roses: "Hoa hồng đỏ tươi, biểu tượng của tình yêu.",
    Hydrangea: "Hoa cẩm tú cầu đầy đặn với sắc màu dịu dàng.",
    Lily: "Hoa ly tinh khôi, thanh nhã cho mọi dịp.",
    Tulips: "Hoa tulip rực rỡ, tươi mới cho mỗi ngày.",
    Lotus: "Hoa sen thanh cao, nét đẹp Việt truyền thống.",
    General: "Các loại hoa đẹp và bó hoa đa dạng.",
  };

  return (
    <section className="category-section">
      <div className="page-intro">
        <h2>Danh mục sản phẩm</h2>
        <p>Khám phá các loại hoa theo danh mục để tìm bó hoa ưng ý.</p>
      </div>
      <div className="category-cards">
        {categories.map((c) => (
          <div
            key={c.key}
            className="category-card"
            onClick={() => onSelect && onSelect(c.key)}
          >
            <h3>{c.label}</h3>
            <p className="cat-desc">{descriptions[c.key]}</p>
            <p className="cat-count">{c.count} sản phẩm</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;