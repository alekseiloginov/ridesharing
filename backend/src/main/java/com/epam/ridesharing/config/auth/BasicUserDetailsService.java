package com.epam.ridesharing.config.auth;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.data.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

class BasicUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailIgnoreCaseAndActiveIsTrue(username);
        if (user == null) {
            throw new UsernameNotFoundException("unknown user");
        }
        return new SecurityUser(user);
    }
}
