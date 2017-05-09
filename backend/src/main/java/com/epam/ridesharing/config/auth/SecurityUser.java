package com.epam.ridesharing.config.auth;

import lombok.Data;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;

@Data
public class SecurityUser extends User {
    private Long id;
    public SecurityUser(com.epam.ridesharing.data.model.User user) {
        super(user.getEmail(), user.getPassword(), Arrays.asList(new SimpleGrantedAuthority(("ROLE_" + user.getRole().name()))));
        this.id = user.getId();
    }
}
