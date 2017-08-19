package com.epam.ridesharing.service;

import javax.mail.MessagingException;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.util.EmailSender;
import org.springframework.stereotype.Service;

/**
 * Notifies users by a provided email.
 */
@Service
public class EmailNotificationService implements NotificationService {

    @Override
    public void notifyPassenger(User driver, User passenger, String time) throws MessagingException {
        EmailSender.sendEmail(driver, passenger, time);
    }
}
