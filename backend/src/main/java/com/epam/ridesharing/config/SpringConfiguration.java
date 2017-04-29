package com.epam.ridesharing.config;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.Car;
import com.epam.ridesharing.data.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.init.Jackson2RepositoryPopulatorFactoryBean;
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

    @Profile("DEV")
    @Bean
    public Jackson2RepositoryPopulatorFactoryBean repositoryPopulator() {
        Jackson2RepositoryPopulatorFactoryBean factory = new Jackson2RepositoryPopulatorFactoryBean();
        Resource[] sourceData = new Resource[]{
                new ClassPathResource("data/offices.json"),
                new ClassPathResource("data/users.json")};
        factory.setResources(sourceData);
        return factory;
    }
}
