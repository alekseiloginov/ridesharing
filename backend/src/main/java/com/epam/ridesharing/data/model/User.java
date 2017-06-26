package com.epam.ridesharing.data.model;

import com.epam.ridesharing.auth.uimodel.BCryptPasswordDeserializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;

@Entity(name = "app_user")
@Getter
@ToString(exclude = "password", callSuper = true)
public class User extends AbstractEntity {

    @Email
    @NotBlank
    @Column(unique = true, nullable = false) // for db constraint @NotBlank is not enough
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonDeserialize(using = BCryptPasswordDeserializer.class)
    @NotBlank
    @Column(nullable = false) // for db constraint @NotBlank is not enough
    private String password;

    private String name;
    private String phone;
    private boolean driver;
    private boolean active;
    private boolean disabled;

    @Column(name = "in_office_hour")
    private Integer inOfficeHour;

    @Column(name = "from_office_hour")
    private Integer fromOfficeHour;

    @Enumerated(EnumType.STRING)
    private Role role;

    // CascadeType.ALL because home is based on unique coordinates rater than on address name
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Address home;

    @ManyToOne(cascade = CascadeType.MERGE) // CascadeType.MERGE to avoid duplicates in db
    private Address office;

    @Column(name = "free_car_seats")
    private Integer freeCarSeats;

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
