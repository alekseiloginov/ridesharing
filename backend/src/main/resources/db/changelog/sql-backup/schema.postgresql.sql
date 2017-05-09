--liquibase formatted sql

--changeset aloginov:1
CREATE TABLE address (
  id        BIGSERIAL    NOT NULL,
  type      VARCHAR(255) NOT NULL,
  address   VARCHAR(255),
  latitude  FLOAT8       NOT NULL,
  longitude FLOAT8       NOT NULL,
  CONSTRAINT address_pkey PRIMARY KEY (id)
);

--changeset aloginov:2
CREATE TABLE app_user (
  id               BIGSERIAL    NOT NULL,
  active           BOOLEAN      NOT NULL,
  name             VARCHAR(255),
  email            VARCHAR(255) NOT NULL,
  role             VARCHAR(255),
  phone            VARCHAR(255),
  driver           BOOLEAN      NOT NULL,
  in_office_hour   INT,
  from_office_hour INT,
  office_id        BIGINT,
  home_id          BIGINT,
  car_id           BIGINT,
  created          TIMESTAMP WITHOUT TIME ZONE,
  password         VARCHAR(255) NOT NULL,
  CONSTRAINT app_user_pkey PRIMARY KEY (id)
);

--changeset aloginov:3
CREATE TABLE car (
  id         BIGSERIAL NOT NULL,
  free_seats INT,
  CONSTRAINT car_pkey PRIMARY KEY (id)
);

--changeset aloginov:4
ALTER TABLE app_user
  ADD CONSTRAINT uk_user_email UNIQUE (email);

--changeset aloginov:5
CREATE INDEX fk_user_car_index
  ON app_user (car_id);

--changeset aloginov:6
CREATE INDEX fk_user_home_address_index
  ON app_user (home_id);

--changeset aloginov:7
CREATE INDEX fk_user_office_address_index
  ON app_user (office_id);

--changeset aloginov:8
ALTER TABLE app_user
  ADD CONSTRAINT fk_user_car FOREIGN KEY (car_id) REFERENCES car (id) ON UPDATE CASCADE ON DELETE SET NULL;

--changeset aloginov:9
ALTER TABLE app_user
  ADD CONSTRAINT fk_user_home_address FOREIGN KEY (home_id) REFERENCES address (id) ON UPDATE CASCADE ON DELETE SET NULL;

--changeset aloginov:10
ALTER TABLE app_user
  ADD CONSTRAINT fk_user_office_address FOREIGN KEY (office_id) REFERENCES address (id) ON UPDATE CASCADE ON DELETE SET NULL;

