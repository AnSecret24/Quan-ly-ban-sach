import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#2c3e50",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <h3>Admin Panel</h3>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/admin/dashboard" style={{ color: "white", textDecoration: "none" }}>
              📊 Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
              📚 Quản lý sách
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/admin/orders" style={{ color: "white", textDecoration: "none" }}>
              🧾 Quản lý đơn
            </Link>
          </li>

        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px",
          background: "#e74c3c",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px"
        }}
      >
        🚪 Đăng xuất
      </button>

    </div>
  );
}

export default AdminSidebar;