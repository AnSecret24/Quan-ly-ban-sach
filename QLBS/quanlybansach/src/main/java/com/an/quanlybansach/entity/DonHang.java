package com.an.quanlybansach.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "don_hang")
@Data // Tự động tạo Getter, Setter nhờ Lombok
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ho_ten")
    private String hoTen;

    private String email;

    @Column(name = "tong_tien", precision = 15, scale = 2)
    private BigDecimal tongTien;

    @Column(name = "ngay_dat")
    private LocalDateTime ngayDat = LocalDateTime.now();

    @Column(name = "trang_thai")
    private String trangThai = "Chờ xét duyệt";
}