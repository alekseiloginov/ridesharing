package com.epam.ridesharing.auth.service;

import com.epam.ridesharing.auth.uimodel.UserDto;

public interface AuthService {
    UserDto getUser(String email);
}
