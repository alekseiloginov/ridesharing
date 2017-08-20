package com.epam.ridesharing.controller;

import java.util.List;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.service.EmailNotificationService;
import com.epam.ridesharing.service.TelegramNotificationService;
import com.epam.ridesharing.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.epam.ridesharing.service.UserServiceImpl.DEFAULT_DISTANCE_KM;

@RestController
@BasePathAwareController
public class NotificationController {

    private static final Logger LOG = LoggerFactory.getLogger(NotificationController.class);
    private static final String FAILED = "Notification failed.";
    private static final String SUCCESS = "Successfully notified!";
    private final TelegramNotificationService telegramService;
    private final EmailNotificationService emailService;
    private final UserService userService;


    @Autowired
    public NotificationController(TelegramNotificationService telegramService, EmailNotificationService emailService, UserService userService) {
        this.telegramService = telegramService;
        this.emailService = emailService;
        this.userService = userService;
    }

    @PostMapping("notify")
    public String notifyPassengers(
            @RequestParam(value = "time") String time,
            @RequestParam(value = "distanceKm", required = false, defaultValue = DEFAULT_DISTANCE_KM) Integer distanceKm) {

        try {

            User driver = userService.findCurrentUser();
            List<User> activePassengers = userService.findCompanions(distanceKm, driver.getOffice().getId());

            for (User passenger : activePassengers) {

                if (telegramService.hasTelegramId(passenger) && telegramService.hasTelegramId(driver)) {
                    telegramService.notifyPassenger(driver, passenger, time);

                } else {
                    emailService.notifyPassenger(driver, passenger, time);
                }
            }

        } catch (Exception e) {
            LOG.error(e.toString(), e);
            return FAILED;
        }

        return SUCCESS;
    }
}
