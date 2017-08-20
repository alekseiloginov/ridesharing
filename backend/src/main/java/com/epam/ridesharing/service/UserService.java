package com.epam.ridesharing.service;

import java.util.List;
import java.util.Optional;

import com.epam.ridesharing.data.model.User;

/**
 * User service for common operations with user.
 */
public interface UserService {

    /**
     * Find current user.
     *
     * @return the user
     */
    User findCurrentUser();

    /**
     * Find a user by ID.
     *
     * @param email the user's unique email
     * @return the user
     */
    Optional<User> findUserByEmail(String email);

    /**
     * Find companions list using range in km and office id.
     *
     * @param distanceKm the distance in km
     * @param officeId   the office id
     * @return the list
     */
    List<User> findCompanions(double distanceKm, long officeId);

    /**
     * Persist telegram id for the future use.
     *
     * @param user   the user
     * @param chatId the chat id
     */
    void saveTelegramId(User user, String chatId);
}
