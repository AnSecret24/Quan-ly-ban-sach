import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/sach")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (sach) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === sach.id);

    if (index > -1) {
      cart[index].soLuong += 1;
    } else {
      cart.push({ ...sach, soLuong: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    alert(`Đã thêm "${sach.tenSach}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {books.map(sach => (
        <div key={sach.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <img src={sach.hinhAnh || 'https://via.placeholder.com/120x160'} alt={sach.tenSach} style={{ width: '120px', height: '160px', marginBottom: '10px' }} />
          <h4 style={{ margin: '10px 0' }}>{sach.tenSach}</h4>
          <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{sach.giaBan?.toLocaleString()} VNĐ</p>
          <button
            onClick={() => addToCart(sach)}
            style={{ background: '#27ae60', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;