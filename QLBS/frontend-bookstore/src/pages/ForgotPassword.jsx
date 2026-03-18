import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail } from 'lucide-react'; // Sử dụng icon đồng bộ

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Đổi mật khẩu
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // Xử lý gửi mã xác nhận về Email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", { email });
      alert("Mã xác nhận đã được gửi về Email của An! Hãy kiểm tra hòm thư nhé.");
      setStep(2);
    } catch (error) {
      alert("Email này chưa được đăng ký trên hệ thống An ơi!");
    }
  };

  // Xử lý đặt lại mật khẩu mới
  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
        alert("Mật khẩu mới phải từ 8 ký tự trở lên theo quy định MS1.4!");
        return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", { email, otp, newPassword });
      alert("Chúc mừng An đã lấy lại mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      alert("Mã xác nhận không đúng hoặc đã hết hạn!");
    }
  };

  const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8f9fa' };
  const inputStyle = { width: '100%', padding: '12px 40px 12px 12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={containerStyle} className="auth-container">
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '100%', maxWidth: '400px', textAlign: 'center' }} className="auth-form-box">
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Khôi Phục Mật Khẩu</h2>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '20px' }}>Nhập email để nhận mã xác thực OTP.</p>
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <input type="email" placeholder="Email của bạn" style={inputStyle} onChange={e => setEmail(e.target.value)} required />
              <Mail size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#95a5a6' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '6px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>GỬI MÃ XÁC THỰC</button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                <input type="text" placeholder="Nhập mã OTP 6 số" style={inputStyle} onChange={e => setOtp(e.target.value)} required />
            </div>
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Mật khẩu mới (Tối thiểu 8 ký tự)"
                style={inputStyle}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <div onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer', color: '#95a5a6' }}>
                {/* Fix lỗi hiện 2 icon bằng toán tử ba ngôi như An muốn */}
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '6px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>XÁC NHẬN ĐỔI MẬT KHẨU</button>
          </form>
        )}
        <div style={{ marginTop: '20px' }}>
          <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontSize: '14px' }}>Quay lại Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;