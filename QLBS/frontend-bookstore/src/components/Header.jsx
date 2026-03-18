import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartCount, setCartCount] = useState(0);

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const updateHeader = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.soLuong, 0);
      setCartCount(total);
    };

    updateHeader();
    window.addEventListener("storage", updateHeader);
    window.addEventListener("cart-updated", updateHeader);

    return () => {
      window.removeEventListener("storage", updateHeader);
      window.removeEventListener("cart-updated", updateHeader);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 10%',
      backgroundColor: '#2c3e50',
      color: 'white',
      minHeight: '60px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h2 style={{ margin: 0 }}>📚 Nhà Sách Của An</h2>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

        {user ? (
          <>
            {/* MENU ADMIN CHỈ HIỆN TRONG /admin */}
            {user.vaiTro === 'ADMIN' && isAdminPage && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/admin/dashboard">
                  <button style={{ padding: '8px 15px', background: '#f1c40f', color: '#2c3e50', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    📊 Thống kê
                  </button>
                </Link>

                <Link to="/admin">
                  <button style={{ padding: '8px 15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Quản lý kho
                  </button>
                </Link>

                <Link to="/admin/orders">
                  <button style={{ padding: '8px 15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Quản lý đơn hàng
                  </button>
                </Link>
              </div>
            )}

            <span>Chào, <strong>{user.hoTen}</strong></span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginLeft: '15px'
              }}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login">
              <button style={{
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                border: '1px solid white',
                background: 'transparent',
                color: 'white'
              }}>
                Đăng nhập
              </button>
            </Link>

            <Link to="/register">
              <button style={{
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: '#95a5a6',
                color: 'white',
                border: 'none'
              }}>
                Đăng ký
              </button>
            </Link>
          </div>
        )}

        {/* GIỎ HÀNG KHÔNG HIỆN TRONG ADMIN */}
        {(!user || user.vaiTro !== 'ADMIN') && (
          <Link to="/cart">
            <button style={{
              padding: '8px 15px',
              background: '#e67e22',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              🛒 Giỏ hàng ({cartCount})
            </button>
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Header;