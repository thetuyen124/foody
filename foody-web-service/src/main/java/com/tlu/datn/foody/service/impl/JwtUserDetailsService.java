package com.tlu.datn.foody.service.impl;


import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.tlu.datn.foody.mapper.UserMapper;
import com.tlu.datn.foody.service.UserService;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private UserService userService;
  
  @Autowired
  private UserMapper mapper;


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    com.tlu.datn.foody.entity.User user = userService.findByUsername(username);
    UserBuilder userBuilder = null;
    if (user != null) {
      userBuilder = User.withUsername(username);
      userBuilder.password(user.getPassword());
      userBuilder.roles(user.getType());
    } else {
      throw new UsernameNotFoundException("Username not found");
    }
    return userBuilder.build();
  }
}
