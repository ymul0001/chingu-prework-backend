CREATE TABLE `notes`.`credential` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notes`.`note` (
  `note_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `note_title` varchar(255) NOT NULL,
  `note_description` mediumtext NOT NULL,
  PRIMARY KEY (`note_id`),
  UNIQUE KEY `note_id_UNIQUE` (`note_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `credential` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
