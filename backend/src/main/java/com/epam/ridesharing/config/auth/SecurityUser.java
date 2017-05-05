package com.epam.ridesharing.config.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;

public class SecurityUser extends User {
    public SecurityUser(String username, String password) {
        super(username, password, Arrays.asList(new SimpleGrantedAuthority(("ROLE_USER"))));
    }
}
