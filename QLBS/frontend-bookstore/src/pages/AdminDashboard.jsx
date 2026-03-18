import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ doanhThu: 0, tongDon: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Gọi song song các API để tối ưu tốc độ
        const [resDT, resTong, resOrders] = await Promise.all([
          axios.get("http://localhost:8080/api/don-hang/thong-ke/doanh-thu"),
          axios.get("http://localhost:8080/api/don-hang/thong-ke/tong-don"),
          axios.get("http://localhost:8080/api/don-hang") // Lấy danh sách để hiện đơn hàng mới nhất
        ]);

        setStats({ doanhThu: resDT.data, tongDon: resTong.data });
        // Lấy 5 đơn hàng gần nhất để hiển thị
        setRecentOrders(resOrders.data.slice(-5).reverse());
      } catch (err) {
        console.error("Lỗi lấy dữ liệu thống kê:", err);
      }
    };
    fetchStats();
  }, []);

  // Cấu hình dữ liệu cho Biểu đồ
  const chartData = {
    labels: ['Doanh thu hiện tại'],
    datasets: [
      {
        label: 'VND',
        data: [stats.doanhThu],
        backgroundColor: '#27ae60',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Biểu đồ tăng trưởng doanh thu' },
    },
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '30px', color: '#2c3e50', fontWeight: 'bold' }}>📊 Báo Cáo Kinh Doanh</h2>

      {/* --- Thẻ Thống Kê Nhanh --- */}
      <div style={{ display: 'flex', gap: '25px', marginBottom: '40px' }}>
        <div style={cardStyle('#27ae60')}>
          <h3 style={labelStyle}>Tổng Doanh Thu</h3>
          <p style={valueStyle}>{stats.doanhThu.toLocaleString('vi-VN')} VNĐ</p>
        </div>

        <div style={cardStyle('#2980b9')}>
          <h3 style={labelStyle}>Số Đơn Hàng</h3>
          <p style={valueStyle}>{stats.tongDon} Đơn</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* --- Phần Biểu Đồ --- */}
        <div style={sectionBoxStyle}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* --- Phần Đơn Hàng Gần Đây --- */}
        <div style={sectionBoxStyle}>
          <h3 style={{ marginBottom: '15px', color: '#34495e' }}>🛒 Đơn hàng mới nhất</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>#{order.id}</td>
                  <td>{order.hoTen}</td>
                  <td>{order.tongTien?.toLocaleString()}đ</td>
                  <td style={{ color: order.trangThai === 'Đã Duyệt' ? '#27ae60' : '#e67e22' }}>
                    {order.trangThai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const cardStyle = (bgColor) => ({
  flex: 1,
  padding: '30px',
  borderRadius: '15px',
  color: 'white',
  background: bgColor,
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  textAlign: 'center',
});

const labelStyle = { margin: '0 0 10px 0', fontSize: '14px', textTransform: 'uppercase', opacity: 0.9 };
const valueStyle = { fontSize: '28px', fontWeight: 'bold', margin: 0 };

const sectionBoxStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
};

export default AdminDashboard;