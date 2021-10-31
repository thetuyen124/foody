package com.tlu.datn.foody.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "username")
    private String Username;

    @Column(name = "first_name")
    private String FirstName;

    @Column(name = "last_name")
    private String LastName;

    @Column(name = "id_number")
    private String IdNumber;

    @Column(name = "phone_number")
    private String PhoneNumber;

    @Column(name = "type")
    private String Type;

    @Column(name = "password")
    private String Password;

    @ManyToOne
    @JoinColumn(name = "location_code")
    private Location Location;

    @Column(name = "state")
    private String State;

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

    public String getIdNumber() {
	return IdNumber;
    }

    public void setIdNumber(String idNumber) {
	IdNumber = idNumber;
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

    public String getPassword() {
	return Password;
    }

    public void setPassword(String password) {
	Password = password;
    }

    public Location getLocation() {
	return Location;
    }

    public void setLocation(Location location) {
	Location = location;
    }

    public String getState() {
	return State;
    }

    public void setState(String state) {
	State = state;
    }

}
