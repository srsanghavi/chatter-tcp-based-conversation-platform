-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema messaging
-- -----------------------------------------------------
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `conversations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `conversations` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 797
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groups` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `createdOn` DATETIME NOT NULL,
  `modifiedOn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation_id` INT(11) NOT NULL,
  `isSearchable` TINYINT(4) NOT NULL DEFAULT '1',
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `deleted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `conversation_id`),
  INDEX `fk_groups_conversations1_idx` (`conversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_groups_conversations`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `conversations` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 396
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modify` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` VARCHAR(50) NOT NULL,
  `isSearchable` TINYINT(4) NOT NULL DEFAULT '1',
  `deleted` TINYINT(4) NULL DEFAULT NULL,
  `profilePicture` VARCHAR(255) NULL DEFAULT 'https://s3.amazonaws.com/cs5500/u/default.png\n',
  `preferredLanguage` VARCHAR(45) NOT NULL DEFAULT 'English',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1598
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `groups_has_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groups_has_users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `groups_has_users` (
  `Groups_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Users_id` INT(11) NOT NULL,
  `is_admin` TINYINT(4) NOT NULL DEFAULT '0',
  `added_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Groups_id`, `Users_id`),
  INDEX `fk_groups_has_users_users1_idx` (`Users_id` ASC) VISIBLE,
  INDEX `fk_groups_has_users_groups1_idx` (`Groups_id` ASC) VISIBLE,
  CONSTRAINT `fk_Groups_has_Users_Groups1`
    FOREIGN KEY (`Groups_id`)
    REFERENCES `groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Groups_has_Users_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 396
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `thread`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thread` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `thread` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversations_id` INT(11) NOT NULL,
  `deleted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `conversations_id`),
  INDEX `fk_Thread_Conversations1_idx` (`conversations_id` ASC) VISIBLE,
  CONSTRAINT `fk_Thread_Conversations1`
    FOREIGN KEY (`conversations_id`)
    REFERENCES `conversations` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2768
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `message` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `text` TEXT NULL DEFAULT NULL,
  `createdOn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thread_id` INT(11) NOT NULL,
  `sender_id` INT(11) NOT NULL,
  `deleted` TINYINT(4) NULL DEFAULT NULL,
  `mediaURL` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `thread_id`, `sender_id`),
  INDEX `fk_message_thread1_idx` (`thread_id` ASC) VISIBLE,
  INDEX `fk_Message_Users1_idx` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `fk_Message_Thread1`
    FOREIGN KEY (`thread_id`)
    REFERENCES `thread` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Message_Users1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2065
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `users_converses_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users_converses_users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `users_converses_users` (
  `Users_id` INT(11) NOT NULL,
  `Users_id1` INT(11) NOT NULL,
  `Conversations_id` INT(11) NOT NULL,
  PRIMARY KEY (`Users_id`, `Users_id1`, `Conversations_id`),
  INDEX `fk_Users_has_Users_Users1_idx` (`Users_id1` ASC) VISIBLE,
  INDEX `fk_Users_has_Users_Users_idx` (`Users_id` ASC) VISIBLE,
  INDEX `fk_Users_converses_Users_Conversations1_idx` (`Conversations_id` ASC) VISIBLE,
  CONSTRAINT `fk_Users_converses_Users_Conversations1`
    FOREIGN KEY (`Conversations_id`)
    REFERENCES `conversations` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Users_Users`
    FOREIGN KEY (`Users_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Users_Users1`
    FOREIGN KEY (`Users_id1`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure message_in_conversation
-- -----------------------------------------------------
DROP procedure IF EXISTS `message_in_conversation`;
SHOW WARNINGS;

DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `message_in_conversation`(IN `cid` int)
BEGIN
	SELECT conversations_id, thread_id, m.id as message_id, text, mediaURL as media_url, m.createdOn as message_created_on, sender_id, u.username, u.first_name, u.last_name
    FROM ((conversations join thread on conversations.id = thread.conversations_id) join
				message as m 
				ON	thread.id = m.thread_id) JOIN
                users as u ON sender_id = u.id
	WHERE conversations_id = cid;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function user_auth
-- -----------------------------------------------------
DROP function IF EXISTS `user_auth`;
SHOW WARNINGS;

DELIMITER $$
CREATE DEFINER=`admin`@`%` FUNCTION `user_auth`(`username` VARCHAR(45), `pass` VARCHAR(50)) RETURNS int(11)
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE retVal int;
	IF EXISTS (SELECT users.id, users.email FROM users WHERE users.username = username and users.password = MD5(pass))
		THEN
        SET retVal = 1;
	ELSE
		SET retVal = 0;
	END if;
    RETURN retVal;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function user_user_conversation
-- -----------------------------------------------------
DROP function IF EXISTS `user_user_conversation`;
SHOW WARNINGS;

DELIMITER $$
CREATE DEFINER=`admin`@`%` FUNCTION `user_user_conversation`(`userid1`  int, `userid2` int) RETURNS int(11)
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE retVal int;
	INSERT INTO conversations() values ();
	SELECT LAST_INSERT_ID() INTO retVal ;
	INSERT INTO users_converses_users(users_id,users_id1,conversations_id) VALUES (userid1,userid2,retVal);
	RETURN retVal;
END$$

DELIMITER ;
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
