package com.epam.ridesharing.security.address;

import com.epam.ridesharing.config.auth.SecurityUser;
import com.epam.ridesharing.data.model.Address;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

/**
 * Created by Maksim_Popov on 5/23/2017.
 */
public class AddressOwnerIsAuthenticatedExpressionRoot
        extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

    public AddressOwnerIsAuthenticatedExpressionRoot(Authentication authentication) {
        super(authentication);
    }

    @Override
    public Object getFilterObject() {
        return null;
    }

    @Override
    public void setReturnObject(Object returnObject) {

    }

    @Override
    public Object getReturnObject() {
        return null;
    }

    @Override
    public Object getThis() {
        return null;
    }

    @Override
    public void setFilterObject(Object filterObject) {

    }

    public boolean isOwnerAuthenticates(Address object) {

        Address address = (Address) object;
        SecurityUser principal = (SecurityUser) getPrincipal();
        return address.getUser().getId().equals(principal.getId());
    }
}
