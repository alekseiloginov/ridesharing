package com.epam.ridesharing.auth.service;

import com.epam.ridesharing.data.projections.AuthProjection;

public interface AuthService {
    AuthProjection getUser(String email);
}
