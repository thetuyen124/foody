package com.tlu.datn.foody.service;

import com.tlu.datn.foody.entity.User;

public interface UserService {
  User findByUsername(String UserName);
}
