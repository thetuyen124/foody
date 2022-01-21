package com.tlu.datn.foody.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import com.tlu.datn.foody.common.BaseConstants;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.tlu.datn.foody.exception.LoginException;
import com.tlu.datn.foody.service.UserService;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.tlu.datn.foody.entity.User user = userService.findByUsername(username);
		UserBuilder userBuilder = null;
		if (user != null) {
			if (!user.getState().equals(BaseConstants.INACTIVE)) {
				if (!user.getLocation().getState().equals(BaseConstants.INACTIVE)) {
					String role = user.getType();
					role = role + "," + user.getState();
					userBuilder = User.withUsername(username);
					userBuilder.password(user.getPassword());
					userBuilder.roles(role.split(","));
				} else {
					throw new LoginException("Your location was disable");
				}
			} else {
				throw new LoginException("Your account was disable");
			}
		} else {
			throw new LoginException("Username not found");
		}
		return userBuilder.build();
	}
}
