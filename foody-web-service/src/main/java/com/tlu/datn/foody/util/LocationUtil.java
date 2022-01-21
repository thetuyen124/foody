package com.tlu.datn.foody.util;

import org.springframework.stereotype.Component;

import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.exception.NullException;

@Component
public class LocationUtil {
	public String generateCode(Location location) {
		String code = "";
		code += strimCode(location.getCommune());
		code += '-';
		code += strimCode(location.getDistrict());
		code += '-';
		code += strimCode(location.getProvince());
		return code;
	}

	private String strimCode(String name) {
		String newCode = "";
		String[] code = name.trim().split(" ");
		for (String c : code) {
			newCode += c.substring(0, 1);
		}
		return newCode;
	}

	public void checkRequiredField(Location location) {
		if (location.getCommune() == null || location.getCommune().isEmpty())
			throw new NullException("Commune can not be null");
		if (location.getDistrict() == null || location.getDistrict().isEmpty())
			throw new NullException("District can not be null");
		if (location.getProvince() == null || location.getProvince().isEmpty())
			throw new NullException("Province can not be null");
	}
}
