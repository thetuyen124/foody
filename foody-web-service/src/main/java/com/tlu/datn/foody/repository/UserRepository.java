package com.tlu.datn.foody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
	User findByUsername(String Username);
	@Query(value = "SELECT * FROM users WHERE location_code = ?1", nativeQuery = true)
	List<User> findByLocation(Location Location);
}
