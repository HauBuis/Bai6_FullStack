import React from "react";
import { useAppContext } from "../AppContext";

function Cart() {
  const { cartItems, updateQuantity } = useAppContext();

  const format = (n) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(n);

  const total = cartItems.reduce(
    (sum, c) => sum + c.product.price * c.quantity,
    0
  );

  return (
    <section className="cart">
      <div className="page-intro">
        <h2>Giỏ hàng của bạn</h2>
        <p>Kiểm tra và cập nhật các sản phẩm trong giỏ hàng trước khi thanh toán.</p>
      </div>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Hình</th>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((c) => (
              <tr key={c.product.id}>
                <td>
                  <img
                    src={`http://localhost:5000${c.product.image}`}
                    alt={c.product.name}
                    className="cart-thumb"
                  />
                </td>
                <td>{c.product.name}</td>
                <td>{format(c.product.price)}</td>
                <td>
                  <button
                    onClick={() =>
                      updateQuantity(c.product.id, c.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="qty">{c.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(c.product.id, c.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>{format(c.product.price * c.quantity)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right' }}>
                Tổng cộng:
              </td>
              <td>{format(total)}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  );
}

export default Cart;