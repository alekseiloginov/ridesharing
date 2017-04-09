package com.epam.data.model;

import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String name;
    private String phone;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "HOME_ADDRESS_ID")
    @Cascade(CascadeType.PERSIST)
    private Address home;

    @ManyToOne
    @JoinColumn(name = "OFFICE_ADDRESS_ID")
    @Cascade(CascadeType.PERSIST)
    private Address office;

    private Integer inOfficeHour;
    private Integer fromOfficeHour;

    private boolean driver;

    @ManyToOne
    @JoinColumn(name = "CAR_ID")
    @Cascade(CascadeType.PERSIST)
    private Car car;

    private boolean active;
    private Date created;

    public void setCreated(Date created) {
        this.created = created != null ? created : new Date();
    }

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
