package com.epam.ridesharing.service;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.data.repo.UserRepository;
import com.epam.ridesharing.util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Notifies users by email.
 */
@Service
public class EmailNotificationService implements NotificationService {

    public static final String DEFAULT_DISTANCE_KM = "10";
    private final UserRepository repo;

    @Autowired
    public EmailNotificationService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public void notifyCompanions(String time, Integer distanceKm) throws MessagingException {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = repo.findByEmailIgnoreCaseAndDisabledFalse(email).orElseThrow(() -> new ResourceNotFoundException(email));

        List<User> activeCandidates = repo.findByDistanceFromHomeAndOffice(distanceKm, user.getOffice().getId())
                .stream().filter(User::isActive).collect(Collectors.toList());

        EmailSender.sendEmail(user, activeCandidates, time);
    }
}
