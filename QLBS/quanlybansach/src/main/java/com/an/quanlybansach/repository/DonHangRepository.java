package com.an.quanlybansach.repository;

import com.an.quanlybansach.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {

    // Tính tổng doanh thu từ các đơn hàng có trạng thái 'Đã Duyệt' hoặc 'Thành Công'
    // Tùy vào tên trạng thái An đặt trong DB mà sửa lại chữ 'Đã Duyệt' cho khớp nhé
    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE d.trangThai = 'Đã Duyệt'")
    Double tinhTongDoanhThu();

    // Đếm tổng số đơn hàng hiện có
    long count();
}