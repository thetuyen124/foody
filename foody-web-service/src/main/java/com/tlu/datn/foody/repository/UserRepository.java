package com.tlu.datn.foody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlu.datn.foody.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}
