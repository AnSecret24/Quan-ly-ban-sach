import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <AdminSidebar />

      <main style={{ flex: 1, padding: "20px", background: "#f5f6fa" }}>
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;