package com.epam.ridesharing.auth.uimodel;

import com.epam.ridesharing.data.model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private long id;
    private String email;
    private String name;
    private User.Role role;
}
