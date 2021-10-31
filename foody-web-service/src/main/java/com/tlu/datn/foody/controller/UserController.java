package com.tlu.datn.foody.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.mapper.UserMapper;
import com.tlu.datn.foody.service.UserService;

@RestController()
public class UserController {

    @Autowired
    private UserMapper mapper;

    @Autowired
    private UserService userService;

    @GetMapping("/user/{username}")
    @CrossOrigin
    public UserDTO viewProfile(@PathVariable String username) {
	return mapper.fromEntity(userService.findByUsername(username).orElse(null));
    }

    @PutMapping("/user/{username}")
    @CrossOrigin
    public UserDTO editUserProfile(@PathVariable String username, @RequestBody UserDTO user) {
	return mapper.fromEntity(userService.updateUser(username, user));
    }

    @PostMapping("/user")
    @CrossOrigin
    public UserDTO createUser(@RequestBody UserDTO user) {
	userService.createUser(user);
	return null;
    }
}
