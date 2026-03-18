import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [sach, setSach] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/sach/${id}`)
      .then(res => setSach(res.data))
      .catch(err => console.error("Không tìm thấy sách", err));
  }, [id]);

  // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG ---
  const addToCart = () => {
    // 1. Lấy danh sách giỏ hàng hiện tại từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Kiểm tra xem cuốn sách này đã có trong giỏ chưa
    const existingItemIndex = cart.findIndex(item => item.id === sach.id);

    if (existingItemIndex !== -1) {
      // Nếu có rồi, tăng số lượng lên 1
      cart[existingItemIndex].soLuong += 1;
    } else {
      // Nếu chưa có, thêm mới vào mảng với số lượng mặc định là 1
      cart.push({ ...sach, soLuong: 1 });
    }

    // 3. Lưu mảng mới trở lại localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 4. Phát sự kiện để Header (Navbar) nhận biết và cập nhật số lượng icon
    window.dispatchEvent(new Event("cart-updated"));

    alert(`Đã thêm "${sach.tenSach}" vào giỏ hàng thành công!`);
  };

  if (!sach) return <div style={{ padding: '50px' }}>Đang tải dữ liệu...</div>;

  return (
    <div style={{ padding: '50px', display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hiển thị ảnh bìa từ database nếu có, nếu không thì dùng placeholder */}
      <div style={{ flex: 1, height: '500px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <img
          src={sach.hinhAnh || 'https://via.placeholder.com/400x550'}
          alt={sach.tenSach}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ flex: 2 }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>← Quay lại trang chủ</Link>
        <h1 style={{ marginTop: '20px', color: '#2c3e50' }}>{sach.tenSach}</h1>
        <p style={{ fontSize: '18px' }}><strong>Tác giả:</strong> {sach.tacGia}</p>
        <h2 style={{ color: '#e74c3c', fontSize: '32px' }}>{sach.giaBan?.toLocaleString()} VNĐ</h2>

        <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Mô tả nội dung:</h4>
          <p style={{ lineHeight: '1.8', color: '#555' }}>{sach.moTa || "Đang cập nhật nội dung cho cuốn sách này..."}</p>
        </div>

        {/* PHẦN QUAN TRỌNG: Gán sự kiện onClick vào đây */}
        <button
          onClick={addToCart}
          style={{
            padding: '15px 40px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#219150'}
          onMouseOut={(e) => e.target.style.background = '#27ae60'}
        >
          🛒 Thêm vào giỏ hàng ngay
        </button>
      </div>
    </div>
  );
};

export default BookDetail;