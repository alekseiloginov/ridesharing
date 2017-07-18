package com.epam.ridesharing.controller;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@BasePathAwareController
public class NotificationController {

    @PostMapping("notify")
    public String notifyCompanions(@RequestParam("time") String time) {
        return "Successfully notified! " + time;
    }
}
