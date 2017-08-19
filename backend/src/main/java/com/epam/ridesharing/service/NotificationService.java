package com.epam.ridesharing.service;

import com.epam.ridesharing.data.model.User;

/**
 * Interface for users notifications.
 */
public interface NotificationService {

    /**
     * Notify an active passenger in a range.
     *
     * @param driver    the driver initiated the ride
     * @param passenger the passenger found in a range
     * @param time      the time or driver's departure
     */
    void notifyPassenger(User driver, User passenger, String time) throws Exception;
}
