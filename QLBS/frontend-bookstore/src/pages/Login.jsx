import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Kiểm tra tính hợp lệ dữ liệu (Quy tắc MS1.4)
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      tempErrors.email = "Email không đúng định dạng bạn ơi!";
    }
    if (matKhau.length < 8) {
      tempErrors.password = "Mật khẩu phải từ 8 ký tự trở lên.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: email,
        password: matKhau
      });

      if (typeof response.data === 'object' && response.data !== null) {

        const user = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));

        // điều hướng theo role
        if (user.vaiTro === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Sai tài khoản hoặc mật khẩu rồi bạn ơi! 😅" });
    }
  }
};

  // Styles đồng bộ
  const errorTextStyle = { color: '#e74c3c', fontSize: '12px', marginTop: '4px', textAlign: 'left' };
  const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8f9fa', padding: '20px' };
  const formBoxStyle = { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '100%', maxWidth: '400px', textAlign: 'center' };

  const inputStyle = (hasError) => ({
    padding: '12px',
    paddingRight: '45px',
    borderRadius: '6px',
    border: hasError ? '2px solid #e74c3c' : '1px solid #ddd',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none'
  });

  return (
    <div style={containerStyle} className="auth-container">
      <div style={formBoxStyle} className="auth-form-box">
        <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>Đăng Nhập</h2>

        {errors.general && (
          <div style={{ ...errorTextStyle, textAlign: 'center', backgroundColor: '#fdecea', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Nhập Email */}
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Email"
              style={inputStyle(errors.email)}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
          </div>

          {/* Nhập Mật khẩu */}
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              style={inputStyle(errors.password)}
              onChange={(e) => setMatKhau(e.target.value)}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#95a5a6',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
          </div>
          {errors.password && <div style={errorTextStyle}>{errors.password}</div>}

          {/* Nút Quên mật khẩu - Đã chỉnh lại vị trí sát lề phải */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', marginBottom: '20px' }}>
            <Link to="/forgot-password" style={{ fontSize: '13px', color: '#3498db', textDecoration: 'none', fontWeight: '500' }}>
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" style={{
            padding: '12px', background: '#2c3e50', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '16px'
          }}>
            Đăng nhập
          </button>
        </form>

        <div style={{ marginTop: '25px', fontSize: '14px', color: '#7f8c8d' }}>
          <span>Bạn chưa có tài khoản? </span>
          <Link to="/register" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;