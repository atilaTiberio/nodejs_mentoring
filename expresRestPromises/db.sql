

DROP DATABASE if exists nodejs_ccolorado;
CREATE DATABASE nodejs_ccolorado;
use nodejs_ccolorado;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


DROP TABLE IF EXISTS `expense`;
CREATE TABLE `expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usersid` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `amount` FLOAT NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usersid`) REFERENCES users(`id`)
);


INSERT INTO `users` VALUES (1, 'Carlos Colorado','carlos.colorado@internetbrands.com','pwd123','5554443332','2017-05-15 21:00:00','2017-05-15 21:00:00');

GRANT ALL PRIVILEGES on nodejs_ccolorado.* to 'hiturbe'@'%' IDENTIFIED BY 'Garcia@1';

GRANT ALL PRIVILEGES on nodejs_ccolorado.* to 'ccolorado'@'%' IDENTIFIED BY 'qwerty';
FLUSH PRIVILEGES;
