package com.tlu.datn.foody.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.config.JwtTokenUtil;
import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.exception.NullException;
import com.tlu.datn.foody.mapper.UserMapper;
import com.tlu.datn.foody.model.ChangePasswordRequest;
import com.tlu.datn.foody.model.CreateAccountResponse;
import com.tlu.datn.foody.repository.InvoiceRepository;
import com.tlu.datn.foody.repository.UserRepository;
import com.tlu.datn.foody.service.UserService;
import com.tlu.datn.foody.util.PasswordBcryptUtil;
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

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Override
	public User findByUsername(String userName) {
		User user=userRepository.findById(userName).orElse(null);
		if(user == null) {
			throw new NullException("Username not found");
		}
		return user;
	}

	@Override
	public User updateUser(String userName, UserDTO user) {
		User newUser = userRepository.findById(userName).orElse(new User());
		return userRepository.saveAndFlush(mapper.fromDTO(newUser, user));
	}

	@Override
	public List<CreateAccountResponse> createUser(List<UserDTO> users) {
		List<CreateAccountResponse> response = new ArrayList<CreateAccountResponse>();
		for (UserDTO user : users) {
			CreateAccountResponse res = new CreateAccountResponse(user.getFirstName(), user.getLastName());
			try {
				util.checkRequiredField(user);
				User newUser = mapper.fromDTO(user);
				String username = StringUtils.toRootLowerCase(util.genarateUsername(newUser));
				String finalUsername = username;

				while (userRepository.existsById(finalUsername)) {
					int lastFix = 1;
					finalUsername = username + lastFix;
				}

				String password = StringUtils.toRootLowerCase(finalUsername + "@" + newUser.getIdNumber());

				newUser.setPassword(PasswordBcryptUtil.passwordEncoder(password));
				newUser.setUsername(finalUsername);
				newUser.setState(BaseConstants.NEW_ACCOUNT);
				userRepository.saveAndFlush(newUser);
				res.setState(true);
				response.add(res);
			} catch (Exception ex) {
				res.setState(false);
				res.setNote(ex.getMessage());
				response.add(res);
			}

		}
		return response;
	}

	public Location getLocation(HttpServletRequest request) {
		return userRepository
				.findById(jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7)))
				.orElse(null).getLocation();
	}

	@Override
	public boolean changePassword(ChangePasswordRequest request, String username) {
		User user = userRepository.findById(username).orElse(null);
		if (user == null)
			throw new NullException("Username not found");
		if (PasswordBcryptUtil.checkPasswordMatching(request.getPassword(), user.getPassword())) {
			user.setPassword(PasswordBcryptUtil.passwordEncoder(request.newPassword));
			userRepository.saveAndFlush(user);
			return true;
		}
		return false;
	}

	@Override
	public boolean changeState(String username,String State) {

		User user = userRepository.findById(username).orElse(null);
		if (user == null)
			throw new NullException("Username not found");
		if (invoiceRepository.findByBuyerAndStateNot(user.getUsername(), BaseConstants.DONE).size() > 0)
			throw new NullException("User still have order in progess");
		user.setState(State);
		userRepository.saveAndFlush(user);
		return true;
	}
}
