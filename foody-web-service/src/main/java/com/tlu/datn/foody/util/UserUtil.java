package com.tlu.datn.foody.util;

import org.springframework.stereotype.Component;

import com.tlu.datn.foody.entity.User;

@Component
public class UserUtil {
    public String genarateUsername(User user) {
	String username="";
	String[] firstname=user.getFirstName().split(" ");
	String[] lastname=user.getLastName().split(" ");
	for (String name : firstname) {
	    username+=name;
	}
	for (String name : lastname) {
	    username+=name.substring(0, 1);
	}
	return username;
    }
}
