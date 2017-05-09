package com.epam.ridesharing.data.model;

import com.epam.ridesharing.auth.uimodel.BCryptPasswordDeserializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "app_user")
@Getter
@ToString(exclude = "password", callSuper = true)
public class User extends AbstractEntity {

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonDeserialize(using = BCryptPasswordDeserializer.class)
    @NotBlank
    private String password;

    private String name;
    private String phone;
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
