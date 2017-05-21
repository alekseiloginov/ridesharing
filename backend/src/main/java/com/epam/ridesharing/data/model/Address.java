package com.epam.ridesharing.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Getter
@ToString(callSuper = true)
public class Address extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    private double latitude;

    private double longitude;

    private String address;

    public enum Type {
        HOME, OFFICE
    }
}

