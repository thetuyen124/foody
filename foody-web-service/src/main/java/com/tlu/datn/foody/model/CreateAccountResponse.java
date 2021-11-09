package com.tlu.datn.foody.model;

public class CreateAccountResponse {

    public String firstname;
    public String lastname;
    public String note;
    public boolean state;

    public String getNote() {
	return note;
    }

    public void setNote(String note) {
	this.note = note;
    }

    public String getFirstname() {
	return firstname;
    }

    public void setFirstname(String firstname) {
	this.firstname = firstname;
    }

    public String getLastname() {
	return lastname;
    }

    public void setLastname(String lastname) {
	this.lastname = lastname;
    }

    public boolean isState() {
	return state;
    }

    public void setState(boolean state) {
	this.state = state;
    }

    public CreateAccountResponse(String firstname, String lastname) {
	super();
	this.firstname = firstname;
	this.lastname = lastname;
    }

    public CreateAccountResponse() {
	super();
	// TODO Auto-generated constructor stub
    }

}
