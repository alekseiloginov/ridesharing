--liquibase formatted sql

--changeset aloginov:1
CREATE TABLE address (
  id        BIGSERIAL               NOT NULL, -- (BIG)SERIAL added in H2 for PG compatibility and means AUTO_INCREMENT
  type      VARCHAR                 NOT NULL,
  address   VARCHAR,
  latitude  DOUBLE PRECISION        NOT NULL,
  longitude DOUBLE PRECISION        NOT NULL,
  version   BIGINT DEFAULT 0        NOT NULL,
  created   TIMESTAMP DEFAULT now() NOT NULL,
  modified  TIMESTAMP DEFAULT now() NOT NULL,
  CONSTRAINT address_pkey PRIMARY KEY (id)
);

--changeset aloginov:2
CREATE TABLE app_user (
  id               BIGSERIAL               NOT NULL,
  disabled         BOOLEAN DEFAULT FALSE   NOT NULL,
  name             VARCHAR,
  email            VARCHAR                 NOT NULL,
  role             VARCHAR,
  active           BOOLEAN DEFAULT TRUE    NOT NULL,
  phone            VARCHAR,
  driver           BOOLEAN DEFAULT FALSE   NOT NULL,
  in_office_hour   SMALLINT,
  from_office_hour SMALLINT,
  office_id        BIGINT,
  home_id          BIGINT,
  free_car_seats   SMALLINT,
  password         VARCHAR                 NOT NULL,
  version          BIGINT DEFAULT 0        NOT NULL,
  created          TIMESTAMP DEFAULT now() NOT NULL,
  modified         TIMESTAMP DEFAULT now() NOT NULL,
  CONSTRAINT app_user_pkey PRIMARY KEY (id)
);

--changeset aloginov:3
ALTER TABLE app_user
  ADD CONSTRAINT uk_user_email UNIQUE (email);

--changeset aloginov:4
CREATE INDEX fk_user_home_address_index
  ON app_user (home_id);

--changeset aloginov:5
CREATE INDEX fk_user_office_address_index
  ON app_user (office_id);

--changeset aloginov:6
ALTER TABLE app_user
  ADD CONSTRAINT fk_user_home_address FOREIGN KEY (home_id) REFERENCES address (id) ON DELETE SET NULL;

--changeset aloginov:7
ALTER TABLE app_user
  ADD CONSTRAINT fk_user_office_address FOREIGN KEY (office_id) REFERENCES address (id) ON DELETE SET NULL;
