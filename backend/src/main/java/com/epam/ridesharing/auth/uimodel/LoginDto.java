package com.epam.ridesharing.auth.uimodel;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
}
