package com.epam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {
    @RequestMapping(value = "/rsapp/**")
    public String handleMainUserInterfaceEntryPoint() {
        return "/index.html";
    }
}
