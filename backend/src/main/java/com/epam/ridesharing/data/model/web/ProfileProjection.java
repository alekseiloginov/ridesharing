package com.epam.ridesharing.data.model.web;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * Projection interface to render User office and home addresses instead of REST links.
 */
@Projection(name = "profile", types = User.class)
public interface ProfileProjection {
    Long getId();
    String getName();
    String getPhone();
    Address getHome();

    @Value("api/addresses/#{target.office.id}")
    String getOffice();

    @Value("#{target.office.id}")
    String getOfficeId();
}
