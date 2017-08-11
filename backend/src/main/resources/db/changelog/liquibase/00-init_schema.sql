--liquibase formatted sql

--changeset aloginov:1
CREATE TABLE address (
  id        BIGSERIAL PRIMARY KEY, -- (BIG)SERIAL works in H2 (for PG compatibility) and means AUTO_INCREMENT
  type      VARCHAR                 NOT NULL,
  address   VARCHAR,
  latitude  DOUBLE PRECISION        NOT NULL,
  longitude DOUBLE PRECISION        NOT NULL,
  version   BIGINT DEFAULT 0        NOT NULL,
  created   TIMESTAMP DEFAULT now() NOT NULL,
  modified  TIMESTAMP DEFAULT now() NOT NULL
);

--changeset aloginov:2
CREATE TABLE app_user (
  id               BIGSERIAL PRIMARY KEY,
  disabled         BOOLEAN DEFAULT FALSE   NOT NULL,
  name             VARCHAR,
  email            VARCHAR                 NOT NULL UNIQUE,
  role             VARCHAR,
  active           BOOLEAN DEFAULT TRUE    NOT NULL,
  phone            VARCHAR,
  driver           BOOLEAN DEFAULT FALSE   NOT NULL,
  in_office_hour   SMALLINT,
  from_office_hour SMALLINT,
  office_id        BIGINT REFERENCES address ON DELETE SET NULL,
  home_id          BIGINT REFERENCES address ON DELETE SET NULL,
  free_car_seats   SMALLINT,
  password         VARCHAR                 NOT NULL,
  version          BIGINT DEFAULT 0        NOT NULL,
  created          TIMESTAMP DEFAULT now() NOT NULL,
  modified         TIMESTAMP DEFAULT now() NOT NULL
);

--changeset aloginov:3
CREATE INDEX ON app_user (home_id); -- foreign key idx

--changeset aloginov:4
CREATE INDEX ON app_user (office_id); -- foreign key idx
