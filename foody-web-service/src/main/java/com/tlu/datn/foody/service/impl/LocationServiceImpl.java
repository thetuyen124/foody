package com.tlu.datn.foody.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.repository.LocationRepository;
import com.tlu.datn.foody.service.LocationService;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public Location findBycode(String locationCode) {
	return locationRepository.findById(locationCode).orElse(null);
    }

}
