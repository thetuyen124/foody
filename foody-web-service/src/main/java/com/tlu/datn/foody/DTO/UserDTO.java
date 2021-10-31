package com.tlu.datn.foody.DTO;

public class UserDTO {

    private String Username;

    private String FirstName;

    private String LastName;

    private String PhoneNumber;

    private String Type;

    private String Location;

    private String State;
    
    private String IdNumber;

    public String getUsername() {
	return Username;
    }

    public void setUsername(String username) {
	Username = username;
    }

    public String getFirstName() {
	return FirstName;
    }

    public void setFirstName(String firstName) {
	FirstName = firstName;
    }

    public String getLastName() {
	return LastName;
    }

    public void setLastName(String lastName) {
	LastName = lastName;
    }

    public String getPhoneNumber() {
	return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
	PhoneNumber = phoneNumber;
    }

    public String getType() {
	return Type;
    }

    public void setType(String type) {
	Type = type;
    }

    public String getLocation() {
	return Location;
    }

    public void setLocation(String location) {
	Location = location;
    }

    public String getState() {
	return State;
    }

    public void setState(String state) {
	State = state;
    }

    public String getIdNumber() {
        return IdNumber;
    }

    public void setIdNumber(String idNumber) {
        IdNumber = idNumber;
    }

}
