import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [danhSachSach, setDanhSachSach] = useState([]);
  const [tuKhoa, setTuKhoa] = useState('');
  const [theLoaiChon, setTheLoaiChon] = useState('Tất cả');

  // --- 1. LOGIC BANNER SLIDE (SỬ DỤNG ẢNH TRONG PUBLIC/IMAGES) ---
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000); // Tự động chuyển sau 4 giây
    return () => clearInterval(timer);
  }, [banners.length]);

  // --- 2. LẤY DỮ LIỆU SÁCH TỪ BACKEND ---
  useEffect(() => {
    axios.get("http://localhost:8080/api/sach")
      .then(res => setDanhSachSach(res.data))
      .catch(err => console.error("Lỗi kết nối API:", err));
  }, []);

  // --- 3. LOGIC LỌC SÁCH THEO TÊN/TÁC GIẢ VÀ THỂ LOẠI ---
  const sachLoc = danhSachSach.filter(sach => {
    const khopTen = sach.tenSach.toLowerCase().includes(tuKhoa.toLowerCase());
    const khopTheLoai = theLoaiChon === 'Tất cả' || sach.theLoai === theLoaiChon;
    return khopTen && khopTheLoai;
  });

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

      {/* PHẦN BANNER SLIDE */}
      <div style={{ padding: '20px 10%' }}>
        <div style={{
          width: '100%',
          height: '350px',
          borderRadius: '15px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <img
            src={banners[currentBanner]}
            alt="Banner khuyến mãi"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '1s ease-in-out' }}
          />
          {/* Chấm điều hướng banner */}
          <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
            {banners.map((_, i) => (
              <div key={i} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                backgroundColor: currentBanner === i ? '#3498db' : 'white',
                cursor: 'pointer'
              }} onClick={() => setCurrentBanner(i)} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', padding: '0 10% 40px', gap: '30px' }}>

        {/* SIDEBAR BÊN TRÁI: Lọc theo thể loại */}
        <div style={{ width: '250px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', color: '#2c3e50' }}>Thể Loại</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
            {['Tất cả', 'Công nghệ phần mềm', 'Kinh tế', 'Văn học', 'Kỹ năng'].map(tl => (
              <li key={tl}
                  onClick={() => setTheLoaiChon(tl)}
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    backgroundColor: theLoaiChon === tl ? '#3498db' : 'transparent',
                    color: theLoaiChon === tl ? 'white' : '#2c3e50',
                    fontWeight: theLoaiChon === tl ? 'bold' : 'normal',
                    transition: '0.3s',
                    marginBottom: '5px'
                  }}>
                {tl}
              </li>
            ))}
          </ul>
        </div>

        {/* NỘI DUNG CHÍNH: Tìm kiếm và Danh sách sách */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="🔍 Tìm tên sách hoặc tác giả..."
              style={{
                width: '100%',
                padding: '15px 25px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                fontSize: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                outline: 'none'
              }}
              onChange={(e) => setTuKhoa(e.target.value)}
            />
          </div>

          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
            {theLoaiChon === 'Tất cả' ? '📚 Danh Sách Sách' : `📂 Thể loại: ${theLoaiChon}`}
          </h3>

          {sachLoc.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '25px'
            }}>
              {sachLoc.map(sach => (
                <BookCard key={sach.id} sach={sach} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '50px', color: '#7f8c8d' }}>
              Không tìm thấy sách nào phù hợp rồi An ơi! 😅
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;