package com.epam.ridesharing.config.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;
import java.util.List;

public class SecurityUser extends User {
    public SecurityUser(com.epam.ridesharing.data.model.User user) {
        super(user.getEmail(), user.getPassword(), Arrays.asList(new SimpleGrantedAuthority(("ROLE_" + user.getRole().name()))));
    }
}
