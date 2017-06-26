package com.epam.ridesharing.data.model.projection;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Projection to expose audit attributes, which are ignored in json.
 */
@Projection(name = "audit", types = {User.class, Address.class})
public interface AuditProjection {

    Long getId();

    Date getCreated();

    Date getModified();
}
