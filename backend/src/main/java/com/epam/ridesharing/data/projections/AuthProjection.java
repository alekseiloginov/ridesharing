package com.epam.ridesharing.data.projections;

import com.epam.ridesharing.data.model.User;
import org.springframework.data.rest.core.config.Projection;

/**
 * Authentication projection to use proxy made by SpelAwareProxyProjectionFactory in AuthService instead of DTO.
 */
@Projection(name = "auth", types = User.class)
public interface AuthProjection {

    Long getId();

    String getEmail();

    String getName();

    String getRole();
}
