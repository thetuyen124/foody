package com.tlu.datn.foody.controller;

import java.util.List;

import javax.security.auth.login.LoginException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.mapper.UserMapper;
import com.tlu.datn.foody.model.ChangePasswordRequest;
import com.tlu.datn.foody.model.CreateAccountResponse;
import com.tlu.datn.foody.model.RecoveryPassword;
import com.tlu.datn.foody.model.UpdatePassword;
import com.tlu.datn.foody.service.UserService;

@RestController()
public class UserController {

	@Autowired
	private UserMapper mapper;

	@Autowired
	private UserService userService;

	/***
	 * Get user information
	 * 
	 * @param username
	 * @return
	 */
	@GetMapping("/user/{username}")
	@CrossOrigin
	public UserDTO viewProfile(@PathVariable String username) {
		return mapper.fromEntity(userService.findByUsername(username));
	}

	/***
	 * Edit user information
	 * 
	 * @param username
	 * @param user
	 * @return
	 */
	@PutMapping("/user/{username}")
	@CrossOrigin
	public UserDTO editUserProfile(@PathVariable String username, @RequestBody UserDTO user) {
		return mapper.fromEntity(userService.updateUser(username, user));
	}
	
	/***
	 * Change password
	 * 
	 * @param username
	 * @param user
	 * @return
	 * @throws LoginException 
	 */
	@PutMapping("/user/{username}/change-password")
	@CrossOrigin
	public boolean changePassword(@PathVariable String username, @RequestBody ChangePasswordRequest request) {
		return userService.changePassword(request, username);
	}

	/***
	 * Create Users
	 * 
	 * @param user
	 * @return
	 */
	@PostMapping("/user")
	@CrossOrigin
	public List<CreateAccountResponse> createUser(@RequestBody List<UserDTO> user) {
		return userService.createUser(user);
	}

	/***
	 * Disable user
	 * 
	 * @param username
	 * @return
	 */
	@PutMapping("/user/{username}/disable")
	@CrossOrigin
	public boolean disable(@PathVariable String username) {
		return userService.changeState(username,BaseConstants.INACTIVE);
	}
	
	@PutMapping("/user/{username}/enable")
	@CrossOrigin
	public boolean enable(@PathVariable String username) {
		return userService.changeState(username,BaseConstants.ACTIVE);
	}
	
	/***
	 * check user information
	 * 
	 * @param username
	 * @param user
	 * @return
	 */
	@PutMapping("/user/forgot-password/{username}")
	@CrossOrigin
	public boolean forgotPassword(@PathVariable String username,@RequestBody RecoveryPassword user) {
		return userService.forgetPassword(username, user);
	}
	
	/***
	 * update password without check
	 * 
	 * @param username
	 * @param pass
	 * @return
	 */
	@PutMapping("/user/update-password/{username}")
	@CrossOrigin
	public boolean updatePassword(@PathVariable String username,@RequestBody UpdatePassword pass) {
		return userService.updatePassword(username, pass);
	}
	
	/***
	 * get user in a location
	 * 
	 * @param locationCode
	 * @return
	 */
	@GetMapping("/user{locationCode}")
	@CrossOrigin
	public List<User> getAllUserInLocation(@RequestParam String locationCode){
		return userService.findByLocation(locationCode);
	}
}
