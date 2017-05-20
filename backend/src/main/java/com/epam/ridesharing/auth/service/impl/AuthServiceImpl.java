package com.epam.ridesharing.auth.service.impl;

import com.epam.ridesharing.auth.service.AuthService;
import com.epam.ridesharing.auth.uimodel.UserDto;
import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.data.repo.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto getUser(String email) {
        // TODO: is it possible to make this extraction more elegant with spring data projections?
        User user = userRepository.findByEmailIgnoreCaseAndDisabledIsFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException(email));

        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
