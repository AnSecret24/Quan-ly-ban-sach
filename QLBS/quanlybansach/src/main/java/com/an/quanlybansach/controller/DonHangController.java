package com.an.quanlybansach.controller;

import com.an.quanlybansach.entity.DonHang;
import com.an.quanlybansach.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangRepository donHangRepository;

    // Lưu đơn hàng mới từ khách hàng
    @PostMapping
    public DonHang taoDonHang(@RequestBody DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    // Lấy danh sách đơn hàng cho Admin quản lý
    @GetMapping
    public List<DonHang> layTatCaDonHang() {
        return donHangRepository.findAll();
    }

    // Cập nhật trạng thái đơn hàng (Duyệt/Hủy)
    @PutMapping("/{id}/trang-thai")
    public DonHang capNhatTrangThai(@PathVariable Integer id, @RequestParam String trangThai) {
        DonHang dh = donHangRepository.findById(id).orElseThrow();
        dh.setTrangThai(trangThai);
        return donHangRepository.save(dh);
    }

    @GetMapping("/thong-ke/doanh-thu")
    public ResponseEntity<?> getDoanhThu() {
        Double doanhThu = donHangRepository.tinhTongDoanhThu();
        // Trả về 0 nếu chưa có đơn hàng nào để tránh lỗi null ở Frontend
        return ResponseEntity.ok(doanhThu != null ? doanhThu : 0.0);
    }

    @GetMapping("/thong-ke/tong-don")
    public ResponseEntity<?> getTongDonHang() {
        return ResponseEntity.ok(donHangRepository.count());
    }
}