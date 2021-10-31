package com.tlu.datn.foody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlu.datn.foody.entity.Location;

public interface LocationRepository extends JpaRepository<Location, String> {

}
