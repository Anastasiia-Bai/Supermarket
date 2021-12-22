CREATE DATABASE  IF NOT EXISTS `supermarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts_of_users`
--

DROP TABLE IF EXISTS `carts_of_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts_of_users` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `cartDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartId`),
  KEY `userId` (`userId`),
  CONSTRAINT `carts_of_users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_of_users`
--

LOCK TABLES `carts_of_users` WRITE;
/*!40000 ALTER TABLE `carts_of_users` DISABLE KEYS */;
INSERT INTO `carts_of_users` VALUES (1,123456789,'2021-11-08 16:04:55'),(2,256438765,'2021-11-11 10:13:24'),(3,376854194,'2021-11-11 10:14:17'),(5,537629175,'2021-11-11 10:59:33'),(6,648308254,'2021-11-16 08:44:06'),(13,725384519,'2021-11-16 09:39:24'),(14,285401539,'2021-11-20 16:06:50');
/*!40000 ALTER TABLE `carts_of_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Milk & Eggs'),(2,'Vegetables & Fruits'),(3,'Meat & Fish'),(4,'Drinks'),(5,'Bread/Bakery'),(6,'Frozen'),(7,'Candys'),(8,'Cleaners');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `cartId` int NOT NULL,
  `finalPrice` varchar(45) DEFAULT NULL,
  `sendCity` varchar(45) DEFAULT NULL,
  `sendStreet` varchar(45) DEFAULT NULL,
  `sendDate` date DEFAULT NULL,
  `orderDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payEnd` varchar(4) NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,123456789,1,'11.80','Haifa','Agmon','2009-11-20','2021-11-08 16:28:57','4356'),(43,725384519,13,'34.5','Haifa','qwe','2021-11-25','2021-11-18 12:14:52','4567'),(44,725384519,13,'21.7','Haifa','qwe','2021-11-19','2021-11-18 12:22:34','3456'),(45,725384519,13,'30.4','Haifa','qwe','2021-11-19','2021-11-18 12:23:43','3456'),(46,725384519,13,'10.6','Haifa','qwe','2021-11-20','2021-11-18 12:28:28','3456'),(47,725384519,13,'10.6','Haifa','qwe','2021-11-19','2021-11-18 12:39:02','3456'),(48,725384519,13,'10.6','Haifa','qwe','2021-11-19','2021-11-18 12:39:53','4567'),(49,725384519,13,'10.6','Haifa','qwe','2021-11-20','2021-11-18 12:40:48','3456'),(50,725384519,13,'10.6','Haifa','qwe','2021-11-19','2021-11-18 12:44:21','3456'),(51,725384519,13,'10.6','Haifa','qwe','2021-11-19','2021-11-18 13:03:23','3456'),(52,725384519,13,'22.5','Haifa','qwe','2021-11-19','2021-11-18 13:04:50','3456'),(53,725384519,13,'110','Haifa','qwe','2021-11-19','2021-11-18 13:08:17','6788'),(54,725384519,13,'110','Haifa','qwe','2021-11-19','2021-11-18 13:22:27','3456'),(55,725384519,13,'10.6','Haifa','qwe','2021-11-19','2021-11-18 13:27:34','3456'),(56,725384519,13,'81.8','Haifa','qwe','2021-11-23','2021-11-20 10:38:48','3456'),(57,725384519,13,'23.7','Haifa','qwe','2021-11-21','2021-11-20 16:05:30','6514');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Milk',1,'5.90','milk.jpg'),(2,'Yolo',1,'4.70','yolo.jpg'),(3,'Eggs',1,'11.9','eggs.jpg'),(4,'Chocolate milk',1,'7.90','shoko.jpg'),(5,'Banana',2,'7.90','banana.jpg'),(6,'Strawberry',2,'18.90','strawbery.jpg'),(7,'Clementine',2,'12.9','clementine.jpg'),(8,'Potato',2,'4.9','potato.jpg'),(9,'Pineapple',2,'45','pineapple.jpg'),(10,'Cucumber',2,'4.9','cucumber.jpg'),(11,'Onion',2,'3.9','onion.jpg'),(12,'Chicken',3,'35','chicken.jpg'),(13,'Steak',3,'55','steak.jpg'),(14,'Amnon',3,'29.90','fishAmnon.jpg'),(15,'Salmon',3,'89.90','salmon.jpg'),(16,'Neviot',4,'9.90','water.jpg'),(17,'Orange juice',4,'8.90','juice.jpg'),(18,'Coca Cola',4,'7.90','cola.jpg'),(19,'Bread',5,'14.90','bread.jpg'),(20,'Melawah',6,'23.80','melawah.jpg'),(21,'Jahnun',6,'19.40','jahnun.jpg'),(22,'Bamba',7,'5.90','bamba.jpg'),(23,'Nutella',7,'12.50','nutella.jpg'),(24,'Loacker - chocolate',7,'11.90','loacker.jpg'),(25,'Oreo',7,'8.90','oreo.jpg'),(26,'Cilit Bang',8,'11.90','cilitBang.jpg'),(27,'Economica - Sano',8,'14.90','economica.jpg'),(28,'Ritspaz - Sano',8,'16.90','ritspaz.jpg'),(29,'Softener - Sano Maxima',8,'19.90','softener.jpg'),(30,'Butter',1,'14.90','butter.jpg'),(31,'Pargit',3,'59.90','pargit.jpg'),(32,'Fanta',4,'5','fanta.jpg'),(33,'Sprite',4,'5','sprite.jpg'),(85,'Avocado',2,'17.90','avocado.png'),(94,'Tomato',2,'7.90','tomato.jpg'),(95,'Mango',2,'34.80','mango.jpg'),(96,'Cruason',5,'4.70','cruason.jpg'),(97,'Chocolate',7,'4.90','chocolate.png'),(98,'Cheese',1,'32.80','cheese.jpg'),(99,'Chips',6,'19.90','frozenChips.jpg'),(100,'Yogurt',1,'5.90','yogurt.jpg'),(102,'Cottege',1,'5.80','cottege.png'),(103,'Persimmon',2,'24.90','persimmon.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_of_cart`
--

DROP TABLE IF EXISTS `products_of_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_of_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `amount` int DEFAULT NULL,
  `generalPrice` varchar(45) DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `cartId` (`cartId`),
  CONSTRAINT `products_of_cart_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `products_of_cart_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `carts_of_users` (`cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_of_cart`
--

LOCK TABLES `products_of_cart` WRITE;
/*!40000 ALTER TABLE `products_of_cart` DISABLE KEYS */;
INSERT INTO `products_of_cart` VALUES (7,18,2,'15.8',1),(11,15,1,'89.9',1),(13,2,2,'9.4',1),(20,1,1,'5.9',1),(36,16,1,'9.9',6);
/*!40000 ALTER TABLE `products_of_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (123456789,'test','test','test@gmail.com','c93d92653c4e1c58de0c45e28a795980','Haifa','Agmon','CUSTOMER'),(124356879,'Anastasiia','Bai','nessti@gmail.com','45bb3b629fd8492b579d1c812e39ecb7','Tel Aviv','Bosem','ADMIN'),(256438765,'test2','test2','test2@gmail.com','c93d92653c4e1c58de0c45e28a795980','Rishon Lezion','qwerty','CUSTOMER'),(285401539,'Test','Test','test10@gmail.com','c93d92653c4e1c58de0c45e28a795980','Rishon Lezion','qwerty','CUSTOMER'),(365749305,'test1','test1','test1@gmail.com','c93d92653c4e1c58de0c45e28a795980','Rishon Lezion','wer','CUSTOMER'),(376854194,'test4','test4','test4@gmail.com','c93d92653c4e1c58de0c45e28a795980','Petah Tikva','qwert','CUSTOMER'),(425876954,'test3','test3','test3@gmail.com','c93d92653c4e1c58de0c45e28a795980','Rishon Lezion','wert','CUSTOMER'),(438561056,'Test','Test','test9@gmail.com','c93d92653c4e1c58de0c45e28a795980','Haifa','Abas','CUSTOMER'),(439651920,'Anastasiia','Bai','anastasiia@gmail.com','c93d92653c4e1c58de0c45e28a795980','Tel Aviv','Bosem','CUSTOMER'),(537629175,'test5','test5','test5@gmail.com','c93d92653c4e1c58de0c45e28a795980','Petah Tikva','qwe','CUSTOMER'),(549321067,'Viktor','Bai','viktor@gmail.com','c93d92653c4e1c58de0c45e28a795980','Tel Aviv','Bosem','CUSTOMER'),(604756234,'Shlomi','Pick','shlomi@gmail.com','c93d92653c4e1c58de0c45e28a795980','Karmiel','Agmon','CUSTOMER'),(648308254,'test7','test7','test7@gmail.com','c93d92653c4e1c58de0c45e28a795980','Rishon Lezion','sdfgh','CUSTOMER'),(650342756,'Michael','Gersonsky','michael@gmail.com','c93d92653c4e1c58de0c45e28a795980','Ashdod','Pinhas Sapir','CUSTOMER'),(725384519,'test6','test6','test6@gmail.com','c93d92653c4e1c58de0c45e28a795980','Haifa','qwe','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-20 18:11:55
