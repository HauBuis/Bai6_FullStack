import React from "react";

// Sidebar receives current page and a callback to change page
function Sidebar({ currentPage, onSelect }) {
  const items = [
    { key: "Home", label: "Trang chủ" },
    { key: "Products", label: "Sản phẩm" },
    { key: "Categories", label: "Danh mục" },
    { key: "Cart", label: "Giỏ hàng" },
    { key: "Contact", label: "Liên hệ" },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {items.map((item) => (
          <li
            key={item.key}
            className={currentPage === item.key ? "active" : ""}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;