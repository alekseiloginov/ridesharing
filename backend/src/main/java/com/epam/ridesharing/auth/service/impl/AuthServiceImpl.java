package com.epam.ridesharing.auth.service.impl;

import com.epam.ridesharing.auth.service.AuthService;
import com.epam.ridesharing.auth.uimodel.UserDto;
import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.data.repo.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto getUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // TODO: is it possible to make this extraction more elegant with spring data projections?
        User user = userRepository.findByEmailIgnoreCaseAndDisabledFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException(email));

        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
