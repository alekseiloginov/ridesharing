package com.epam.ridesharing.service;

import java.util.List;
import java.util.stream.Collectors;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.data.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * User service implementation that queries database.
 */
@Service
public class UserServiceImpl implements UserService {

    public static final String DEFAULT_DISTANCE_KM = "10";
    private final UserRepository repo;

    @Autowired
    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public User findCurrentUser() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = repo.findByEmailIgnoreCaseAndDisabledFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException(email));

        return user;
    }

    @Override
    public List<User> findCompanions(double distanceKm, long officeId) {

        List<User> activeCandidates = repo.findByDistanceFromHomeAndOffice(distanceKm, officeId)
                .stream().filter(User::isActive).collect(Collectors.toList());

        return activeCandidates;
    }

    @Override
    public void saveTelegramId(User user, String chatId) {
        user.setTelegramId(chatId);
        repo.saveTelegramId(user.getId(), chatId);
    }

}
