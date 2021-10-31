package com.tlu.datn.foody.service;

import com.tlu.datn.foody.entity.Location;

public interface LocationService {
    Location findBycode(String locationCode);
}
