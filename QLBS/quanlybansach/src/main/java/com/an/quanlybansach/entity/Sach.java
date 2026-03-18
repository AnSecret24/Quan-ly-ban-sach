package com.an.quanlybansach.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sach")
@Data
public class Sach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_sach")
    private String tenSach;

    @Column(name = "tac_gia")
    private String tacGia;

    private Double giaBan;
    private Integer soLuongKho;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    private String hinhAnh;
}