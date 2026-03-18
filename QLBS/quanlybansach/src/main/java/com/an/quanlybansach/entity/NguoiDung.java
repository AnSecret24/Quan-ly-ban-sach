package com.an.quanlybansach.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "nguoi_dung")
@Data
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false) // Không được để trống tên
    private String hoTen;

    // Cực kỳ quan trọng: unique = true để MySQL ngăn chặn trùng Email ở cấp độ DB
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String matKhau;

    @Column(length = 20)
    private String vaiTro; // Mặc định sẽ là USER hoặc ADMIN
}