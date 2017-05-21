package com.epam.ridesharing.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@ToString(callSuper = true)
public class Car extends AbstractEntity {

    @Column(name = "free_seats") // explicitly state the column name
    private Integer freeSeats;
}
