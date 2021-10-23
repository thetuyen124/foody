package com.tlu.datn.foody.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "locations")
public class Location {

  @Id
  @Column(name = "location_code")
  private String LocationCode;

  @Column(name = "province")
  private String Province;

  @Column(name = "district")
  private String District;

  @Column(name = "commune")
  private String Commune;

  public String getLocationCode() {
    return LocationCode;
  }

  public void setLocationCode(String locationCode) {
    LocationCode = locationCode;
  }

  public String getProvince() {
    return Province;
  }

  public void setProvince(String province) {
    Province = province;
  }

  public String getDistrict() {
    return District;
  }

  public void setDistrict(String district) {
    District = district;
  }

  public String getCommune() {
    return Commune;
  }

  public void setCommune(String commune) {
    Commune = commune;
  }

}
