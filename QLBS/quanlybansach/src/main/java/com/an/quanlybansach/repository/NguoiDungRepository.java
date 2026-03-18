package com.an.quanlybansach.repository;

import com.an.quanlybansach.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    // 1. Dùng để đăng nhập (An đã có)
    Optional<NguoiDung> findByEmail(String email);

    // 2. Bổ sung: Kiểm tra sự tồn tại của Email khi Đăng ký
    // Spring Data JPA sẽ tự động tạo câu lệnh: SELECT count(*) FROM nguoi_dung WHERE email = ?
    boolean existsByEmail(String email);
}