package com.an.quanlybansach.repository;

import com.an.quanlybansach.entity.Sach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SachRepository extends JpaRepository<Sach, Integer> {
    // Spring Boot sẽ tự động cung cấp các hàm findAll(), save(), delete()...
}