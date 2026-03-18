import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ tenSach: '', tacGia: '', giaBan: '', soLuongKho: '', moTa: '' });

  // 1. Thêm state để theo dõi ID đang sửa
  const [editingId, setEditingId] = useState(null);

  const fetchBooks = () => {
    axios.get("http://localhost:8080/api/sach")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Lỗi lấy dữ liệu:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 2. Hàm khi nhấn nút "Sửa" ở bảng
  const handleEditClick = (sach) => {
    setEditingId(sach.id);
    setNewBook({
      tenSach: sach.tenSach,
      tacGia: sach.tacGia,
      giaBan: sach.giaBan,
      soLuongKho: sach.soLuongKho,
      moTa: sach.moTa
    });
  };

  // 3. Hàm xử lý chung cho cả THÊM và SỬA
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Gọi API PUT để cập nhật
      axios.put(`http://localhost:8080/api/sach/${editingId}`, newBook)
        .then(() => {
          alert("Cập nhật sách thành công!");
          resetForm();
          fetchBooks();
        })
        .catch(err => alert("Lỗi khi sửa: " + err));
    } else {
      // Gọi API POST để thêm mới (Logic cũ của An)
      axios.post("http://localhost:8080/api/sach", newBook)
        .then(() => {
          alert("Thêm sách thành công!");
          resetForm();
          fetchBooks();
        })
        .catch(err => alert("Lỗi khi thêm: " + err));
    }
  };

  const resetForm = () => {
    setNewBook({ tenSach: '', tacGia: '', giaBan: '', soLuongKho: '', moTa: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("An có chắc chắn muốn xóa cuốn sách này không?")) {
      axios.delete(`http://localhost:8080/api/sach/${id}`)
        .then(() => {
          alert("Xóa thành công!");
          fetchBooks();
        })
        .catch(err => alert("Lỗi khi xóa: " + err));
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Quản Lý Kho Sách</h1>

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>{editingId ? "📝 Đang sửa sách: " + editingId : "+ Thêm sách vào kho"}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
          <input type="text" placeholder="Tên sách" value={newBook.tenSach}
                 onChange={e => setNewBook({...newBook, tenSach: e.target.value})} required style={{padding: '8px'}} />

          <input type="text" placeholder="Tác giả" value={newBook.tacGia}
                 onChange={e => setNewBook({...newBook, tacGia: e.target.value})} style={{padding: '8px'}} />

          <input type="number" placeholder="Giá bán" value={newBook.giaBan}
                 onChange={e => setNewBook({...newBook, giaBan: e.target.value})} style={{padding: '8px'}} />

          <input type="number" placeholder="Số lượng" value={newBook.soLuongKho}
                 onChange={e => setNewBook({...newBook, soLuongKho: e.target.value})} style={{padding: '8px'}} />

          <button type="submit" style={{ padding: '8px 20px', background: editingId ? '#3498db' : '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {editingId ? "Cập nhật" : "Lưu sách"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: '8px 20px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Hủy
            </button>
          )}
        </form>
      </div>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Tên Sách</th>
            <th style={{ padding: '12px' }}>Tác Giả</th>
            <th style={{ padding: '12px' }}>Giá Bán</th>
            <th style={{ padding: '12px' }}>Số lượng kho</th>
            <th style={{ padding: '12px' }}>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((sach) => (
            <tr key={sach.id}>
              <td style={{ padding: '12px' }}>{sach.id}</td>
              <td style={{ padding: '12px' }}>{sach.tenSach}</td>
              <td style={{ padding: '12px' }}>{sach.tacGia}</td>
              <td style={{ padding: '12px' }}>{sach.giaBan?.toLocaleString()} VNĐ</td>
              <td style={{ padding: '12px' }}>{sach.soLuongKho}</td>
              <td style={{ padding: '12px' }}>
                {/* 4. Thêm nút Sửa */}
                <button
                  onClick={() => handleEditClick(sach)}
                  style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(sach.id)}
                  style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;