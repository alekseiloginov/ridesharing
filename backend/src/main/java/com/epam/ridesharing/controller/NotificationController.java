package com.epam.ridesharing.controller;

import com.epam.ridesharing.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

import static com.epam.ridesharing.service.EmailNotificationService.DEFAULT_DISTANCE_KM;

@RestController
@BasePathAwareController
public class NotificationController {

    private final NotificationService service;

    @Autowired
    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping("notify")
    public String notifyCompanions(@RequestParam(value = "time") String time,
                                   @RequestParam(value = "distanceKm", required = false, defaultValue = DEFAULT_DISTANCE_KM) Integer distanceKm)
            throws MessagingException {

        service.notifyCompanions(time, distanceKm);

        return "Successfully notified!";
    }
}
