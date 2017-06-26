--liquibase formatted sql

--changeset aloginov:1
CREATE TABLE ADDRESS (
  ID        BIGINT (19) AUTO_INCREMENT NOT NULL,
  TYPE      VARCHAR(255)              NOT NULL,
  ADDRESS   VARCHAR(255),
  LATITUDE  DOUBLE(17)                NOT NULL,
  LONGITUDE DOUBLE(17)                NOT NULL,
  VERSION   BIGINT (19) DEFAULT 0 NOT NULL,
  CREATED   TIMESTAMP DEFAULT NOW()   NOT NULL,
  MODIFIED  TIMESTAMP DEFAULT NOW()   NOT NULL,
  CONSTRAINT ADDRESS_PKEY PRIMARY KEY (ID)
);

--changeset aloginov:2
CREATE TABLE APP_USER (
  ID               BIGINT (19) AUTO_INCREMENT NOT NULL,
  DISABLED         BOOLEAN                   NOT NULL,
  NAME             VARCHAR(255),
  EMAIL            VARCHAR(255)              NOT NULL,
  ROLE             VARCHAR(255),
  ACTIVE           BOOLEAN (1) NOT NULL,
  PHONE            VARCHAR(255),
  DRIVER           BOOLEAN (1) NOT NULL,
  IN_OFFICE_HOUR   INT (10),
  FROM_OFFICE_HOUR INT (10),
  OFFICE_ID        BIGINT (19),
  HOME_ID          BIGINT (19),
  FREE_CAR_SEATS   INT (10),
  PASSWORD         VARCHAR(255)              NOT NULL,
  VERSION          BIGINT (19) DEFAULT 0 NOT NULL,
  CREATED          TIMESTAMP DEFAULT NOW()   NOT NULL,
  MODIFIED         TIMESTAMP DEFAULT NOW()   NOT NULL,
  CONSTRAINT APP_USER_PKEY PRIMARY KEY (ID)
);

--changeset aloginov:3
ALTER TABLE APP_USER
  ADD CONSTRAINT UK_USER_EMAIL UNIQUE (EMAIL);

--changeset aloginov:4
CREATE INDEX FK_USER_HOME_ADDRESS_INDEX
  ON APP_USER (HOME_ID);

--changeset aloginov:5
CREATE INDEX FK_USER_OFFICE_ADDRESS_INDEX
  ON APP_USER (OFFICE_ID);

--changeset aloginov:6
ALTER TABLE APP_USER
  ADD CONSTRAINT FK_USER_HOME_ADDRESS FOREIGN KEY (HOME_ID) REFERENCES ADDRESS (ID) ON UPDATE CASCADE ON DELETE SET NULL;

--changeset aloginov:7
ALTER TABLE APP_USER
  ADD CONSTRAINT FK_USER_OFFICE_ADDRESS FOREIGN KEY (OFFICE_ID) REFERENCES ADDRESS (ID) ON UPDATE CASCADE ON DELETE SET NULL;

