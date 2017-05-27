package com.epam.ridesharing.auth.service.impl;

import com.epam.ridesharing.auth.service.AuthService;
import com.epam.ridesharing.data.projections.AuthProjection;
import com.epam.ridesharing.data.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public AuthProjection getUser(String email) {
        AuthProjection user = userRepository.findByEmailIgnoreCaseAndDisabledFalse(email);
        if (user == null) {
            throw new ResourceNotFoundException(email);
        }
        return user;
    }
}
