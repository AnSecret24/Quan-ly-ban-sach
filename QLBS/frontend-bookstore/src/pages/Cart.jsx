import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Lấy dữ liệu giỏ hàng khi trang được tải
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Hàm lưu giỏ hàng vào localStorage và đồng bộ giao diện
  const saveAndSyncCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    // Phát sự kiện để Navbar/Header cập nhật số lượng icon giỏ hàng
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Chức năng tăng/giảm số lượng
  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.soLuong + delta;

        // Kiểm tra tồn kho (nếu Backend có trả về soLuongKho)
        if (delta > 0 && item.soLuongKho && newQty > item.soLuongKho) {
          alert(`Chỉ còn ${item.soLuongKho} quyển trong kho thôi An ơi!`);
          return item;
        }

        return { ...item, soLuong: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    saveAndSyncCart(updatedCart);
  };

  // Chức năng xóa sản phẩm khỏi giỏ
  const removeItem = (id) => {
    if (window.confirm("An có chắc muốn bỏ cuốn sách này khỏi giỏ?")) {
      const updatedCart = cartItems.filter(item => item.id !== id);
      saveAndSyncCart(updatedCart);
    }
  };

  const tinhTongTien = () => {
    return cartItems.reduce((sum, item) => sum + (item.giaBan * item.soLuong), 0);
  };

  // Chức năng thanh toán kết nối Backend Spring Boot
  const handleThanhToan = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thanh toán nhé An!");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    const orderData = {
      hoTen: user.hoTen,
      email: user.email,
      tongTien: parseFloat(tinhTongTien().toFixed(2)),
      trangThai: "Chờ xét duyệt"
    };

    axios.post("http://localhost:8080/api/don-hang", orderData)
      .then(() => {
        alert("Đặt hàng thành công! Dữ liệu đã lưu vào MySQL.");
        saveAndSyncCart([]); // Xóa sạch giỏ hàng sau khi mua thành công
        navigate("/");
      })
      .catch(err => {
        console.error("Lỗi hệ thống:", err);
        alert("Không thể gửi đơn hàng. An kiểm tra lại kết nối API nhé!");
      });
  };

  // Style cho nút bấm
  const btnStyle = {
    padding: '5px 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff'
  };

  return (
    <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Giỏ hàng của {user?.hoTen || "bạn"}</h2>
      <hr />
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Chưa có sách trong giỏ.</p>
      ) : (
        <>
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#f4f4f4' }}>
                <th style={{ padding: '10px' }}>Tên sách</th>
                <th style={{ textAlign: 'center' }}>Số lượng</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{item.tenSach}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={btnStyle}>-</button>
                      <span style={{ fontWeight: 'bold' }}>{item.soLuong}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={btnStyle}>+</button>
                    </div>
                  </td>
                  <td>{(item.giaBan * item.soLuong).toLocaleString()} VNĐ</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <h3>Tổng cộng: <span style={{ color: '#e74c3c' }}>{tinhTongTien().toLocaleString()} VNĐ</span></h3>
            <button
              onClick={handleThanhToan}
              style={{ padding: '15px 30px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              XÁC NHẬN THANH TOÁN
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;