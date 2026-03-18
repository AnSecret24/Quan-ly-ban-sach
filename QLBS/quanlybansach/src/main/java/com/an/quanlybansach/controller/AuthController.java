package com.an.quanlybansach.controller;

import com.an.quanlybansach.entity.NguoiDung;
import com.an.quanlybansach.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Thêm cái này
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<NguoiDung> user = nguoiDungRepository.findByEmail(email);

        if (user.isPresent() && user.get().getMatKhau().equals(password)) {
            return ResponseEntity.ok(user.get());
        }
        // Trả về lỗi 401 để Frontend nhảy vào khối .catch()
        return ResponseEntity.status(401).body("Sai email hoặc mật khẩu An ơi!");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody NguoiDung user) {
        // 1. Kiểm tra email đã tồn tại chưa (Quy tắc số 3 của An)
        if (nguoiDungRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email này đã được sử dụng rồi!");
        }

        // 2. Kiểm tra độ dài mật khẩu ở Backend (Bảo mật lớp 2)
        if (user.getMatKhau() == null || user.getMatKhau().length() < 8) {
            return ResponseEntity.badRequest().body("Mật khẩu phải từ 8 ký tự trở lên.");
        }

        // 3. Thiết lập vai trò mặc định
        if (user.getVaiTro() == null || user.getVaiTro().isEmpty()) {
            user.setVaiTro("USER");
        }

        try {
            NguoiDung savedUser = nguoiDungRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}