--liquibase formatted sql

--changeset aloginov:1
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'Zastavskaya, 22', 59.888679, 30.327674);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'nab. Chyornoy rechki, 41', 59.985629, 30.307862);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('OFFICE', 'Pevcheskiy, 12', 59.960085, 30.324927);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Koroleva, 34k1', 60.014477, 30.259579);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Petergofskoe av, 45', 59.849097, 30.152099);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Kommunarov, 114', 59.78433, 30.147422);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Voronezhskaya, 5, Saint Petersburg', 59.918165, 30.348719);
INSERT INTO address (type, address, latitude, longitude)
VALUES ('HOME', 'Koroleva, 28', 60.012747, 30.266812);

--changeset aloginov:2
INSERT INTO app_user (
  name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, password)
VALUES (
  'Aleksei Loginov', 'Aleksei_Loginov@epam.com', 'ADMIN', '+7 904 556-82-17', FALSE, 12, 20,
  (SELECT id FROM address WHERE address = 'Zastavskaya, 22'),
  (SELECT id FROM address WHERE address = 'Koroleva, 34k1'),
  '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

INSERT INTO app_user (
  name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, password)
VALUES (
  'Aleksei Egorov', 'Aleksei_Egorov@epam.com', 'ADMIN', '+7 921 111-11-11', FALSE, 10, 19,
  (SELECT id FROM address WHERE address = 'Zastavskaya, 22'),
  (SELECT id FROM address WHERE address = 'Petergofskoe av, 45'),
  '$2a$10$POJ9JbGRLTQaKoktySlD9.ZOLgBPYzRjD/WBEIfpNgwFdjog/1hv6');

INSERT INTO app_user (
  name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, free_car_seats, password)
VALUES (
  'Maksim Zagorodskii', 'Maksim_Zagorodskii@epam.com', 'USER', '+7 963 328-06-36', TRUE, 10, 20,
  (SELECT id FROM address WHERE address = 'Zastavskaya, 22'),
  (SELECT id FROM address WHERE address = 'Kommunarov, 114'),
  3, '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

INSERT INTO app_user (
  name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, free_car_seats, password)
VALUES (
  'Oksana Kurilkina', 'Oksana_Kurilkina@epam.com', 'ADMIN', '+7 911 962-05-01', TRUE, 11, 19,
  (SELECT id FROM address WHERE address = 'Zastavskaya, 22'),
  (SELECT id FROM address WHERE address = 'Voronezhskaya, 5, Saint Petersburg'),
  2, '$2a$10$ujMViPrKxGOCt311hvmTROKEjPajABM2/Rfsn/mKkfyEZBwUPkcQm');

INSERT INTO app_user (
  name, email, role, phone, driver, in_office_hour, from_office_hour, office_id, home_id, free_car_seats, password)
VALUES (
  'Maxim Ivanov', 'Maxim_Ivanov2@epam.com', 'USER', '+7 921 556-77-45', TRUE, 12, 20,
  (SELECT id FROM address WHERE address = 'Zastavskaya, 22'),
  (SELECT id FROM address WHERE address = 'Koroleva, 28'),
  3, '$2a$10$P5Fx4JbwaXC.NaLNfnM3/O78WRKNKuk8ECxALmL440XBOQxzbSs8C');

