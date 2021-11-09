package com.tlu.datn.foody.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
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
	    userBuilder = User.withUsername(username);
	    userBuilder.password(user.getPassword());
	    userBuilder.roles(user.getType());
	} else {
	    throw new LoginException("Username not found");
	}
	return userBuilder.build();
    }
}
