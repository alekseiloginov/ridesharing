package com.epam.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Getter
@ToString(callSuper = true)
public class Address extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    private Type type;
    private String address;
    private String latitude;
    private String longitude;

    public enum Type {
        HOME, OFFICE
    }
}

