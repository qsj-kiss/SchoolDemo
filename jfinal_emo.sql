/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.26 : Database - jfinal_demo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jfinal_demo` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `jfinal_demo`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `ad_username` varchar(20) NOT NULL,
  `ad_password` varchar(50) NOT NULL,
  PRIMARY KEY (`ad_id`),
  UNIQUE KEY `ad_username` (`ad_username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`ad_id`,`ad_username`,`ad_password`) values (1,'123','123');

/*Table structure for table `admin_details` */

DROP TABLE IF EXISTS `admin_details`;

CREATE TABLE `admin_details` (
  `ad_id` int(11) NOT NULL,
  `ad_username` varchar(64) NOT NULL,
  `ad_logintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ad_id`,`ad_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `admin_details` */

/*Table structure for table `admin_transition` */

DROP TABLE IF EXISTS `admin_transition`;

CREATE TABLE `admin_transition` (
  `ad_username` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ad_states` tinyint(4) NOT NULL,
  PRIMARY KEY (`ad_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `admin_transition` */

/*Table structure for table `classs` */

DROP TABLE IF EXISTS `classs`;

CREATE TABLE `classs` (
  `cls_id` int(11) NOT NULL COMMENT 'id',
  `cls_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '班级名称',
  `cls_remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '备注',
  `cls_math` int(11) NOT NULL COMMENT '数学老师',
  `cls_chinese` int(11) NOT NULL COMMENT '语文老师',
  `cls_english` int(11) NOT NULL COMMENT '英语老师',
  `cls_pe` int(11) NOT NULL COMMENT '体育老师',
  `cls_physical` int(11) NOT NULL COMMENT '物理老师',
  PRIMARY KEY (`cls_id`),
  KEY `cls_english` (`cls_english`),
  KEY `cls_pe` (`cls_pe`),
  KEY `cls_physical` (`cls_physical`),
  KEY `classs_ibfk_2` (`cls_math`),
  KEY `cls_chinese` (`cls_chinese`),
  CONSTRAINT `classs_ibfk_2` FOREIGN KEY (`cls_math`) REFERENCES `teacher` (`t_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `classs_ibfk_3` FOREIGN KEY (`cls_english`) REFERENCES `teacher` (`t_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `classs_ibfk_4` FOREIGN KEY (`cls_pe`) REFERENCES `teacher` (`t_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `classs_ibfk_5` FOREIGN KEY (`cls_physical`) REFERENCES `teacher` (`t_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `classs_ibfk_6` FOREIGN KEY (`cls_chinese`) REFERENCES `teacher` (`t_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `classs` */

insert  into `classs`(`cls_id`,`cls_name`,`cls_remark`,`cls_math`,`cls_chinese`,`cls_english`,`cls_pe`,`cls_physical`) values (1000,'未分班','未分班同学在此班',1000,1000,1000,1000,1000),(1001,'软件一班','20级软件一班',1002,1001,1003,1004,1005),(1002,'软件二班','20级软件二班',1002,1001,1003,1004,1005),(1003,'软件三班','这是软件三班',1007,1020,1008,1004,1005),(1004,'软件四班','软件四班1',1007,1001,1008,1009,1005),(1006,'软件六班','软件六班6',1002,1006,1003,1009,1010),(1008,'测试班级','这是测试班级',1002,1006,1008,1009,1010),(1009,'软件9班','软件9班',1013,1001,1008,1009,1005),(1010,'软件10班','软件10班',1007,1020,1008,1009,1005);

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `s_id` int(11) NOT NULL COMMENT 'id',
  `s_name` varchar(20) NOT NULL COMMENT '学生姓名',
  `s_age` tinyint(4) NOT NULL COMMENT '学生年龄',
  `s_gender` tinyint(4) NOT NULL COMMENT '0 未知 1 男 2 女',
  `s_class` int(11) NOT NULL COMMENT '班级',
  PRIMARY KEY (`s_id`),
  KEY `s_class` (`s_class`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`s_class`) REFERENCES `classs` (`cls_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`s_id`,`s_name`,`s_age`,`s_gender`,`s_class`) values (1001,'小张三',18,2,1001),(1002,'小李四',20,1,1001),(1003,'小王五',19,2,1002),(1004,'小刘六',18,1,1001),(1005,'小王四',19,1,1001),(1006,'小王六',16,2,1001),(1007,'小刘三',19,2,1001),(1008,'小李七',19,1,1001),(1009,'小军三',20,2,1001),(1010,'小张四',21,1,1001),(1011,'小陈三',18,2,1001),(1012,'小陈四',19,1,1001),(1013,'小军',18,1,1001),(1014,'小牛仔',18,1,1003),(1015,'测试员3',123,1,1003),(1016,'小六子',28,2,1002),(1017,'小六子',25,1,1006),(1018,'张三',12,2,1008),(1019,'测试员2',18,1,1008),(1020,'小张三',18,1,1002),(1021,'小陈三',18,1,1003),(1022,'测试员1',10,1,1003),(1023,'小诊所',15,1,1001),(1024,'小胖纸',15,2,1000);

/*Table structure for table `subject` */

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `sub_id` tinyint(4) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sub_detail` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '学科名字',
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `subject` */

insert  into `subject`(`sub_id`,`sub_detail`) values (1,'未分配'),(2,'数学'),(3,'英语'),(4,'体育'),(5,'物理'),(6,'语文');

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `t_id` int(11) NOT NULL COMMENT 'id',
  `t_name` varchar(20) NOT NULL COMMENT '老师姓名',
  `t_gender` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0 未知 1 男 2 女',
  `t_subject` tinyint(4) NOT NULL COMMENT '所教学科',
  PRIMARY KEY (`t_id`),
  KEY `t_subject` (`t_subject`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`t_subject`) REFERENCES `subject` (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`t_id`,`t_name`,`t_gender`,`t_subject`) values (1000,'未分配老师',1,1),(1001,'张三',2,6),(1002,'李四',1,2),(1003,'王五',2,3),(1004,'赵六',1,4),(1005,'田七',2,5),(1006,'赵八',2,2),(1007,'真九',2,2),(1008,'陈十',1,3),(1009,'王十一',2,4),(1010,'李十二',2,4),(1011,'钱九',1,4),(1013,'张三',1,2),(1014,'赵八',1,2),(1015,'李四',1,3),(1016,'张三',1,2),(1018,'张三',1,3),(1019,'张三',1,2),(1020,'李四',1,6),(1021,'李四',2,2),(1022,'黑豹',2,6);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
