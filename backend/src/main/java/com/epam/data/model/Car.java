package com.epam.data.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;

@Entity
@Getter
@ToString(callSuper = true)
public class Car extends AbstractEntity {

    private Integer freeSeats;
}
