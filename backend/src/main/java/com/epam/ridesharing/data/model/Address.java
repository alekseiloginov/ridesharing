package com.epam.ridesharing.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

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

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    public enum Type {
        HOME, OFFICE
    }
}

