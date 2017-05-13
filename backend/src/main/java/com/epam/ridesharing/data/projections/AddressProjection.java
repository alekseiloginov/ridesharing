package com.epam.ridesharing.data.projections;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.data.rest.core.config.Projection;

/**
 * Address projection to access User's office and home addresses in one go.
 */
@Projection(name = "addresses", types = User.class)
public interface AddressProjection {

    Address getOffice();

    Address getHome();
}
