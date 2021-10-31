package com.tlu.datn.foody.service.impl;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.config.JwtTokenUtil;
import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.mapper.UserMapper;
import com.tlu.datn.foody.repository.UserRepository;
import com.tlu.datn.foody.service.UserService;
import com.tlu.datn.foody.util.UserUtil;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private UserUtil util;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public Optional<User> findByUsername(String userName) {
	return userRepository.findById(userName);
    }

    @Override
    public User updateUser(String userName, UserDTO user) {
	User newUser = userRepository.findById(userName).orElse(new User());
	return userRepository.saveAndFlush(mapper.fromDTO(newUser, user));
    }

    @Override
    public User createUser(UserDTO user) {
	User newUser = mapper.fromDTO(user);
	String username = util.genarateUsername(newUser);
	String finalUsername = username;

	while (userRepository.existsById(finalUsername)) {
	    int lastFix = 1;
	    finalUsername = username + lastFix;
	}

	String password = finalUsername + "@" + newUser.getIdNumber();

	newUser.setPassword(password);
	newUser.setUsername(finalUsername);
	newUser.setState(BaseConstants.NEW_ACCOUNT);
	return userRepository.saveAndFlush(newUser);
    }

    public Location getLocation(HttpServletRequest request) {
	return userRepository
		.findById(jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7)))
		.orElse(null).getLocation();
    }
}
