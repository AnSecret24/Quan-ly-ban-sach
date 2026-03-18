import { useNavigate } from 'react-router-dom';

const BookCard = ({ sach }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.id === sach.id);

    if (index !== -1) {
      cart[index].soLuong += 1;
    } else {
      cart.push({
        ...sach,
        soLuong: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cart-updated"));

    alert(`Đã thêm "${sach.tenSach}" vào giỏ hàng thành công!`);
  };

  return (
    <div
      onClick={() => navigate(`/sach/${sach.id}`)}
      style={{
        background: 'white',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        height: '220px',
        marginBottom: '10px',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={sach.hinhAnh || 'https://via.placeholder.com/150x220?text=No+Cover'}
          alt={sach.tenSach}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div>
        <h4 style={{
          margin: '10px 0 5px',
          fontSize: '17px',
          color: '#2c3e50',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          height: '42px'
        }}>
          {sach.tenSach}
        </h4>

        <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '5px 0' }}>
          {sach.tacGia}
        </p>

        <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>
          {sach.giaBan?.toLocaleString('vi-VN')} VNĐ
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '12px',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🛒 Thêm vào giỏ
      </button>
    </div>
  );
};

export default BookCard;