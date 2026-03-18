import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  // Lấy thông tin user mới nhất từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // 1. Nếu chưa đăng nhập -> Chuyển hướng về Login
  if (!user) {
    // replace: true giúp xóa trang hiện tại khỏi lịch sử trình duyệt,
    // tránh việc bấm nút 'Back' quay lại được trang cấm.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Nếu trang yêu cầu quyền ADMIN mà user chỉ là USER
  if (isAdmin && user.vaiTro !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  // 3. Nếu thỏa mãn mọi điều kiện -> Cho phép truy cập nội dung
  return children;
};

export default ProtectedRoute;