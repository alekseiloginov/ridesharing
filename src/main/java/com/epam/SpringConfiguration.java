package com.epam;

import com.epam.data.model.Address;
import com.epam.data.model.Car;
import com.epam.data.model.User;
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
        return super.config().exposeIdsFor(Address.class, User.class, Car.class);
    }
}
