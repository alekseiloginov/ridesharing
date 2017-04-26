package com.epam.ridesharing.controller;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/my")
@BasePathAwareController
public class MyController {
    @GetMapping("hello")
    public String hello() {
        return "Hello World???!!@";
    }
}
