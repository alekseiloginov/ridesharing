package com.epam.ridesharing.auth.uimodel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String email;
    private String name;
}
