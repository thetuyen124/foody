package com.tlu.datn.foody.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.tlu.datn.foody.config.JwtTokenUtil;
import com.tlu.datn.foody.exception.LoginException;
import com.tlu.datn.foody.model.JwtRequest;
import com.tlu.datn.foody.model.JwtResponse;
import com.tlu.datn.foody.service.impl.JwtUserDetailsService;

@RestController
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    @CrossOrigin
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
	authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
	final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
	final String token = jwtTokenUtil.generateToken(userDetails);
	return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
	try {
	    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	} catch (DisabledException e) {
	    throw new Exception("USER_DISABLED", e);
	} catch (BadCredentialsException e) {
	    throw new LoginException("Incorrect password");
	}
    }
}
