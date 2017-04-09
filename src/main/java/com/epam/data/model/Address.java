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
    private String latitude;
    private String longitude;
    private String address;


    public String getId() {
        return id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public enum Type {
        HOME, OFFICE
    }
}

