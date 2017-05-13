package com.epam.ridesharing.auth.controller;

import com.epam.ridesharing.auth.service.AuthService;
import com.epam.ridesharing.data.projections.AuthProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@BasePathAwareController
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("login")
    public AuthProjection login(@RequestBody Map<String, String> payload) {
        return authService.getUser(payload.get("email"));
    }
}
