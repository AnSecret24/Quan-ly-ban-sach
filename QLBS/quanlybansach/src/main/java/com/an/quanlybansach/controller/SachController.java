package com.an.quanlybansach.controller;

import com.an.quanlybansach.entity.Sach;
import com.an.quanlybansach.repository.SachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sach")

public class SachController {

    @Autowired
    private SachRepository sachRepository;

    // 1. Lấy tất cả sách
    @GetMapping
    public List<Sach> layTatCaSach() {
        return sachRepository.findAll();
    }

    // 2. Lấy chi tiết 1 cuốn sách
    @GetMapping("/{id}")
    public Sach layChiTietSach(@PathVariable Integer id) {
        return sachRepository.findById(id).orElse(null);
    }

    // 3. THÊM MỚI SÁCH (Hàm này An đang thiếu nè)
    @PostMapping
    public Sach themSach(@RequestBody Sach sach) {
        return sachRepository.save(sach);
    }

    // 4. XÓA SÁCH (Hàm này dùng cho nút Xóa đỏ ở giao diện)
    @DeleteMapping("/{id}")
    public void xoaSach(@PathVariable Integer id) {
        sachRepository.deleteById(id);
    }

    // 5. CẬP NHẬT THÔNG TIN SÁCH (Sửa sách)
    @PutMapping("/{id}")
    public Sach suaSach(@PathVariable Integer id, @RequestBody Sach sachMoi) {
        return sachRepository.findById(id)
                .map(sach -> {
                    sach.setTenSach(sachMoi.getTenSach());
                    sach.setTacGia(sachMoi.getTacGia());
                    sach.setGiaBan(sachMoi.getGiaBan());
                    sach.setSoLuongKho(sachMoi.getSoLuongKho());
                    sach.setMoTa(sachMoi.getMoTa());
                    return sachRepository.save(sach);
                })
                .orElseGet(() -> {
                    sachMoi.setId(id);
                    return sachRepository.save(sachMoi);
                });
    }
}