package com.tlu.datn.foody.service;

import java.util.List;

import com.tlu.datn.foody.entity.Location;
import com.tlu.datn.foody.model.LocationModel;

public interface LocationService {
    Location findBycode(String locationCode);
    
    List<Location> getAll();
    
    Location createLocation(LocationModel location);
    
    Location updateLocation(String code,String state);
    
    Location updateLocationNote(String code,String note);
}
