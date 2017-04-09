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

    public User() {
        this.created = new Date();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return "*****";
    }

    public Role getRole() {
        return role;
    }

    public Address getHome() {
        return home;
    }

    public Address getOffice() {
        return office;
    }

    public Integer getInOfficeHour() {
        return inOfficeHour;
    }

    public Integer getFromOfficeHour() {
        return fromOfficeHour;
    }

    public boolean isDriver() {
        return driver;
    }

    public Car getCar() {
        return car;
    }

    public boolean isActive() {
        return active;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setHome(Address home) {
        this.home = home;
    }

    public void setOffice(Address office) {
        this.office = office;
    }

    public void setInOfficeHour(Integer inOfficeHour) {
        this.inOfficeHour = inOfficeHour;
    }

    public void setFromOfficeHour(Integer fromOfficeHour) {
        this.fromOfficeHour = fromOfficeHour;
    }

    public void setDriver(boolean driver) {
        this.driver = driver;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
