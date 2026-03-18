import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; // Đảm bảo đã npm install lucide-react
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    matKhau: '',
    confirmPassword: ''
  });

  // State quản lý ẩn/hiện cho từng ô riêng biệt
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (formData.hoTen.trim().length < 5 || formData.hoTen.trim().length > 50) {
      tempErrors.hoTen = "Họ tên phải từ 5 - 50 ký tự bạn nhé!";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email không đúng định dạng (Ví dụ: an@email.com).";
    }
    if (formData.matKhau.length < 8) {
      tempErrors.matKhau = "Mật khẩu cần ít nhất 8 ký tự.";
    }
    if (formData.matKhau !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post("http://localhost:8080/api/auth/register", {
        hoTen: formData.hoTen.trim(),
        email: formData.email,
        matKhau: formData.matKhau,
        vaiTro: 'USER'
      })
      .then(() => {
        toast.success("🎉 Đăng ký thành công!");
        navigate("/login");
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setErrors({ email: err.response.data });
        } else {
          toast.error("Lỗi hệ thống, An kiểm tra lại Backend nhé!");
        }
      });
    }
  };

  const errorStyle = { color: '#e74c3c', fontSize: '12px', marginTop: '4px' };
  const inputStyle = (hasError) => ({
    padding: '12px',
    paddingRight: '45px', // Chừa chỗ cho icon
    borderRadius: '6px',
    border: hasError ? '2px solid #e74c3c' : '1px solid #ddd',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.3s'
  });

  // Style dùng chung cho nút icon
  const iconWrapperStyle = {
    position: 'absolute',
    right: '15px',
    top: '38px', // Căn chỉnh theo Label
    cursor: 'pointer',
    color: '#95a5a6',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }} className="auth-container">
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '100%', maxWidth: '450px' }} className="auth-form-box">
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>📝 Đăng Ký</h2>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Họ tên */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Họ và Tên:</label>
            <input type="text" placeholder="Nhập từ 5-50 ký tự" style={inputStyle(errors.hoTen)} onChange={e => setFormData({...formData, hoTen: e.target.value})} />
            {errors.hoTen && <div style={errorStyle}>{errors.hoTen}</div>}
          </div>

          {/* Email */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Email:</label>
            <input type="text" placeholder="Ví dụ: an@email.com" style={inputStyle(errors.email)} onChange={e => setFormData({...formData, email: e.target.value})} />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>

          {/* Mật khẩu */}
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Mật khẩu:</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Tối thiểu 8 ký tự"
              style={inputStyle(errors.matKhau)}
              onChange={e => setFormData({...formData, matKhau: e.target.value})}
            />
            <div onClick={() => setShowPass(!showPass)} style={iconWrapperStyle}>
              {/* Logic toán tử ba ngôi: Nếu showPass đúng thì hiện Eye, sai thì hiện EyeOff */}
              {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
            {errors.matKhau && <div style={errorStyle}>{errors.matKhau}</div>}
          </div>

          {/* Xác nhận mật khẩu */}
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Xác nhận mật khẩu:</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              style={inputStyle(errors.confirmPassword)}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
            <div onClick={() => setShowConfirm(!showConfirm)} style={iconWrapperStyle}>
              {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
            {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
          </div>

          <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            ĐĂNG KÝ NGAY
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#7f8c8d', textAlign: 'center' }}>
          <span>Đã có tài khoản? </span>
          <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;