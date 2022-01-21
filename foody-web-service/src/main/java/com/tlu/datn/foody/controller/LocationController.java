package com.tlu.datn.foody.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.model.LocationModel;
import com.tlu.datn.foody.service.LocationService;
import com.tlu.datn.foody.service.UserService;

@RestController()
public class LocationController {

	@Autowired
	private LocationService locationService;

	@Autowired
	private UserService userService;

	/***
	 * get user location
	 * 
	 * @param username
	 * @return
	 */
	@GetMapping("/location/{username}")
	@CrossOrigin
	public Location getUserLocation(@PathVariable String username) {
		return userService.findByUsername(username).getLocation();
	}

	/***
	 * get all active location
	 * 
	 * @return
	 */
	@GetMapping("/location")
	@CrossOrigin
	public List<Location> getLocations() {
		return locationService.getAll();
	}

	/***
	 * create location
	 * 
	 * @param model
	 * @return
	 */
	@PostMapping("/location")
	@CrossOrigin
	public Location createLocation(@RequestBody LocationModel model) {
		return locationService.createLocation(model);
	}

	/***
	 * inactive location
	 * 
	 * @param locationCode
	 * @return
	 */
	@PutMapping("/location/{locationCode}/inactive")
	@CrossOrigin
	public Location inactiveLocation(@PathVariable String locationCode) {
		return locationService.updateLocation(locationCode, BaseConstants.INACTIVE);
	}

	/***
	 * reactive location
	 * 
	 * @param locationCode
	 * @return
	 */
	@PutMapping("/location/{locationCode}/reactive")
	@CrossOrigin
	public Location reactiveLocation(@PathVariable String locationCode) {
		return locationService.updateLocation(locationCode, BaseConstants.ACTIVE);
	}

	@PutMapping("/location/{locationCode}")
	@CrossOrigin
	public Location editNote(@PathVariable String locationCode, @RequestBody Location note) {
		return locationService.updateLocationNote(locationCode, note.getNote());
	}

}
