package com.tlu.datn.foody.model;

public class ChangePasswordRequest {

	public String password;
	public String newPassword;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public ChangePasswordRequest(String password, String newPassword) {
		super();
		this.password = password;
		this.newPassword = newPassword;
	}

}
