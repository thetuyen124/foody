package com.tlu.datn.foody.DTO;

import com.tlu.datn.foody.entity.Location;

public class UserDTO {

  private String Username;

  private String FirstName;

  private String LastName;

  private String PhoneNumber;

  private String Type;

  private Location Location;

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

  public Location getLocation() {
    return Location;
  }

  public void setLocation(Location location) {
    Location = location;
  }

}
