package com.epam.ridesharing.service;

import javax.mail.MessagingException;

/**
 * Interface for users notifications.
 */
public interface NotificationService {

    /**
     * Notifies companions.
     *
     * @param time       the departure time from home
     * @param distanceKm the distance in km to search for companions, optional
     * @throws MessagingException the messaging exception
     */
    void notifyCompanions(String time, Integer distanceKm) throws MessagingException;
}
