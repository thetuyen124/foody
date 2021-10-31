package com.tlu.datn.foody.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.service.LocationService;

@Component
public class UserMapper {
    @Autowired
    private LocationService locationService;

    public UserDTO fromEntity(User user) {
	UserDTO newUser = new UserDTO();
	newUser.setFirstName(user.getFirstName());
	newUser.setLastName(user.getLastName());
	newUser.setLocation(user.getLocation().getLocationCode());
	newUser.setType(user.getType());
	newUser.setUsername(user.getUsername());
	newUser.setPhoneNumber(user.getPhoneNumber());
	newUser.setState(user.getState());
	return newUser;
    }

    public User fromDTO(UserDTO payload) {
	return fromDTO(new User(), payload);
    }

    public User fromDTO(User newUser, UserDTO user) {
	newUser.setFirstName(user.getFirstName());
	newUser.setLastName(user.getLastName());
	newUser.setLocation(locationService.findBycode(user.getLocation()));
	newUser.setType(user.getType());
	newUser.setUsername(user.getUsername());
	newUser.setPhoneNumber(user.getPhoneNumber());
	newUser.setState(user.getState());
	return newUser;
    }
}
