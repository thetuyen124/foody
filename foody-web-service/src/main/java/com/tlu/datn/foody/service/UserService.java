package com.tlu.datn.foody.service;

import java.util.List;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.model.ChangePasswordRequest;
import com.tlu.datn.foody.model.CreateAccountResponse;
import com.tlu.datn.foody.model.RecoveryPassword;
import com.tlu.datn.foody.model.UpdatePassword;

public interface UserService {
	User findByUsername(String userName);

	User updateUser(String userName, UserDTO user);

	List<CreateAccountResponse> createUser(List<UserDTO> user);

	boolean changePassword(ChangePasswordRequest request, String username);
	
	boolean changeState(String username,String State);
	
	boolean forgetPassword(String username,RecoveryPassword user);
	
	boolean updatePassword(String username,UpdatePassword pass);
	
	List<User> findByLocation(String location);
}
