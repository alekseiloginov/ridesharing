package com.epam.ridesharing.auth.uimodel;

import com.epam.ridesharing.data.model.User;
import lombok.Data;

@Data
public class UserDto {
    private long id;
    private String email;
    private String name;
    private User.Role role;
}
