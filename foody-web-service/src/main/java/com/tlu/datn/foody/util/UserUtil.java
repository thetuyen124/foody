package com.tlu.datn.foody.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.exception.NullException;
import com.tlu.datn.foody.model.RecoveryPassword;

@Component
public class UserUtil {
	public String genarateUsername(User user) {
		String username = "";
		String[] firstname = deAccent(user.getFirstName()).split(" ");
		String[] lastname = deAccent(user.getLastName()).split(" ");
		for (String name : firstname) {
			username += name;
		}
		for (String name : lastname) {
			username += name.substring(0, 1);
		}
		return username;
	}

	public void checkRequiredField(UserDTO user) {
		if (user.getFirstName() == null || user.getFirstName().isEmpty())
			throw new NullException("First name can not be null");
		if (user.getLastName() == null|| user.getLastName().isEmpty())
			throw new NullException("Last name can not be null");
		if (user.getIdNumber() == null|| user.getIdNumber().isEmpty())
			throw new NullException("ID number can not be null");
		if (user.getPhoneNumber() == null|| user.getPhoneNumber().isEmpty())
			throw new NullException("Phone number can not be null");
	}
	
	public boolean checkUserMatch(User user, RecoveryPassword model) {
		if (user.getFirstName().equals(model.getFirstname()))
			throw new NullException("First name not match");
		if (user.getLastName().equals(model.getLastname()))
			throw new NullException("Last name not match");
		if (user.getPhoneNumber().equals(model.getPhoneNumber()))
			throw new NullException("Phone number not match");
		if (user.getIdNumber().equals(model.getIDNumber()))
			throw new NullException("ID number not match");
		return true;
	}
	
    public static String deAccent(String str) {
        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD); 
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");
    }

}
