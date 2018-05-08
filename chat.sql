-- MySQL dump 10.13  Distrib 5.1.40, for apple-darwin9.5.0 (i386)
--
-- Host: localhost    Database: chat
-- ------------------------------------------------------
-- Server version	5.1.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `msg_room`
--

DROP TABLE IF EXISTS `msg_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msg_room` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `msg_id` int(3) NOT NULL,
  `room_id` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg_room`
--

LOCK TABLES `msg_room` WRITE;
/*!40000 ALTER TABLE `msg_room` DISABLE KEYS */;
INSERT INTO `msg_room` VALUES (1,1,1),(2,2,1);
/*!40000 ALTER TABLE `msg_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msg_text`
--

DROP TABLE IF EXISTS `msg_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msg_text` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `text` char(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg_text`
--

LOCK TABLES `msg_text` WRITE;
/*!40000 ALTER TABLE `msg_text` DISABLE KEYS */;
INSERT INTO `msg_text` VALUES (1,'<img src=\"/public/libs/kyo4311-jquery.qqface-32bf148/gif/fadai.gif\">'),(2,'<img src=\"/public/libs/kyo4311-jquery.qqface-32bf148/gif/se.gif\"><img src=\"/public/libs/kyo4311-jquery.qqface-32bf148/gif/se.gif\">');
/*!40000 ALTER TABLE `msg_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msg_time`
--

DROP TABLE IF EXISTS `msg_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msg_time` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `msg_id` int(3) NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg_time`
--

LOCK TABLES `msg_time` WRITE;
/*!40000 ALTER TABLE `msg_time` DISABLE KEYS */;
INSERT INTO `msg_time` VALUES (1,1,'21:52:45'),(2,2,'21:52:52');
/*!40000 ALTER TABLE `msg_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msg_user`
--

DROP TABLE IF EXISTS `msg_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msg_user` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `msg_id` int(3) NOT NULL,
  `user_id` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg_user`
--

LOCK TABLES `msg_user` WRITE;
/*!40000 ALTER TABLE `msg_user` DISABLE KEYS */;
INSERT INTO `msg_user` VALUES (1,1,4),(2,2,4);
/*!40000 ALTER TABLE `msg_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_create_time`
--

DROP TABLE IF EXISTS `room_create_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_create_time` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `room_id` int(3) NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_create_time`
--

LOCK TABLES `room_create_time` WRITE;
/*!40000 ALTER TABLE `room_create_time` DISABLE KEYS */;
INSERT INTO `room_create_time` VALUES (1,1,'16:33:08');
/*!40000 ALTER TABLE `room_create_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_create_user`
--

DROP TABLE IF EXISTS `room_create_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_create_user` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `room_id` int(3) NOT NULL,
  `user_id` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_create_user`
--

LOCK TABLES `room_create_user` WRITE;
/*!40000 ALTER TABLE `room_create_user` DISABLE KEYS */;
INSERT INTO `room_create_user` VALUES (1,1,4);
/*!40000 ALTER TABLE `room_create_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_name`
--

DROP TABLE IF EXISTS `room_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_name` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `room_id` int(3) NOT NULL,
  `name` char(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_name`
--

LOCK TABLES `room_name` WRITE;
/*!40000 ALTER TABLE `room_name` DISABLE KEYS */;
INSERT INTO `room_name` VALUES (1,1,'public');
/*!40000 ALTER TABLE `room_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_space`
--

DROP TABLE IF EXISTS `room_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_space` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `space` char(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_space`
--

LOCK TABLES `room_space` WRITE;
/*!40000 ALTER TABLE `room_space` DISABLE KEYS */;
INSERT INTO `room_space` VALUES (1,'public');
/*!40000 ALTER TABLE `room_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_age`
--

DROP TABLE IF EXISTS `user_age`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_age` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `age` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_age`
--

LOCK TABLES `user_age` WRITE;
/*!40000 ALTER TABLE `user_age` DISABLE KEYS */;
INSERT INTO `user_age` VALUES (1,4,0);
/*!40000 ALTER TABLE `user_age` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_alias`
--

DROP TABLE IF EXISTS `user_alias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_alias` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `alias` char(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_alias`
--

LOCK TABLES `user_alias` WRITE;
/*!40000 ALTER TABLE `user_alias` DISABLE KEYS */;
INSERT INTO `user_alias` VALUES (1,4,'root');
/*!40000 ALTER TABLE `user_alias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_enroll_time`
--

DROP TABLE IF EXISTS `user_enroll_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_enroll_time` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_enroll_time`
--

LOCK TABLES `user_enroll_time` WRITE;
/*!40000 ALTER TABLE `user_enroll_time` DISABLE KEYS */;
INSERT INTO `user_enroll_time` VALUES (1,4,'16:30:16');
/*!40000 ALTER TABLE `user_enroll_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login_time`
--

DROP TABLE IF EXISTS `user_login_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_login_time` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login_time`
--

LOCK TABLES `user_login_time` WRITE;
/*!40000 ALTER TABLE `user_login_time` DISABLE KEYS */;
INSERT INTO `user_login_time` VALUES (1,4,'16:30:16');
/*!40000 ALTER TABLE `user_login_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_name_password`
--

DROP TABLE IF EXISTS `user_name_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_name_password` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` char(100) COLLATE utf8_bin NOT NULL,
  `password` char(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_name_password`
--

LOCK TABLES `user_name_password` WRITE;
/*!40000 ALTER TABLE `user_name_password` DISABLE KEYS */;
INSERT INTO `user_name_password` VALUES (4,'root','root');
/*!40000 ALTER TABLE `user_name_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_room`
--

DROP TABLE IF EXISTS `user_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_room` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `room_id` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_room`
--

LOCK TABLES `user_room` WRITE;
/*!40000 ALTER TABLE `user_room` DISABLE KEYS */;
INSERT INTO `user_room` VALUES (1,4,1);
/*!40000 ALTER TABLE `user_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sex`
--

DROP TABLE IF EXISTS `user_sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sex` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `sex` enum('男','女','无') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sex`
--

LOCK TABLES `user_sex` WRITE;
/*!40000 ALTER TABLE `user_sex` DISABLE KEYS */;
INSERT INTO `user_sex` VALUES (1,4,'');
/*!40000 ALTER TABLE `user_sex` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-08 21:58:00
