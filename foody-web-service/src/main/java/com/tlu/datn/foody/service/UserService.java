package com.tlu.datn.foody.service;

import java.util.Optional;

import com.tlu.datn.foody.DTO.UserDTO;
import com.tlu.datn.foody.entity.User;

public interface UserService {
    Optional<User> findByUsername(String userName);

    User updateUser(String userName, UserDTO user);

    User createUser(UserDTO user);
}
