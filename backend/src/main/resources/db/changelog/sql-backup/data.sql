--liquibase formatted sql

--changeset aloginov:1
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (1, 'OFFICE', 'Zastavskaya, 22, SPB, RU', 59.888679, 30.327674);
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (2, 'OFFICE', 'nab. Chyornoy rechki, 41, SPB, RU', 59.985629, 30.307862);
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (3, 'OFFICE', 'Pevcheskiy, 12, SPB, RU', 59.960085, 30.324927);
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (4, 'HOME', 'Koroleva, 34k1, SPB, RU', 60.014477, 30.259579);
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (5, 'HOME', 'Petergofskoe av, 45', 59.849097, 30.152099);
INSERT INTO address (id, type, address, latitude, longitude)
VALUES (6, 'HOME', 'Kommunarov, 114, SPB, RU', 59.78433, 30.147422);

--changeset aloginov:2
INSERT INTO car (id, free_seats) VALUES (1, 3);

--changeset aloginov:3
INSERT INTO app_user (
  id, active, name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  1, TRUE, 'Aleksei Loginov', 'Aleksei_Loginov@epam.com', 'ADMIN', '+7 904 556-82-17', FALSE, 12, 20, 1, 4, NULL, now(),
  '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

INSERT INTO app_user (
  id, active, name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  2, TRUE, 'Aleksei Egorov', 'Aleksei_Egorov@epam.com', 'ADMIN', '+7 921 111-11-11', FALSE, 10, 19, 1, 5, NULL, now(),
  '$2a$10$POJ9JbGRLTQaKoktySlD9.ZOLgBPYzRjD/WBEIfpNgwFdjog/1hv6');

INSERT INTO app_user (
  id, active, name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, car_id, created, password)
VALUES (
  3, TRUE, 'Maksim Zagorodskii', 'Maksim_Zagorodskii@epam.com', 'USER', '+7 963 328-06-36', TRUE, 10, 20, 1, 6, 1,
  now(), '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

