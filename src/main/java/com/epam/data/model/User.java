package com.epam.data.model;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

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

    @OneToOne // cause based on unique coordinates rater than on address
    @Cascade(CascadeType.ALL)
    private Address home;

    @ManyToOne
    @Cascade(CascadeType.MERGE) // to avoid dupes in db
    private Address office;

    @OneToOne
    @Cascade(CascadeType.ALL)
    private Car car;

    public void setCreated(Date created) {
        this.created = created != null ? created : new Date();
    }

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
