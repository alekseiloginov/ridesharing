package com.epam.data.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Enumerated(EnumType.STRING)
    private Type type;
    private String address;
    private String latitude;
    private String longitude;

    public enum Type {
        HOME, OFFICE
    }
}

