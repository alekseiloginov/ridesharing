package com.epam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {
    @RequestMapping(value = "/rsapp/**")
    public String handleMainUserInterfaceEntryPoint(HttpServletRequest request, Model model) {
        model.addAttribute("baseContext", request.getContextPath());
        return "index";
    }
}
