package com.tlu.datn.foody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tlu.datn.foody.entity.Location;

public interface LocationRepository extends JpaRepository<Location, String> {
	@Query(value = "SELECT * FROM locations WHERE state = ?1", nativeQuery = true)
	List<Location> findByState(String State);
}
