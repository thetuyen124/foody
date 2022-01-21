package com.tlu.datn.foody.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.model.LocationModel;
import com.tlu.datn.foody.repository.LocationRepository;
import com.tlu.datn.foody.service.LocationService;
import com.tlu.datn.foody.util.LocationUtil;

@Service
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private LocationUtil util;

	@Override
	public Location findBycode(String locationCode) {
		return locationRepository.findById(locationCode).orElse(null);
	}

	@Override
	public List<Location> getAll() {
		return locationRepository.findAll();
	}

	@Override
	public Location createLocation(LocationModel location) {
		Location newLocation = new Location();
		newLocation.setCommune(location.Commune);
		newLocation.setDistrict(location.District);
		newLocation.setProvince(location.Province);
		util.checkRequiredField(newLocation);
		newLocation.setState(BaseConstants.ACTIVE);
		newLocation.setLocationCode(util.generateCode(newLocation));
		return locationRepository.saveAndFlush(newLocation);
	}

	@Override
	public Location updateLocation(String code, String state) {
		Location location= locationRepository.findById(code).orElse(null);
		util.checkRequiredField(location);
		location.setState(state);
		return locationRepository.saveAndFlush(location);
	}

	@Override
	public Location updateLocationNote(String code, String note) {
		Location location= locationRepository.findById(code).orElse(null);
		util.checkRequiredField(location);
		location.setNote(note);
		return locationRepository.saveAndFlush(location);
	}

}
