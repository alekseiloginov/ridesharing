package com.epam.ridesharing.data.model.projection;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * Projection interface to expose user profile-specific attributes of User entity.
 */
@Projection(name = "profile", types = User.class)
public interface ProfileProjection {
    Long getId();
    String getName();
    String getPhone();
    Address getHome();
    boolean isDriver();
    boolean isActive();

    @Value("api/addresses/#{target.office.id}")
    String getOfficeUri();

    @Value("#{target.office.id}")
    String getOfficeId();
}
