package com.epam.ridesharing.data.model.web;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.data.rest.core.config.Projection;

/**
 * Projection interface to render User office and home addresses instead of REST links.
 */
@Projection(name = "addresses", types = User.class)
public interface UserProjection {

    Address getOffice();

    Address getHome();
}
