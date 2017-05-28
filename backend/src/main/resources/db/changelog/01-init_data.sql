--liquibase formatted sql

--changeset aloginov:1
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'Zastavskaya, 22, SPB, RU', 59.888679, 30.327674); -- 1
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'nab. Chyornoy rechki, 41, SPB, RU', 59.985629, 30.307862); -- 2
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'Pevcheskiy, 12, SPB, RU', 59.960085, 30.324927); -- 3
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Koroleva, 34k1, SPB, RU', 60.014477, 30.259579); -- 4
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Petergofskoe av, 45', 59.849097, 30.152099); -- 5
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Kommunarov, 114, SPB, RU', 59.78433, 30.147422); -- 6
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Voronezhskaya, 5, SPB, RU', 59.918165, 30.348719); -- 7

--changeset aloginov:2
INSERT INTO car (free_seats) VALUES (3); -- 1
INSERT INTO car (free_seats) VALUES (2); -- 2

--changeset aloginov:3
INSERT INTO app_user (
  disabled, name, email, role, active, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  FALSE, 'Aleksei Loginov', 'Aleksei_Loginov@epam.com', 'ADMIN', TRUE, '+7 904 556-82-17', FALSE, 12, 20, 1, 4, NULL,
  now(), '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

INSERT INTO app_user (
  disabled, name, email, role, active, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  FALSE, 'Aleksei Egorov', 'Aleksei_Egorov@epam.com', 'ADMIN', TRUE, '+7 921 111-11-11', FALSE, 10, 19, 1, 5, NULL,
  now(), '$2a$10$POJ9JbGRLTQaKoktySlD9.ZOLgBPYzRjD/WBEIfpNgwFdjog/1hv6');

INSERT INTO app_user (
  disabled, name, email, role, active, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  FALSE, 'Maksim Zagorodskii', 'Maksim_Zagorodskii@epam.com', 'USER', TRUE, '+7 963 328-06-36', TRUE, 10, 20, 1, 6, 1,
  now(), '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

INSERT INTO app_user (
  disabled, name, email, role, active, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  FALSE, 'Oksana Kurilkina', 'Oksana_Kurilkina@epam.com', 'ADMIN', TRUE, '+7 911 962-05-01', TRUE, 11, 19, 1, 7, 2,
  now(), '$2a$10$ujMViPrKxGOCt311hvmTROKEjPajABM2/Rfsn/mKkfyEZBwUPkcQm');

