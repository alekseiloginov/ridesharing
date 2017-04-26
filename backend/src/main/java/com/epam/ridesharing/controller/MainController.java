package com.epam.ridesharing.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping({"/rsapp/**", "/login"})
    public String handleMainUserInterfaceEntryPoint() {
        return "/index.html";
    }
}
