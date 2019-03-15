-- MySQL dump 10.13  Distrib 8.0.15, for osx10.14 (x86_64)
--
-- Host: msd-project.cgxeszufief9.us-east-1.rds.amazonaws.com    Database: messaging
-- ------------------------------------------------------
-- Server version	5.6.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (19,'2019-03-14 15:49:01'),(21,'2019-03-14 22:12:25'),(22,'2019-03-14 23:42:58'),(23,'2019-03-14 23:44:44'),(24,'2019-03-14 23:45:25'),(25,'2019-03-15 00:00:10'),(26,'2019-03-15 00:05:55'),(27,'2019-03-15 00:06:38'),(28,'2019-03-15 00:10:51'),(29,'2019-03-15 00:13:56'),(30,'2019-03-15 00:21:18'),(31,'2019-03-15 00:24:30'),(32,'2019-03-15 00:26:29'),(33,'2019-03-15 00:27:36'),(34,'2019-03-15 00:32:30'),(35,'2019-03-15 00:39:04'),(36,'2019-03-15 00:41:04'),(37,'2019-03-15 00:41:33'),(38,'2019-03-15 00:43:40'),(39,'2019-03-15 00:46:39'),(43,'2019-03-15 00:48:30'),(45,'2019-03-15 00:50:51'),(46,'2019-03-15 01:05:39'),(48,'2019-03-15 01:07:12'),(50,'2019-03-15 01:10:06'),(52,'2019-03-15 01:13:51'),(54,'2019-03-15 01:16:36'),(56,'2019-03-15 01:16:46'),(58,'2019-03-15 01:17:22'),(60,'2019-03-15 01:20:58'),(62,'2019-03-15 01:26:43'),(64,'2019-03-15 01:29:31'),(66,'2019-03-15 01:35:12'),(68,'2019-03-15 01:54:40'),(70,'2019-03-15 03:22:24'),(72,'2019-03-15 03:32:32'),(74,'2019-03-15 03:38:02'),(76,'2019-03-15 03:39:08'),(78,'2019-03-15 03:46:53'),(80,'2019-03-15 03:49:37'),(82,'2019-03-15 04:19:33'),(84,'2019-03-15 04:22:02'),(86,'2019-03-15 04:24:22'),(88,'2019-03-15 04:34:47'),(90,'2019-03-15 04:53:36'),(92,'2019-03-15 05:44:34'),(94,'2019-03-15 05:50:03'),(96,'2019-03-15 05:55:07'),(98,'2019-03-15 06:11:24'),(100,'2019-03-15 06:16:10'),(102,'2019-03-15 06:26:48'),(104,'2019-03-15 06:27:04'),(106,'2019-03-15 06:28:56'),(108,'2019-03-15 06:32:56'),(110,'2019-03-15 06:39:17'),(112,'2019-03-15 06:53:01'),(114,'2019-03-15 06:53:26'),(116,'2019-03-15 06:54:03'),(118,'2019-03-15 14:47:25'),(119,'2019-03-15 17:21:31'),(121,'2019-03-15 17:36:09');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdOn` datetime NOT NULL,
  `modifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`conversation_id`),
  KEY `fk_groups_conversations1_idx` (`conversation_id`),
  CONSTRAINT `fk_groups_conversations` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'test_group_1','2019-03-14 23:42:58','2019-03-14 23:42:58',22),(2,'test_group_1','2019-03-14 23:44:44','2019-03-14 23:44:44',23),(3,'ManUtd','2019-03-14 23:45:25','2019-03-14 23:45:25',24),(4,'GroupByJunit','2019-03-15 00:00:10','2019-03-15 00:00:10',25),(5,'GroupByJunit','2019-03-15 00:05:55','2019-03-15 00:05:55',26),(6,'GroupByJunit','2019-03-15 00:06:38','2019-03-15 00:06:38',27),(7,'GroupByJunit','2019-03-15 00:10:51','2019-03-15 00:10:51',28),(8,'GroupByJunit','2019-03-15 00:13:56','2019-03-15 00:13:56',29),(9,'GroupByJunit','2019-03-15 00:21:18','2019-03-15 00:21:18',30),(10,'GroupByJunit','2019-03-15 00:24:30','2019-03-15 00:24:30',31),(11,'GroupByJunit','2019-03-15 00:26:29','2019-03-15 00:26:29',32),(12,'GroupByJunit','2019-03-15 00:27:36','2019-03-15 00:27:36',33),(13,'GroupByJunit','2019-03-15 00:32:30','2019-03-15 00:32:30',34),(14,'GroupByJunit','2019-03-15 00:39:04','2019-03-15 00:39:04',35),(15,'GroupByJunit','2019-03-15 00:41:04','2019-03-15 00:41:04',36),(16,'GroupByJunit','2019-03-15 00:41:33','2019-03-15 00:41:33',37),(17,'GroupByJunit','2019-03-15 00:43:40','2019-03-15 00:43:40',38),(18,'GroupByJunit','2019-03-15 00:46:39','2019-03-15 00:46:39',39),(19,'GroupByJunit','2019-03-15 00:48:30','2019-03-15 00:48:30',43),(20,'GroupByJunit','2019-03-15 00:50:51','2019-03-15 00:50:51',45),(21,'GroupByJunit','2019-03-15 01:05:39','2019-03-15 01:05:39',46),(22,'GroupByJunit','2019-03-15 01:07:12','2019-03-15 01:07:12',48),(23,'GroupByJunit','2019-03-15 01:10:06','2019-03-15 01:10:06',50),(24,'GroupByJunit','2019-03-15 01:13:51','2019-03-15 01:13:51',52),(25,'GroupByJunit','2019-03-15 01:16:36','2019-03-15 01:16:36',54),(26,'GroupByJunit','2019-03-15 01:16:46','2019-03-15 01:16:46',56),(27,'GroupByJunit','2019-03-15 01:17:22','2019-03-15 01:17:22',58),(28,'GroupByJunit','2019-03-15 01:20:58','2019-03-15 01:20:58',60),(29,'GroupByJunit','2019-03-15 01:26:43','2019-03-15 01:26:43',62),(30,'GroupByJunit','2019-03-15 01:29:31','2019-03-15 01:29:31',64),(31,'GroupByJunit','2019-03-15 01:35:12','2019-03-15 01:35:12',66),(32,'GroupByJunit','2019-03-15 01:54:40','2019-03-15 01:54:40',68),(33,'GroupByJunit','2019-03-15 03:22:24','2019-03-15 03:22:24',70),(34,'GroupByJunit','2019-03-15 03:32:32','2019-03-15 03:32:32',72),(35,'GroupByJunit','2019-03-15 03:38:02','2019-03-15 03:38:02',74),(36,'GroupByJunit','2019-03-15 03:39:08','2019-03-15 03:39:08',76),(37,'GroupByJunit','2019-03-15 03:46:53','2019-03-15 03:46:53',78),(38,'GroupByJunit','2019-03-15 03:49:37','2019-03-15 03:49:37',80),(39,'GroupByJunit','2019-03-15 04:19:33','2019-03-15 04:19:33',82),(40,'GroupByJunit','2019-03-15 04:22:02','2019-03-15 04:22:02',84),(41,'GroupByJunit','2019-03-15 04:24:22','2019-03-15 04:24:22',86),(42,'GroupByJunit','2019-03-15 04:34:47','2019-03-15 04:34:47',88),(43,'GroupByJunit','2019-03-15 04:53:36','2019-03-15 04:53:36',90),(44,'GroupByJunit','2019-03-15 05:44:34','2019-03-15 05:44:34',92),(45,'GroupByJunit','2019-03-15 05:50:03','2019-03-15 05:50:03',94),(46,'GroupByJunit','2019-03-15 05:55:07','2019-03-15 05:55:07',96),(47,'GroupByJunit','2019-03-15 06:11:24','2019-03-15 06:11:24',98),(48,'GroupByJunit','2019-03-15 06:16:10','2019-03-15 06:16:10',100),(49,'GroupByJunit','2019-03-15 06:26:48','2019-03-15 06:26:48',102),(50,'GroupByJunit','2019-03-15 06:27:04','2019-03-15 06:27:04',104),(51,'GroupByJunit','2019-03-15 06:28:56','2019-03-15 06:28:56',106),(52,'GroupByJunit','2019-03-15 06:32:56','2019-03-15 06:32:56',108),(53,'GroupByJunit','2019-03-15 06:39:17','2019-03-15 06:39:17',110),(54,'GroupByJunit','2019-03-15 06:53:01','2019-03-15 06:53:01',112),(55,'GroupByJunit','2019-03-15 06:53:26','2019-03-15 06:53:26',114),(56,'GroupByJunit','2019-03-15 06:54:03','2019-03-15 06:54:03',116),(57,'GroupByJunit','2019-03-15 14:47:25','2019-03-15 14:47:25',118),(58,'GroupByJunit','2019-03-15 17:36:09','2019-03-15 17:36:09',121);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_has_users`
--

DROP TABLE IF EXISTS `groups_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `groups_has_users` (
  `Groups_id` int(11) NOT NULL AUTO_INCREMENT,
  `Users_id` int(11) NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Groups_id`,`Users_id`),
  KEY `fk_groups_has_users_users1_idx` (`Users_id`),
  KEY `fk_groups_has_users_groups1_idx` (`Groups_id`),
  CONSTRAINT `fk_Groups_has_Users_Groups1` FOREIGN KEY (`Groups_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Groups_has_Users_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_has_users`
--

LOCK TABLES `groups_has_users` WRITE;
/*!40000 ALTER TABLE `groups_has_users` DISABLE KEYS */;
INSERT INTO `groups_has_users` VALUES (1,1,1,'2019-03-14 23:42:58'),(2,1,1,'2019-03-14 23:44:44'),(3,21,1,'2019-03-14 23:45:25'),(4,1,1,'2019-03-15 00:00:10'),(4,8,1,'2019-03-15 00:00:11'),(4,21,0,'2019-03-15 00:00:10'),(5,1,1,'2019-03-15 00:05:55'),(5,8,1,'2019-03-15 00:05:55'),(5,21,0,'2019-03-15 00:05:55'),(6,1,1,'2019-03-15 00:06:38'),(6,8,1,'2019-03-15 00:06:38'),(6,21,0,'2019-03-15 00:06:38'),(7,1,1,'2019-03-15 00:10:51'),(7,8,1,'2019-03-15 00:10:51'),(7,21,0,'2019-03-15 00:10:51'),(8,1,1,'2019-03-15 00:13:56'),(8,8,1,'2019-03-15 00:13:56'),(8,21,0,'2019-03-15 00:13:56'),(9,1,1,'2019-03-15 00:21:18'),(9,8,1,'2019-03-15 00:21:19'),(9,21,0,'2019-03-15 00:21:19'),(10,1,1,'2019-03-15 00:24:30'),(10,8,1,'2019-03-15 00:24:30'),(10,21,0,'2019-03-15 00:24:30'),(11,1,1,'2019-03-15 00:26:29'),(11,8,1,'2019-03-15 00:26:29'),(11,21,0,'2019-03-15 00:26:29'),(12,1,1,'2019-03-15 00:27:36'),(12,8,1,'2019-03-15 00:27:36'),(12,21,0,'2019-03-15 00:27:36'),(13,1,1,'2019-03-15 00:32:30'),(13,8,1,'2019-03-15 00:32:30'),(13,21,0,'2019-03-15 00:32:30'),(14,1,1,'2019-03-15 00:39:04'),(14,8,1,'2019-03-15 00:39:04'),(14,21,0,'2019-03-15 00:39:04'),(15,1,1,'2019-03-15 00:41:04'),(15,8,1,'2019-03-15 00:41:04'),(15,21,0,'2019-03-15 00:41:04'),(16,1,1,'2019-03-15 00:41:33'),(16,8,1,'2019-03-15 00:41:33'),(16,21,0,'2019-03-15 00:41:33'),(17,1,1,'2019-03-15 00:43:40'),(17,8,1,'2019-03-15 00:43:40'),(17,21,0,'2019-03-15 00:43:40'),(18,1,1,'2019-03-15 00:46:39'),(18,8,1,'2019-03-15 00:46:39'),(18,21,0,'2019-03-15 00:46:39'),(19,1,1,'2019-03-15 00:48:30'),(19,8,1,'2019-03-15 00:48:30'),(19,21,0,'2019-03-15 00:48:30'),(20,1,1,'2019-03-15 00:50:51'),(20,8,1,'2019-03-15 00:50:51'),(20,21,0,'2019-03-15 00:50:51'),(21,1,1,'2019-03-15 01:05:39'),(21,8,1,'2019-03-15 01:05:39'),(21,21,0,'2019-03-15 01:05:39'),(22,1,1,'2019-03-15 01:07:12'),(22,8,1,'2019-03-15 01:07:12'),(22,21,0,'2019-03-15 01:07:12'),(23,1,1,'2019-03-15 01:10:06'),(23,8,1,'2019-03-15 01:10:06'),(23,21,0,'2019-03-15 01:10:06'),(24,1,1,'2019-03-15 01:13:51'),(24,8,1,'2019-03-15 01:13:51'),(24,21,0,'2019-03-15 01:13:51'),(25,1,1,'2019-03-15 01:16:36'),(25,8,1,'2019-03-15 01:16:36'),(25,21,0,'2019-03-15 01:16:36'),(26,1,1,'2019-03-15 01:16:46'),(26,8,1,'2019-03-15 01:16:46'),(26,21,0,'2019-03-15 01:16:46'),(27,1,1,'2019-03-15 01:17:22'),(27,8,1,'2019-03-15 01:17:22'),(27,21,0,'2019-03-15 01:17:22'),(28,1,1,'2019-03-15 01:20:58'),(28,8,1,'2019-03-15 01:20:58'),(28,21,0,'2019-03-15 01:20:58'),(29,1,1,'2019-03-15 01:26:43'),(29,8,1,'2019-03-15 01:26:43'),(29,21,0,'2019-03-15 01:26:43'),(30,1,1,'2019-03-15 01:29:31'),(30,8,1,'2019-03-15 01:29:31'),(30,21,0,'2019-03-15 01:29:31'),(31,1,1,'2019-03-15 01:35:12'),(31,8,1,'2019-03-15 01:35:12'),(31,21,0,'2019-03-15 01:35:12'),(32,1,1,'2019-03-15 01:54:40'),(32,8,1,'2019-03-15 01:54:40'),(32,21,0,'2019-03-15 01:54:40'),(33,1,1,'2019-03-15 03:22:24'),(33,8,1,'2019-03-15 03:22:24'),(33,21,0,'2019-03-15 03:22:24'),(34,1,1,'2019-03-15 03:32:32'),(34,8,1,'2019-03-15 03:32:32'),(34,21,0,'2019-03-15 03:32:32'),(35,1,1,'2019-03-15 03:38:02'),(35,8,1,'2019-03-15 03:38:02'),(35,21,0,'2019-03-15 03:38:02'),(36,1,1,'2019-03-15 03:39:08'),(36,8,1,'2019-03-15 03:39:08'),(36,21,0,'2019-03-15 03:39:08'),(37,1,1,'2019-03-15 03:46:53'),(37,8,1,'2019-03-15 03:46:53'),(37,21,0,'2019-03-15 03:46:53'),(38,1,1,'2019-03-15 03:49:37'),(38,8,1,'2019-03-15 03:49:37'),(38,21,0,'2019-03-15 03:49:37'),(39,1,1,'2019-03-15 04:19:33'),(39,8,1,'2019-03-15 04:19:33'),(39,21,0,'2019-03-15 04:19:33'),(40,1,1,'2019-03-15 04:22:02'),(40,8,1,'2019-03-15 04:22:02'),(40,21,0,'2019-03-15 04:22:02'),(41,1,1,'2019-03-15 04:24:22'),(41,8,1,'2019-03-15 04:24:22'),(41,21,0,'2019-03-15 04:24:22'),(42,1,1,'2019-03-15 04:34:47'),(42,8,1,'2019-03-15 04:34:47'),(42,21,0,'2019-03-15 04:34:47'),(43,1,1,'2019-03-15 04:53:36'),(43,8,1,'2019-03-15 04:53:36'),(43,21,0,'2019-03-15 04:53:36'),(44,1,1,'2019-03-15 05:44:34'),(44,8,1,'2019-03-15 05:44:34'),(44,21,0,'2019-03-15 05:44:34'),(45,1,1,'2019-03-15 05:50:03'),(45,8,1,'2019-03-15 05:50:03'),(45,21,0,'2019-03-15 05:50:03'),(46,1,1,'2019-03-15 05:55:07'),(46,8,1,'2019-03-15 05:55:07'),(46,21,0,'2019-03-15 05:55:07'),(47,1,1,'2019-03-15 06:11:24'),(47,8,1,'2019-03-15 06:11:24'),(47,21,0,'2019-03-15 06:11:24'),(48,1,1,'2019-03-15 06:16:10'),(48,8,1,'2019-03-15 06:16:10'),(48,21,0,'2019-03-15 06:16:10'),(49,1,1,'2019-03-15 06:26:48'),(49,8,1,'2019-03-15 06:26:48'),(49,21,0,'2019-03-15 06:26:48'),(50,1,1,'2019-03-15 06:27:04'),(50,8,1,'2019-03-15 06:27:04'),(50,21,0,'2019-03-15 06:27:04'),(51,1,1,'2019-03-15 06:28:56'),(51,8,1,'2019-03-15 06:28:57'),(51,21,0,'2019-03-15 06:28:57'),(52,1,1,'2019-03-15 06:32:56'),(52,8,1,'2019-03-15 06:32:56'),(52,21,0,'2019-03-15 06:32:56'),(53,1,1,'2019-03-15 06:39:17'),(53,8,1,'2019-03-15 06:39:17'),(53,21,0,'2019-03-15 06:39:17'),(54,1,1,'2019-03-15 06:53:01'),(54,8,1,'2019-03-15 06:53:01'),(54,21,0,'2019-03-15 06:53:01'),(55,1,1,'2019-03-15 06:53:26'),(55,8,1,'2019-03-15 06:53:26'),(55,21,0,'2019-03-15 06:53:26'),(56,1,1,'2019-03-15 06:54:03'),(56,8,1,'2019-03-15 06:54:03'),(56,21,0,'2019-03-15 06:54:03'),(57,1,1,'2019-03-15 14:47:25'),(57,8,1,'2019-03-15 14:47:25'),(57,21,0,'2019-03-15 14:47:25'),(58,1,1,'2019-03-15 17:36:09'),(58,8,1,'2019-03-15 17:36:09'),(58,21,0,'2019-03-15 17:36:09');
/*!40000 ALTER TABLE `groups_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thread_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`thread_id`,`sender_id`),
  KEY `fk_message_thread1_idx` (`thread_id`),
  KEY `fk_Message_Users1_idx` (`sender_id`),
  CONSTRAINT `fk_Message_Thread1` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Message_Users1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (17,'Hello, testcase from junit.','2019-03-14 22:12:25',22,21),(18,'Hello, testcase from junit - 2.','2019-03-14 22:16:34',23,21),(19,'Hello, testcase from junit.','2019-03-14 22:35:44',24,21),(31,'Hello, testcase from junit - 2.','2019-03-15 00:13:56',53,21),(32,'Hello, testcase from junit - 2.','2019-03-15 00:14:31',56,21),(33,'Hello, testcase from junit - 2.','2019-03-15 00:17:33',59,21),(34,'Hello, testcase from junit - 2.','2019-03-15 00:21:18',62,21),(35,'Hello, testcase from junit - 2.','2019-03-15 00:24:25',65,21),(36,'Hello, testcase from junit - 2.','2019-03-15 00:26:22',68,21),(37,'Hello, testcase from junit - 2.','2019-03-15 00:27:30',71,21),(38,'Hello, testcase from junit - 2.','2019-03-15 00:32:26',74,21),(39,'Hello, testcase from junit - 2.','2019-03-15 00:39:04',77,21),(40,'Hello, testcase from junit - 2.','2019-03-15 00:40:57',80,21),(41,'Hello, testcase from junit - 2.','2019-03-15 00:41:28',83,21),(42,'Hello, testcase from junit - 2.','2019-03-15 00:43:40',86,21),(43,'Hello, testcase from junit - 2.','2019-03-15 00:46:34',89,21),(44,'Hello, testcase from junit - 2.','2019-03-15 00:48:29',92,21),(45,'Hello, testcase from junit - 2.','2019-03-15 00:50:45',95,21),(46,'Hello, testcase from junit - 2.','2019-03-15 01:05:34',98,21),(47,'this is a message!','2019-03-15 01:06:54',99,1),(48,'Hello, testcase from junit - 2.','2019-03-15 01:07:12',102,21),(49,'this is a message!','2019-03-15 01:07:19',103,1),(50,'this is a message!','2019-03-15 01:09:41',104,1),(51,'Hello, testcase from junit - 2.','2019-03-15 01:10:00',107,21),(52,'this is a message!','2019-03-15 01:13:28',108,1),(53,'Hello, testcase from junit - 2.','2019-03-15 01:13:46',111,21),(54,'this is a message!','2019-03-15 01:16:04',112,1),(55,'this is a message!','2019-03-15 01:16:11',113,1),(56,'Hello, testcase from junit - 2.','2019-03-15 01:16:28',116,21),(57,'Hello, testcase from junit - 2.','2019-03-15 01:16:38',119,21),(58,'this is a message!','2019-03-15 01:16:54',120,1),(59,'Hello, testcase from junit - 2.','2019-03-15 01:17:17',123,21),(60,'this is a message!','2019-03-15 01:20:35',124,1),(61,'Hello, testcase from junit - 2.','2019-03-15 01:20:54',127,21),(62,'this is a message!','2019-03-15 01:26:19',128,1),(63,'Hello, testcase from junit - 2.','2019-03-15 01:26:38',131,21),(64,'this is a message!','2019-03-15 01:28:53',132,1),(65,'Hello, testcase from junit - 2.','2019-03-15 01:29:25',135,21),(66,'this is a message!','2019-03-15 01:34:49',136,1),(67,'Hello, testcase from junit - 2.','2019-03-15 01:35:07',139,21),(68,'Hi, testing from JUnit for message store in DB.','2019-03-15 01:40:31',140,21),(69,'Hi, testing from JUnit for message store in DB.','2019-03-15 01:54:00',141,21),(70,'this is a message!','2019-03-15 01:54:17',142,1),(71,'Hello, testcase from junit - 2.','2019-03-15 01:54:35',145,21),(72,'Hello, testcase from junit - 2.','2019-03-15 03:22:22',148,21),(73,'Hello, testcase from junit - 2.','2019-03-15 03:32:26',151,21),(74,'Hello, testcase from junit - 2.','2019-03-15 03:38:00',154,21),(75,'Hello, testcase from junit - 2.','2019-03-15 03:39:06',157,21),(76,'Hello, testcase from junit - 2.','2019-03-15 03:46:50',160,21),(77,'Hello, testcase from junit - 2.','2019-03-15 03:49:32',163,21),(78,'Hi, testing from JUnit for message store in DB.','2019-03-15 04:10:54',164,21),(79,'Hi, testing from JUnit for message store in DB.','2019-03-15 04:14:12',165,21),(80,'Hello, testcase from junit - 2.','2019-03-15 04:19:32',168,21),(81,'Hi, testing from JUnit for message store in DB.','2019-03-15 04:19:33',169,21),(82,'this is a message!','2019-03-15 04:19:40',170,1),(83,'Hi, testing from JUnit for message store in DB.','2019-03-15 04:21:17',171,21),(84,'this is a message!','2019-03-15 04:21:35',172,1),(85,'Hello, testcase from junit - 2.','2019-03-15 04:21:56',175,21),(86,'Hi, testing from JUnit for message store in DB.','2019-03-15 04:23:40',176,21),(87,'this is a message!','2019-03-15 04:23:59',177,1),(88,'Hello, testcase from junit - 2.','2019-03-15 04:24:17',180,21),(89,'Hello, testcase from junit - 2.','2019-03-15 04:34:42',183,21),(90,'Hello, testcase from junit - 2.','2019-03-15 04:53:32',186,21),(91,'Hello, testcase from junit - 2.','2019-03-15 05:44:29',189,21),(92,'Hello, testcase from junit - 2.','2019-03-15 05:49:58',192,21),(93,'Hello, testcase from junit - 2.','2019-03-15 05:55:05',195,21),(94,'Hello, testcase from junit - 2.','2019-03-15 06:11:22',198,21),(95,'this is a message!','2019-03-15 06:11:42',199,1),(96,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:11:53',200,21),(97,'Hello, testcase from junit - 2.','2019-03-15 06:16:08',203,21),(98,'Hello, testcase from junit - 2.','2019-03-15 06:26:43',206,21),(99,'Hello, testcase from junit - 2.','2019-03-15 06:27:01',209,21),(100,'Hello, testcase from junit - 2.','2019-03-15 06:28:54',212,21),(101,'this is a message!','2019-03-15 06:29:14',213,1),(102,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:29:26',214,21),(103,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:32:15',215,21),(104,'this is a message!','2019-03-15 06:32:33',216,1),(105,'Hello, testcase from junit - 2.','2019-03-15 06:32:51',219,21),(106,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:38:36',220,21),(107,'this is a message!','2019-03-15 06:38:54',221,1),(108,'Hello, testcase from junit - 2.','2019-03-15 06:39:12',224,21),(109,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:51:52',225,21),(110,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:52:21',226,21),(111,'this is a message!','2019-03-15 06:52:25',227,1),(112,'Hello, testcase from junit - 2.','2019-03-15 06:52:50',230,21),(113,'this is a message!','2019-03-15 06:52:54',231,1),(114,'Hi, testing from JUnit for message store in DB.','2019-03-15 06:53:02',232,21),(115,'Hello, testcase from junit - 2.','2019-03-15 06:53:18',235,21),(116,'this is a message!','2019-03-15 06:53:32',236,1),(117,'Hello, testcase from junit - 2.','2019-03-15 06:53:52',239,21),(118,'Hi, testing from JUnit for message store in DB.','2019-03-15 14:46:34',240,21),(119,'this is a message!','2019-03-15 14:46:59',241,1),(120,'Hello, testcase from junit - 2.','2019-03-15 14:47:19',244,21),(121,'hi','2019-03-15 14:57:05',245,21),(122,'hi','2019-03-15 17:19:48',246,1),(123,'hi','2019-03-15 17:21:01',247,8),(124,'hello','2019-03-15 17:21:31',248,1),(125,'hello','2019-03-15 17:21:40',249,1),(126,'hi','2019-03-15 17:23:18',250,8),(127,'Hello ram, this is Shashwat. How are you?','2019-03-15 17:23:43',251,1),(128,'Bye','2019-03-15 17:23:51',252,8),(129,'Hi, testing from JUnit for message store in DB.','2019-03-15 17:35:27',253,21),(130,'this is a message!','2019-03-15 17:35:46',254,1),(131,'Hello, testcase from junit - 2.','2019-03-15 17:36:05',257,21);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversations_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`conversations_id`),
  KEY `fk_Thread_Conversations1_idx` (`conversations_id`),
  CONSTRAINT `fk_Thread_Conversations1` FOREIGN KEY (`conversations_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (22,'2019-03-14 22:12:25',21),(23,'2019-03-14 22:16:34',21),(24,'2019-03-14 22:35:44',21),(25,'2019-03-14 22:39:37',21),(51,'2019-03-15 00:13:56',21),(52,'2019-03-15 00:13:56',21),(53,'2019-03-15 00:13:56',21),(54,'2019-03-15 00:14:31',21),(55,'2019-03-15 00:14:31',21),(56,'2019-03-15 00:14:31',21),(57,'2019-03-15 00:17:33',21),(58,'2019-03-15 00:17:33',21),(59,'2019-03-15 00:17:33',21),(60,'2019-03-15 00:21:18',21),(61,'2019-03-15 00:21:18',21),(62,'2019-03-15 00:21:18',21),(63,'2019-03-15 00:24:25',21),(64,'2019-03-15 00:24:25',21),(65,'2019-03-15 00:24:25',21),(66,'2019-03-15 00:26:22',21),(67,'2019-03-15 00:26:22',21),(68,'2019-03-15 00:26:22',21),(69,'2019-03-15 00:27:30',21),(70,'2019-03-15 00:27:30',21),(71,'2019-03-15 00:27:30',21),(72,'2019-03-15 00:32:25',21),(73,'2019-03-15 00:32:25',21),(74,'2019-03-15 00:32:26',21),(75,'2019-03-15 00:39:04',21),(76,'2019-03-15 00:39:04',21),(77,'2019-03-15 00:39:04',21),(78,'2019-03-15 00:40:56',21),(79,'2019-03-15 00:40:57',21),(80,'2019-03-15 00:40:57',21),(81,'2019-03-15 00:41:28',21),(82,'2019-03-15 00:41:28',21),(83,'2019-03-15 00:41:28',21),(84,'2019-03-15 00:43:39',21),(85,'2019-03-15 00:43:39',21),(86,'2019-03-15 00:43:40',21),(87,'2019-03-15 00:46:34',21),(88,'2019-03-15 00:46:34',21),(89,'2019-03-15 00:46:34',21),(90,'2019-03-15 00:48:29',21),(91,'2019-03-15 00:48:29',21),(92,'2019-03-15 00:48:29',21),(93,'2019-03-15 00:50:45',21),(94,'2019-03-15 00:50:45',21),(95,'2019-03-15 00:50:45',21),(96,'2019-03-15 01:05:33',21),(97,'2019-03-15 01:05:33',21),(98,'2019-03-15 01:05:34',21),(99,'2019-03-15 01:06:54',21),(100,'2019-03-15 01:07:12',21),(101,'2019-03-15 01:07:12',21),(102,'2019-03-15 01:07:12',21),(103,'2019-03-15 01:07:19',21),(104,'2019-03-15 01:09:41',21),(105,'2019-03-15 01:10:00',21),(106,'2019-03-15 01:10:00',21),(107,'2019-03-15 01:10:00',21),(108,'2019-03-15 01:13:28',21),(109,'2019-03-15 01:13:45',21),(110,'2019-03-15 01:13:45',21),(111,'2019-03-15 01:13:46',21),(112,'2019-03-15 01:16:04',21),(113,'2019-03-15 01:16:11',21),(114,'2019-03-15 01:16:27',21),(115,'2019-03-15 01:16:27',21),(116,'2019-03-15 01:16:28',21),(117,'2019-03-15 01:16:38',21),(118,'2019-03-15 01:16:38',21),(119,'2019-03-15 01:16:38',21),(120,'2019-03-15 01:16:54',21),(121,'2019-03-15 01:17:17',21),(122,'2019-03-15 01:17:17',21),(123,'2019-03-15 01:17:17',21),(124,'2019-03-15 01:20:35',21),(125,'2019-03-15 01:20:53',21),(126,'2019-03-15 01:20:53',21),(127,'2019-03-15 01:20:54',21),(128,'2019-03-15 01:26:19',21),(129,'2019-03-15 01:26:37',21),(130,'2019-03-15 01:26:37',21),(131,'2019-03-15 01:26:38',21),(132,'2019-03-15 01:28:53',21),(133,'2019-03-15 01:29:24',21),(134,'2019-03-15 01:29:24',21),(135,'2019-03-15 01:29:25',21),(136,'2019-03-15 01:34:49',21),(137,'2019-03-15 01:35:07',21),(138,'2019-03-15 01:35:07',21),(139,'2019-03-15 01:35:07',21),(140,'2019-03-15 01:40:31',21),(141,'2019-03-15 01:54:00',21),(142,'2019-03-15 01:54:17',21),(143,'2019-03-15 01:54:35',21),(144,'2019-03-15 01:54:35',21),(145,'2019-03-15 01:54:35',21),(146,'2019-03-15 03:22:21',21),(147,'2019-03-15 03:22:22',21),(148,'2019-03-15 03:22:22',21),(149,'2019-03-15 03:32:26',21),(150,'2019-03-15 03:32:26',21),(151,'2019-03-15 03:32:26',21),(152,'2019-03-15 03:37:59',21),(153,'2019-03-15 03:37:59',21),(154,'2019-03-15 03:38:00',21),(155,'2019-03-15 03:39:06',21),(156,'2019-03-15 03:39:06',21),(157,'2019-03-15 03:39:06',21),(158,'2019-03-15 03:46:50',21),(159,'2019-03-15 03:46:50',21),(160,'2019-03-15 03:46:50',21),(161,'2019-03-15 03:49:31',21),(162,'2019-03-15 03:49:31',21),(163,'2019-03-15 03:49:32',21),(164,'2019-03-15 04:10:54',21),(165,'2019-03-15 04:14:12',21),(166,'2019-03-15 04:19:32',21),(167,'2019-03-15 04:19:32',21),(168,'2019-03-15 04:19:32',21),(169,'2019-03-15 04:19:33',21),(170,'2019-03-15 04:19:40',21),(171,'2019-03-15 04:21:17',21),(172,'2019-03-15 04:21:35',21),(173,'2019-03-15 04:21:56',21),(174,'2019-03-15 04:21:56',21),(175,'2019-03-15 04:21:56',21),(176,'2019-03-15 04:23:40',21),(177,'2019-03-15 04:23:59',21),(178,'2019-03-15 04:24:17',21),(179,'2019-03-15 04:24:17',21),(180,'2019-03-15 04:24:17',21),(181,'2019-03-15 04:34:41',21),(182,'2019-03-15 04:34:42',21),(183,'2019-03-15 04:34:42',21),(184,'2019-03-15 04:53:32',21),(185,'2019-03-15 04:53:32',21),(186,'2019-03-15 04:53:32',21),(187,'2019-03-15 05:44:29',21),(188,'2019-03-15 05:44:29',21),(189,'2019-03-15 05:44:29',21),(190,'2019-03-15 05:49:58',21),(191,'2019-03-15 05:49:58',21),(192,'2019-03-15 05:49:58',21),(193,'2019-03-15 05:55:05',21),(194,'2019-03-15 05:55:05',21),(195,'2019-03-15 05:55:05',21),(196,'2019-03-15 06:11:21',21),(197,'2019-03-15 06:11:21',21),(198,'2019-03-15 06:11:22',21),(199,'2019-03-15 06:11:42',21),(200,'2019-03-15 06:11:53',21),(201,'2019-03-15 06:16:07',21),(202,'2019-03-15 06:16:07',21),(203,'2019-03-15 06:16:08',21),(204,'2019-03-15 06:26:43',21),(205,'2019-03-15 06:26:43',21),(206,'2019-03-15 06:26:43',21),(207,'2019-03-15 06:27:01',21),(208,'2019-03-15 06:27:01',21),(209,'2019-03-15 06:27:01',21),(210,'2019-03-15 06:28:54',21),(211,'2019-03-15 06:28:54',21),(212,'2019-03-15 06:28:54',21),(213,'2019-03-15 06:29:14',21),(214,'2019-03-15 06:29:26',21),(215,'2019-03-15 06:32:15',21),(216,'2019-03-15 06:32:33',21),(217,'2019-03-15 06:32:51',21),(218,'2019-03-15 06:32:51',21),(219,'2019-03-15 06:32:51',21),(220,'2019-03-15 06:38:36',21),(221,'2019-03-15 06:38:54',21),(222,'2019-03-15 06:39:12',21),(223,'2019-03-15 06:39:12',21),(224,'2019-03-15 06:39:12',21),(225,'2019-03-15 06:51:52',21),(226,'2019-03-15 06:52:21',21),(227,'2019-03-15 06:52:25',21),(228,'2019-03-15 06:52:50',21),(229,'2019-03-15 06:52:50',21),(230,'2019-03-15 06:52:50',21),(231,'2019-03-15 06:52:54',21),(232,'2019-03-15 06:53:02',21),(233,'2019-03-15 06:53:18',21),(234,'2019-03-15 06:53:18',21),(235,'2019-03-15 06:53:18',21),(236,'2019-03-15 06:53:32',21),(237,'2019-03-15 06:53:52',21),(238,'2019-03-15 06:53:52',21),(239,'2019-03-15 06:53:52',21),(240,'2019-03-15 14:46:34',21),(241,'2019-03-15 14:46:58',21),(242,'2019-03-15 14:47:19',21),(243,'2019-03-15 14:47:19',21),(244,'2019-03-15 14:47:19',21),(245,'2019-03-15 14:57:05',21),(246,'2019-03-15 17:19:48',19),(247,'2019-03-15 17:21:01',19),(248,'2019-03-15 17:21:31',119),(249,'2019-03-15 17:21:40',19),(250,'2019-03-15 17:23:18',19),(251,'2019-03-15 17:23:43',19),(252,'2019-03-15 17:23:51',19),(253,'2019-03-15 17:35:27',21),(254,'2019-03-15 17:35:46',21),(255,'2019-03-15 17:36:04',21),(256,'2019-03-15 17:36:04',21),(257,'2019-03-15 17:36:04',21);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'srsanghavi','Shashwat','Sanghavi','sanghavi.s@husky.neu.edu','2019-03-13 20:42:07','2019-03-13 20:42:07','25d55ad283aa400af464c76d713c07ad'),(8,'ram','Ram','Prakash','ram@prattle.com','2019-03-13 23:27:13','2019-03-13 23:27:13','73803249c6667c5af2d51c0dedfae487'),(21,'hsbudhia','Himanshu','Budhia','budhia.h@husky.neu.edu','2019-03-14 00:33:33','2019-03-14 00:33:33','202cb962ac59075b964b07152d234b70');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_converses_users`
--

DROP TABLE IF EXISTS `users_converses_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_converses_users` (
  `Users_id` int(11) NOT NULL,
  `Users_id1` int(11) NOT NULL,
  `Conversations_id` int(11) NOT NULL,
  PRIMARY KEY (`Users_id`,`Users_id1`,`Conversations_id`),
  KEY `fk_Users_has_Users_Users1_idx` (`Users_id1`),
  KEY `fk_Users_has_Users_Users_idx` (`Users_id`),
  KEY `fk_Users_converses_Users_Conversations1_idx` (`Conversations_id`),
  CONSTRAINT `fk_Users_converses_Users_Conversations1` FOREIGN KEY (`Conversations_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Users_Users` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Users_Users1` FOREIGN KEY (`Users_id1`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_converses_users`
--

LOCK TABLES `users_converses_users` WRITE;
/*!40000 ALTER TABLE `users_converses_users` DISABLE KEYS */;
INSERT INTO `users_converses_users` VALUES (1,1,119),(1,8,19),(1,21,21);
/*!40000 ALTER TABLE `users_converses_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'messaging'
--
/*!50003 DROP FUNCTION IF EXISTS `create_group_with_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` FUNCTION `create_group_with_admin`(`gname` VARCHAR(50), `uid` INT) RETURNS int(11)
BEGIN
	DECLARE last_id int;
    IF NOT EXISTS (SELECT * FROM users WHERE id=uid) THEN
		RETURN -1;
	END IF;
	INSERT INTO conversations() VALUES ();
    SELECT LAST_INSERT_ID() into last_id;
    INSERT INTO groups(name, createdOn,conversation_id) VALUES (gname,CURRENT_TIMESTAMP,last_id);
    SELECT LAST_INSERT_ID() INTO last_id;
    INSERT INTO groups_has_users(Groups_id,Users_id,is_admin) VALUES (last_id, uid, 1);
    RETURN last_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `user_auth` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `user_user_conversation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` FUNCTION `user_user_conversation`(`userid1`  int, `userid2` int) RETURNS int(11)
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE retVal int;
	INSERT INTO conversations() values ();
	SELECT LAST_INSERT_ID() INTO retVal ;
	INSERT INTO users_converses_users(users_id,users_id1,conversations_id) VALUES (userid1,userid2,retVal);
	RETURN retVal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `message_in_conversation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `message_in_conversation`(IN `cid` int)
BEGIN
	SELECT conversations_id, thread_id, m.id as message_id, text, m.createdOn as message_created_on
    FROM (conversations join thread on conversations.id = thread.conversations_id) join
				message as m 
		ON	thread.id = m.thread_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-15 13:45:02
