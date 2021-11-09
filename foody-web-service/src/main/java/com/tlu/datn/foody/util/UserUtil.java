package com.tlu.datn.foody.util;

import org.springframework.stereotype.Component;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.exception.NullException;

@Component
public class UserUtil {
	public String genarateUsername(User user) {
		String username = "";
		String[] firstname = user.getFirstName().split(" ");
		String[] lastname = user.getLastName().split(" ");
		for (String name : firstname) {
			username += name;
		}
		for (String name : lastname) {
			username += name.substring(0, 1);
		}
		return username;
	}

	public void checkRequiredField(UserDTO user) {
		if (user.getFirstName() == null)
			throw new NullException("First name can not be null");
		if (user.getLastName() == null)
			throw new NullException("Last name can not be null");
		if (user.getIdNumber() == null)
			throw new NullException("ID number can not be null");
		if (user.getPhoneNumber() == null)
			throw new NullException("Phone number can not be null");
	}

}
