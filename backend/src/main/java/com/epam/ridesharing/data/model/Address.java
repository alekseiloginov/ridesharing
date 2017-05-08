package com.epam.ridesharing.data.model;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@ToString(callSuper = true)
public class Address extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    @NotNull
    private Type type;

    private double latitude;

    private double longitude;

    private String address;

    public enum Type {
        HOME, OFFICE
    }
}

