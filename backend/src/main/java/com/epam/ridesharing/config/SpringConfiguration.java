package com.epam.ridesharing.config;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.Car;
import com.epam.ridesharing.data.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * Custom Spring configuration.
 */
@Configuration
public class SpringConfiguration extends RepositoryRestMvcConfiguration {

    @Override
    public RepositoryRestConfiguration config() {
        return super.config().exposeIdsFor(Address.class, User.class, Car.class).setBasePath("/api");
    }
}
