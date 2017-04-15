package com.epam.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@ToString(exclude = "password")
public class User extends AbstractEntity {

    private String name;
    private String phone;
    private String email;
    private String password;
    private Integer inOfficeHour;
    private Integer fromOfficeHour;
    private boolean driver;
    private boolean active;
    private Date created;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL) // cause based on unique coordinates rater than on address
    private Address home;

    @ManyToOne(cascade = CascadeType.MERGE) // to avoid dupes in db
    private Address office;

    @OneToOne(cascade = CascadeType.ALL)
    private Car car;

    public void setCreated(Date created) {
        this.created = created != null ? created : new Date();
    }

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
