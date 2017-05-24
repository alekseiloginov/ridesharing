package com.epam.ridesharing.config.auth;

import com.epam.ridesharing.security.address.AddressOwnerIsAuthenticatedExpressionHandler;
import com.epam.ridesharing.security.address.CustomPermissionEvaluator;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

/**
 * Created by Maksim_Popov on 5/23/2017.
 */
@Configuration
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {

    @Override
    protected MethodSecurityExpressionHandler createExpressionHandler() {
        AddressOwnerIsAuthenticatedExpressionHandler expressionHandler =
                new AddressOwnerIsAuthenticatedExpressionHandler();
        expressionHandler.setPermissionEvaluator(new CustomPermissionEvaluator());
        return expressionHandler;
    }
}
