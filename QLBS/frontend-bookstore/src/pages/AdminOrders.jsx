import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // Hàm lấy danh sách đơn hàng từ MySQL thông qua API Spring Boot
  const fetchOrders = () => {
    axios.get("http://localhost:8080/api/don-hang")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Lỗi lấy đơn hàng:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm cập nhật trạng thái đơn hàng (Duyệt/Hủy)
  const handleUpdateStatus = (id, newStatus) => {
    // API này tương ứng với @PutMapping("/{id}/trang-thai") ở Backend An đã viết
    axios.put(`http://localhost:8080/api/don-hang/${id}/trang-thai?trangThai=${newStatus}`)
      .then(() => {
        alert(`Đã cập nhật đơn hàng thành: ${newStatus}`);
        fetchOrders(); // Load lại dữ liệu mới nhất
      })
      .catch(err => alert("Lỗi cập nhật: " + err));
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>📦 Quản Lý Đơn Hàng</h2>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ background: '#34495e', color: 'white' }}>
            <th style={{ padding: '12px' }}>Mã ĐH</th>
            <th>Khách Hàng</th>
            <th>Email</th>
            <th>Tổng Tiền</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="7" style={{ padding: '20px' }}>Chưa có đơn hàng nào An ơi!</td></tr>
          ) : (
            orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{order.id}</td>
                <td>{order.hoTen}</td>
                <td>{order.email}</td>
                <td style={{ fontWeight: 'bold' }}>{order.tongTien?.toLocaleString()} VNĐ</td>
                <td>{new Date(order.ngayDat).toLocaleString('vi-VN')}</td>
                <td style={{
                  fontWeight: 'bold',
                  color: order.trangThai === 'Đã Duyệt' ? '#27ae60' : (order.trangThai === 'Đã Hủy' ? '#e74c3c' : '#f39c12')
                }}>
                  {order.trangThai}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'Đã Duyệt')}
                    style={{ marginRight: '10px', color: 'green', cursor: 'pointer', border: '1px solid green', padding: '5px' }}
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'Đã Hủy')}
                    style={{ color: 'red', cursor: 'pointer', border: '1px solid red', padding: '5px' }}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;