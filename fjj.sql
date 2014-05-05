/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50534
Source Host           : localhost:3306
Source Database       : fjj

Target Server Type    : MYSQL
Target Server Version : 50534
File Encoding         : 65001

Date: 2014-04-03 09:55:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `shortname` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `desc` text COLLATE utf8_unicode_ci NOT NULL,
  `view_count` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `type` smallint(6) NOT NULL,
  `visible` tinyint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('0d9079779c360f6397c3cdfb450e68d3', 'JAVA 编程基础', 'JAVA 编程概念与技巧', 'Java语言由语法规则和类库两部分组成，其中语法规则确定了Java程序的书写规范，学习好语法规则是Java语言，也是所有编程语言的基本功。本文主要向大家简单介绍一下Java的语法规则。 Java语言与C/C++语言有着紧密的联系，Java中的许多术语来自于C++，起语法也来自于C++。因此Java的语法和c++的语法计划一模一样。下面简单介绍一下Java的具体语法。 ', '<p>\n	Python是一种动态编程语言，它既不同于Java，也不同于C或C++。学习Python程序设计，或者，通过Python学习计算机编程，有时就像玩游戏。Python人性且友好的编程环境随时为我们提供丰富即时反馈。\n</p>\n<p>\n	<br />\n</p>\n<p>\n	有人这么说过，“C++难以学习，生来如此”，还有人说，“Java在很多地方就像C++”。如果你曾经被类似语言吓住的话，Python或许可以让真有你耳目一新，焕发新生的感觉。\n</p>\n<p>\n	<br />\n</p>\n<p>\n	我们鼓励你通过一些设计小巧的任务、情景，或问题，进行基于Python的真正意义上的交互式编程，并在这个过程中，你自然就会掌握诸如变量、语句，数据类型、面向对象编程等概念和技巧。\n</p>\n<p>\n	如果你之前没有任何编程经验和经历的话，那么，既简单，又功能前大的Python就是你入门编程的极佳选择。\n</p>', '0', '18', '1', '1', '0', '2014-01-06 12:25:51', '2014-01-07 10:06:03');
INSERT INTO `course` VALUES ('56d80ca0a6a547755c75a3cb77c251d7', 'C++ 编程基础', 'C++ 编程概念与技巧', 'C++是一种使用非常广泛的计算机编程语言。C++是一种静态数据类型检查的、支持多重编程范式的通用程序设计语言。它支持过程化程序设计、数据抽象、面向对象程序设计、泛型程序设计等多种程序设计风格。其编译器比目前其他计算机语言的编译技术更复杂。', '<p>\n	C++ 是一种动态编程语言，它既不同于Java，也不同于C或C++。学习Python程序设计，或者，通过Python学习计算机编程，有时就像玩游戏。Python人性且友好的编程环境随时为我们提供丰富即时反馈。\n</p>\n<p>\n	有人这么说过，“C++难以学习，生来如此”，还有人说，“Java在很多地方就像C++”。如果你曾经被类似语言吓住的话，Python或许可以让真有你耳目一新，焕发新生的感觉。\n</p>\n<p>\n	我们鼓励你通过一些设计小巧的任务、情景，或问题，进行基于Python的真正意义上的交互式编程，并在这个过程中，你自然就会掌握诸如变量、语句，数据类型、面向对象编程等概念和技巧。\n</p>\n<p>\n	如果你之前没有任何编程经验和经历的话，那么，既简单，又功能前大的&nbsp;<span>C++&nbsp;</span>就是你入门编程的极佳选择。\n</p>', '0', '18', '1', '1', '0', '2014-01-06 12:27:48', '2014-01-07 10:14:49');
INSERT INTO `course` VALUES ('c73b3af472ed5d36ca4b533d4ac8995a', 'Python 编程基础', 'Python 编程概念与技巧', 'Python是一种动态编程语言，它既不同于Java，也不同于C或C++。学习Python程序设计，或者，通过Python学习计算机编程，有时就像玩游戏。Python人性且友好的编程环境随时为我们提供丰富即时学习反馈。', '<p>\n	<strong>学习概要</strong> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">Python是一种动态编程语言，它既不同于Java，也不同于C或C++。学习Python程序设计，或者，通过Python学习计算机编程，有时就像玩游戏。Python人性且友好的编程环境随时为我们提供丰富即时反馈。</span><span style=\"line-height:1.5;\"></span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">有人这么说过，“C++难以学习，生来如此”，还有人说，“Java在很多地方就像C++”。如果你曾经被类似语言吓住的话，Python或许可以让真有你耳目一新，焕发新生的感觉。</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">我们鼓励你通过一些设计小巧的任务、情景，或问题，进行基于Python的真正意义上的交互式编程，并在这个过程中，你自然就会掌握诸如变量、语句，数据类型、面向对象编程等概念和技巧。</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">如果你之前没有任何编程经验和经历的话，那么，既简单，又功能前大的Python就是你入门编程的极佳选择。</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\"><strong>目标对象</strong></span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">大学计算机、通讯工程、电子电气工程、软件工程、数字媒体等相关专业在校学生，或者，喜欢计算机编程技术，想要从事计算机编程相关工作，或者，希望利用计算机和编程技术解决相关领域问题，而且，愿意尝试问题导向的体验式学习方式，而不是，讲座为中心的传统式教学模式。</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\"><strong>总体目标</strong></span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">1. 了解Python编程语言的基本概念和特性；</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">2. 能够设计和编写基本的Python程序；</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">3. 总体掌握基于Python语言的计算机编程总体框架、思考方式以及关键术语。<br />\n</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\"><strong>阅读参考</strong></span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">1.Python基础教程（第2版）；</span>\n</p>\n<p>\n	<span style=\"line-height:1.5;\">2.Python编程实践；</span>\n</p>\n<p>\n	<span style=\"line-height:1.5;\">3.Python入门经典:以解决计算问题为导向的Python编程实践。</span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\"><strong>风格特色</strong></span> \n</p>\n<p>\n	<span style=\"line-height:1.5;\">1. 文本阅读；</span>\n</p>\n<p>\n	<span style=\"line-height:1.5;\">2. 编程实践；</span>\n</p>\n<p>\n	<span style=\"line-height:1.5;\">3. 答疑解惑。</span><span style=\"line-height:1.5;\"></span> \n</p>', '0', '9', '1', '1', '0', '2013-12-09 14:21:35', '2013-12-13 11:09:43');

-- ----------------------------
-- Table structure for `course_ext`
-- ----------------------------
DROP TABLE IF EXISTS `course_ext`;
CREATE TABLE `course_ext` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `level` smallint(6) NOT NULL,
  `score` smallint(6) NOT NULL,
  `deadline` tinyint(4) NOT NULL,
  `question` varchar(140) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_ext
-- ----------------------------
INSERT INTO `course_ext` VALUES ('0d9079779c360f6397c3cdfb450e68d3', '0', '0', '49', '你为什么要学习编程？', '2014-01-06 12:25:51', '2014-01-07 10:06:03');
INSERT INTO `course_ext` VALUES ('56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '49', '你为什么想学习编程？', '2014-01-06 12:27:48', '2014-01-07 10:14:49');
INSERT INTO `course_ext` VALUES ('c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '21', '你为什么要学习编程？', '2013-12-09 14:21:35', '2013-12-13 11:09:43');

-- ----------------------------
-- Table structure for `course_instructor`
-- ----------------------------
DROP TABLE IF EXISTS `course_instructor`;
CREATE TABLE `course_instructor` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `join_time` datetime NOT NULL,
  `course_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `last_study_time` datetime NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_instructor
-- ----------------------------
INSERT INTO `course_instructor` VALUES ('5b6437a1c3adcc6ad610c3afa79044eb', '22', '2013-12-12 05:12:59', 'c73b3af472ed5d36ca4b533d4ac8995a', '2013-12-12 05:12:59', '1', '2013-12-12 17:25:59', '2013-12-12 17:25:59');
INSERT INTO `course_instructor` VALUES ('c35b2cb455d69c7095dec0063d220534', '22', '2014-01-08 05:01:58', '0d9079779c360f6397c3cdfb450e68d3', '2014-01-08 05:01:58', '1', '2014-01-08 17:30:58', '2014-01-08 17:30:58');

-- ----------------------------
-- Table structure for `course_student`
-- ----------------------------
DROP TABLE IF EXISTS `course_student`;
CREATE TABLE `course_student` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `student_id` int(11) NOT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `join_time` datetime NOT NULL,
  `course_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `study_time` int(11) NOT NULL,
  `last_study_time` datetime NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `message` varchar(140) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_message` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_student
-- ----------------------------
INSERT INTO `course_student` VALUES ('15e0166903ba85b80bb0ba7ac5d46051', '21', '22', '2013-12-12 05:12:22', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '2013-12-12 05:12:22', '1', '2013-12-12 17:01:22', '2013-12-12 17:26:10', '', '我就是喜欢啊...');
INSERT INTO `course_student` VALUES ('32cd17661af069ade491d48264a499cd', '23', '22', '2014-01-08 05:01:21', '0d9079779c360f6397c3cdfb450e68d3', '0', '2014-01-08 05:01:21', '1', '2014-01-08 17:30:21', '2014-01-08 17:31:11', '', 'ccccc');
INSERT INTO `course_student` VALUES ('7f624017b29a08184726e19ee89b4f50', '20', '22', '2013-12-12 05:12:14', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '2013-12-12 05:12:14', '1', '2013-12-12 17:01:14', '2013-12-12 17:26:07', '', '我就是喜欢啊...');
INSERT INTO `course_student` VALUES ('afa38810a0b971a6a29f934a08143012', '19', '22', '2013-12-12 05:12:07', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '2013-12-12 05:12:07', '1', '2013-12-12 17:01:07', '2013-12-12 17:26:05', '', '我就是喜欢啊...');

-- ----------------------------
-- Table structure for `course_units`
-- ----------------------------
DROP TABLE IF EXISTS `course_units`;
CREATE TABLE `course_units` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `desc` text COLLATE utf8_unicode_ci NOT NULL,
  `course_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `study_count` int(11) NOT NULL,
  `view_count` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_units
-- ----------------------------
INSERT INTO `course_units` VALUES ('01f26fe9a85807938e8610252dc8a7f6', '第4单元', '复合数据类型（Compound Data Type）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '4', '2013-12-09 14:30:58', '2014-01-08 10:43:50');
INSERT INTO `course_units` VALUES ('09411f93b0834c4d3fdac18e405e5cd5', '第5单元: 模板 & 泛型编程（Template & Generic Programming）', '&nbsp;&nbsp;\n<h2 style=\"font-family:Georgia, Palatino, serif;color:#111111;font-weight:400;font-size:22px;\">\n	主题内容\n</h2>\n<ul style=\"color:#444444;font-family:Georgia, Palatino, serif;font-size:14px;\">\n	<li style=\"margin-left:44px;\">\n		函数模板\n	</li>\n	<li style=\"margin-left:44px;\">\n		类模板\n	</li>\n	<li style=\"margin-left:44px;\">\n		STL（标准模板库）\n	</li>\n</ul>\n<h2 style=\"font-family:Georgia, Palatino, serif;color:#111111;font-weight:400;font-size:22px;\">\n	学习方法\n</h2>\n<ul style=\"color:#444444;font-family:Georgia, Palatino, serif;font-size:14px;\">\n	<li style=\"margin-left:44px;\">\n		完本单元任务，需要时间大约7 - 10个小时，建议每天完成1 - 2项任务\n	</li>\n	<li style=\"margin-left:44px;\">\n		任务完成过程中，欢迎通过邮件与{指导老师邮件地址}沟通交流和答疑解惑\n	</li>\n	<li style=\"margin-left:44px;\">\n		一封邮件一个问题，问题作为标题，问题的描述和说明作为内容\n	</li>\n</ul>', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '5', '2014-01-06 16:13:50', '2014-01-06 16:16:44');
INSERT INTO `course_units` VALUES ('149f81c2128eae331213198989856258', '第 2 单元', '&nbsp;&nbsp;运算符，表达式 &amp; 控制结构（Operator，Expression，Flow Structure）', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '2', '2014-01-06 16:04:07', '2014-01-06 16:15:44');
INSERT INTO `course_units` VALUES ('1ac1c923a1eb3e65323947de5a525308', '第 6 单元', '&nbsp;&nbsp;输入/输出，文件 &amp; 异常处理（I/O，Files &amp; Exception Management）', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '6', '2014-01-06 16:15:10', '2014-01-06 16:17:04');
INSERT INTO `course_units` VALUES ('1f0167f40a890f4452df4a1305496c3e', '第0单元', '&nbsp;&nbsp;开始学习C++（Startup C++）', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '0', '2014-01-06 15:31:01', '2014-01-06 16:15:27');
INSERT INTO `course_units` VALUES ('2183f5bae0b5f14511f0783fcef5700e', '第 4 单元', '&nbsp;&nbsp;对象，类 &amp; 面向对象的编程（Object，Class &amp; OOP）', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '4', '2014-01-06 16:12:39', '2014-01-06 16:16:14');
INSERT INTO `course_units` VALUES ('399e8211c18beddf1e2f59c70bd0dd74', '第2单元', '函数 &amp; 模块（Functions &amp; Modules）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '2', '2013-12-09 14:25:54', '2014-01-08 10:43:35');
INSERT INTO `course_units` VALUES ('4d47b230c957c7e129b0ae2ae1ee21e9', '第 5 单元', '列表，集合，映射 &amp; 泛型编程（ Lists，Sets，Maps &amp; Generic Programming）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '5', '2014-01-06 16:24:33', '2014-01-06 16:26:25');
INSERT INTO `course_units` VALUES ('7b5e084856e07b1bd0fc311c7c0be5da', '第1单元', '&nbsp;&nbsp;&nbsp;&nbsp;数据和复合数据（Data &amp; Compound Data）', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '1', '2014-01-06 16:03:11', '2014-01-06 16:15:36');
INSERT INTO `course_units` VALUES ('85e99f9cebe4d9965271406ad1c2a571', '第 4 单元:', '&nbsp;&nbsp;对象，类 &amp; 面向对象编程（ Object，Class &amp; Object Oriented Programming）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '4', '2014-01-06 16:23:29', '2014-01-06 16:26:10');
INSERT INTO `course_units` VALUES ('8c02e26c9ab3e0fefbc97a6ae1bcfcff', '第0单元', 'Python基本程序设计（Python Elementary Programming）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '0', '2013-12-09 14:24:22', '2014-01-08 10:43:12');
INSERT INTO `course_units` VALUES ('97b44a06917820a305342ac2a17dddb8', '第 0 单元 ', 'Java基本程序设计（Java Elementary Programming）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '0', '2014-01-06 13:10:37', '2014-01-06 16:19:21');
INSERT INTO `course_units` VALUES ('b09d8bbbdf670a7e1a533afea0b517fa', '第 3 单元', '&nbsp;&nbsp;\n<p>\n	函数，作用域 &amp; 名称空间（Function，Scope，Namespace）\n</p>\n<p>\n	<br />\n</p>\n<p>\n	<br />\n</p>\n<h2 style=\"font-family:Georgia, Palatino, serif;color:#111111;font-weight:400;font-size:22px;\">\n	主题内容\n</h2>\n<ul style=\"color:#444444;font-family:Georgia, Palatino, serif;font-size:14px;\">\n	<li style=\"margin-left:44px;\">\n		函数原型、定义和调用\n	</li>\n	<li style=\"margin-left:44px;\">\n		函数参数，按值传递 &amp; 引用传值\n	</li>\n	<li style=\"margin-left:44px;\">\n		函数与数组、结构 &amp; string对象\n	</li>\n	<li style=\"margin-left:44px;\">\n		递归 &amp; 函数指针\n	</li>\n	<li style=\"margin-left:44px;\">\n		作用域 &amp; 名称空间\n	</li>\n</ul>\n<h2 style=\"font-family:Georgia, Palatino, serif;color:#111111;font-weight:400;font-size:22px;\">\n	学习方法\n</h2>\n<ul style=\"color:#444444;font-family:Georgia, Palatino, serif;font-size:14px;\">\n	<li style=\"margin-left:44px;\">\n		完成本单元任务，需要时间大约6 - 9个小时，建议每天完成1 - 2项任务\n	</li>\n	<li style=\"margin-left:44px;\">\n		任务完成过程中，欢迎通过邮件与{指导老师邮件地址}沟通交流和答疑解惑\n	</li>\n	<li style=\"margin-left:44px;\">\n		一封邮件一个问题，问题作为标题，问题的描述和说明作为内容<span style=\"font-family:\'sans serif\', tahoma, verdana, helvetica;font-size:12px;line-height:1.5;\"></span> \n	</li>\n</ul>', '56d80ca0a6a547755c75a3cb77c251d7', '0', '0', '18', '1', '3', '2014-01-06 16:11:33', '2014-01-06 16:16:03');
INSERT INTO `course_units` VALUES ('c86f4b07d8592d0b4f0cd64ef206f6a4', '第 2 单元', '&nbsp;&nbsp;方法 aka 函数（Method aka Function）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '2', '2014-01-06 16:21:11', '2014-01-06 16:25:51');
INSERT INTO `course_units` VALUES ('c932fb16d08011f69d7f22e94e4c4284', '第3单元', '字符串，文件 &amp; 异常处理（String，Files &amp; Exception Handling）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '3', '2013-12-09 14:26:59', '2014-01-08 10:43:41');
INSERT INTO `course_units` VALUES ('dcd3e03a4832ef8646f27494043c6e19', '第1单元', '逻辑，循环 &amp; 控制结构（Logic，Loop &amp; Control Structures）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '1', '2013-12-09 14:25:07', '2014-01-08 10:43:27');
INSERT INTO `course_units` VALUES ('e01c1534c9790a95583e9000b6ebf8f5', '第 1 单元', '&nbsp;&nbsp;运算符，表达式和控制结构（Operators, Expression &amp; Control Structures）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '1', '2014-01-06 16:19:59', '2014-01-06 16:25:31');
INSERT INTO `course_units` VALUES ('e59cce2964bdaa973a5e1deecf3a39b0', '第5单元', '类 &amp; 面向对象编程（Classes &amp; Object-Oriented Programming）', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '9', '1', '5', '2013-12-09 14:31:58', '2014-01-08 10:43:57');
INSERT INTO `course_units` VALUES ('eb7f6f196b2fdc0656f43146bd59f911', '第 6 单元', '&nbsp;&nbsp;输出/输入，文件 &amp; 异常处理（I/O，Files &amp; Exception Handling）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '6', '2014-01-06 16:25:07', '2014-01-06 16:26:39');
INSERT INTO `course_units` VALUES ('fa0f04bb8b977eb1a8c6c66c0395bde2', '第 3 单元', '&nbsp;&nbsp;数据 &amp; 复合数据（Data &amp; Compound Data）', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '18', '1', '3', '2014-01-06 16:22:48', '2014-01-06 16:26:01');

-- ----------------------------
-- Table structure for `course_unit_task`
-- ----------------------------
DROP TABLE IF EXISTS `course_unit_task`;
CREATE TABLE `course_unit_task` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `unit_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_user` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type_id` tinyint(4) NOT NULL DEFAULT '0',
  `desc` varchar(240) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_unit_task
-- ----------------------------
INSERT INTO `course_unit_task` VALUES ('0a783a4ea9d089794724e8b7d980974f', '任务0 - 6（4个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:38:59', '2014-01-06 13:38:59', '3', '有一家快速发展的的土木工程设计公司，为了持续不断地吸引人才，准备实施一项员工福利计划。福利计划是这样的，公司计划按照员工年收入和年奖金总额的5%补充到每一位员工的养老金中。现在，公司想开发一个程序，计算每年每位员工的额外补充的养老金金额。实际程序运行如下：', '0');
INSERT INTO `course_unit_task` VALUES ('0ab93e4f72ac3e00fee7e96f3dcca3cf', '任务0 - 5（3个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:35:25', '2014-01-06 13:35:25', '3', '一家综家电合维修服务商，为了保障维修与保养服务的质量，希望为其具体实施服务的技术人员开发一套分步骤显示指令的维修与保养辅助指南程序。该程序实际运行情况如下：', '0');
INSERT INTO `course_unit_task` VALUES ('1bf8012037ee46e53b93aefd98192f32', '任务 0 - 4', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 16:20:23', '2013-12-11 12:25:41', '3', '', '4');
INSERT INTO `course_unit_task` VALUES ('229b8fe4546a5062b1bc5a1dc4ea37b9', '任务0 - 0（6个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:15:22', '2014-01-06 13:15:22', '1', '回答下列问题', '0');
INSERT INTO `course_unit_task` VALUES ('37d9a8ca29fa09a0a9e6d833937596b8', '任务 0 - 6', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 16:26:14', '2013-12-11 12:25:50', '3', '', '6');
INSERT INTO `course_unit_task` VALUES ('39bff9513abb9ac54f706a8a5b11e7c2', '任务 0 - 7', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 16:27:48', '2013-12-11 12:25:55', '4', '', '7');
INSERT INTO `course_unit_task` VALUES ('4504719a3383c6fe38a684d8072111b5', '任务0 - 3（2个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:48:56', '2014-01-06 15:48:56', '4', '分别使用IDLE和Sublime Text 2以交互模式和命令行模式运行下面这个程序。', '0');
INSERT INTO `course_unit_task` VALUES ('4f54b182e7962418c5895f0b93c69dde', '任务0 - 4（3个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:52:21', '2014-01-06 15:52:21', '3', '编写一个小程序，将摄氏度转换为华氏度。程序提示使用者首先输入姓名，然后提示摄氏度数值，然后显示使用者姓名和华氏度。摄氏与华氏转换公式为：华氏度 = 9 / 5 × 摄氏度 + 32。程序运行基本如下：', '0');
INSERT INTO `course_unit_task` VALUES ('5044581eadfe76e302546603401584e8', '任务 0 - 5', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 16:24:13', '2013-12-11 12:25:45', '3', '', '5');
INSERT INTO `course_unit_task` VALUES ('567f3eeeb28afbdb0f1cec21cc5ad34a', '任务0 - 2（3个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:28:32', '2014-01-06 13:28:32', '2', '安装，配置和了解IDLE程序编辑/运行环境和Sublime Text 2 程序编辑器。', '0');
INSERT INTO `course_unit_task` VALUES ('5c7a1146caad8f6aa577e4fe53faa729', '任务0 - 6（4个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:55:56', '2014-01-06 15:55:56', '3', '有一家快速发展的的土木工程设计公司，为了持续不断地吸引人才，准备实施一项员工福利计划。福利计划是这样的，公司计划按照员工年收入和年奖金总额的5%补充到每一位员工的养老金中。现在，公司想开发一个程序，计算每年每位员工的额外补充的养老金金额。实际程序运行如下：', '0');
INSERT INTO `course_unit_task` VALUES ('88017d864054973c536ab4a5256b67ac', '任务0 - 7（3个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:42:57', '2014-01-06 13:42:57', '4', '请阅读以下主题内容，并通过邮件和指导老师开展相关主题讨论。', '0');
INSERT INTO `course_unit_task` VALUES ('8cccddb57360c329bf3e40403bb68338', '任务 0 - 3', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 15:08:02', '2013-12-11 12:25:36', '3', '', '3');
INSERT INTO `course_unit_task` VALUES ('93d302b0686d61a151f179a3ab3b5484', '任务 0 - 0', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 14:53:11', '2013-12-11 12:24:50', '1', '回答下列问题：', '0');
INSERT INTO `course_unit_task` VALUES ('9d8080e04dd230e81091a0dd654fdf7f', '任务 0 - 2', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 15:05:50', '2013-12-13 10:07:22', '2', '', '2');
INSERT INTO `course_unit_task` VALUES ('b28b4926e5a254f99008add6817e8e39', '任务0 - 1（2个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:43:41', '2014-01-06 15:43:41', '2', '安装，配置 Python解释器和运行环境（Python Interpreter & IDLE）', '0');
INSERT INTO `course_unit_task` VALUES ('b492afc12db01d5a531d8b65a80dbdfb', '任务0 - 0（6个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:37:52', '2014-01-06 15:37:52', '1', '回答下列问题：', '0');
INSERT INTO `course_unit_task` VALUES ('b758172da531183a753c8c5ad9723522', '任务0 - 4（3个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:32:44', '2014-01-06 13:32:44', '3', '编写一个小程序，将摄氏度转换为华氏度。程序提示使用者首先输入姓名，然后提示摄氏度数值，然后显示使用者姓名和华氏度。摄氏与华氏转换公式为：华氏度 = 9 / 5 × 摄氏度 + 32。程序运行基本如下：', '0');
INSERT INTO `course_unit_task` VALUES ('be2f553799c55a39cbec1e11b0e59903', '任务0 - 2（3个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:46:24', '2014-01-06 15:46:24', '2', '安装，配置和了解IDLE程序编辑/运行环境和Sublime Text 2 程序编辑器。', '0');
INSERT INTO `course_unit_task` VALUES ('d7b3686538a301f89bcc58e6202b72da', '任务0 - 1（2个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:21:19', '2014-01-06 13:23:53', '2', '安装，配置 Python解释器和运行环境（Python Interpreter & IDLE）', '0');
INSERT INTO `course_unit_task` VALUES ('da7f87ee84716d464012d3c6d7b72062', '任务0 - 5（3个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:54:22', '2014-01-06 15:54:22', '3', '一家综家电合维修服务商，为了保障维修与保养服务的质量，希望为其具体实施服务的技术人员开发一套分步骤显示指令的维修与保养辅助指南程序。该程序实际运行情况如下：', '0');
INSERT INTO `course_unit_task` VALUES ('e0434a3b9555acbc9a34d14c1665e1c3', '任务0 - 3（2个学分）', '97b44a06917820a305342ac2a17dddb8', '18', '1', '2014-01-06 13:30:59', '2014-01-06 13:30:59', '4', '安装，配置和了解IDLE程序编辑/运行环境和Sublime Text 2 程序编辑器。', '0');
INSERT INTO `course_unit_task` VALUES ('e1b13b36bb15445353bc1ce43e682013', '任务0 - 7（3个学分）', '1f0167f40a890f4452df4a1305496c3e', '18', '1', '2014-01-06 15:57:37', '2014-01-06 15:57:37', '4', '请阅读以下主题内容，并通过邮件和指导老师开展相关主题讨论。', '0');
INSERT INTO `course_unit_task` VALUES ('fb7dfd46900aa80c903957ed39e5dccb', '任务 0 - 1 ', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9', '1', '2013-12-09 14:58:52', '2013-12-11 12:25:02', '2', '安装Python编程环境。', '1');

-- ----------------------------
-- Table structure for `course_unit_task_list`
-- ----------------------------
DROP TABLE IF EXISTS `course_unit_task_list`;
CREATE TABLE `course_unit_task_list` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `desc` text COLLATE utf8_unicode_ci NOT NULL,
  `unit_task_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_user` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_unit_task_list
-- ----------------------------
INSERT INTO `course_unit_task_list` VALUES ('062a688519d7598e06a3e541cb1e3522', '<pre class=\"prettyprint lang-js\">This program tell you how to disassemble\ndisassemble a washing machine.\nThere are four steps in the process:\n\nPlease enter to see step 1.\nStep 1: Unplug the dryer and\nmove it away from the wall.\n\nPress Enter to see Step 2.\nStep 2: Remove the six screws\nfrom the back of the washing machine.\n\nPress Enter to see Step 3.\nStep 3: Remove the back panel\nfrom the washing machine.\n\nPress Enter to see Step 4.\nStep 4: Pull the top of the\nwashing machine straight up.</pre>\n<p>提示：请将每一个步骤定义为一个函数，并使用input()函数。</p>', 'da7f87ee84716d464012d3c6d7b72062', '18', '1', '2014-01-06 15:55:16', '2014-01-06 15:55:16');
INSERT INTO `course_unit_task_list` VALUES ('06df207fe77c19a16792da445338a81b', 'Windows操作系统<a href=\"https://python-guide.readthedocs.org/en/latest/starting/install/win/\">参考教程</a>', 'b28b4926e5a254f99008add6817e8e39', '18', '1', '2014-01-06 15:44:11', '2014-01-06 15:44:11');
INSERT INTO `course_unit_task_list` VALUES ('074bca40b6c3140c0eb3f9a062483c84', '下载Python 安装包', 'fb7dfd46900aa80c903957ed39e5dccb', '9', '1', '2013-12-09 17:51:18', '2013-12-09 17:51:18');
INSERT INTO `course_unit_task_list` VALUES ('0c14adfd5acea43ce8bdf39e6b02ad72', '什么是不可变对象（immutable object）和可变对象（mutable object）？', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:19:49', '2014-01-06 13:19:49');
INSERT INTO `course_unit_task_list` VALUES ('0e698303858d053cafcb16a56c657ecd', '<ul>\n	<li>\n		IDLE程序编辑/运行环境<a href=\"http://www.ai.uga.edu/mc/idle/index.html\">教程</a>\n	</li>\n	<li>\n		Sublime Text 2<a href=\"http://www.sublimetext.com/2\">下载地址</a>\n	</li>\n	<li>\n		Sublime Text 2<a href=\"http://www.sublimetext.com/docs/2/\">使用指南</a>\n	</li>\n	<li>\n		Sublime Text 2<a href=\"http://docs.sublimetext.info/en/latest/file_processing/build_systems.html\">Python2版本编译/构建配置</a> 或者 <a href=\"http://blitzprog.org/posts/how-to-make-sublime-text-2-work-with-python-3\">Python3版本编译/构建配置</a>\n	</li>\n</ul>\n<p>\n	提示：文档阅读中，任何英文问题，欢迎通过电子邮件与你的英语指导老师沟通交流。\n</p>', '567f3eeeb28afbdb0f1cec21cc5ad34a', '18', '1', '2014-01-06 13:29:13', '2014-01-06 13:29:13');
INSERT INTO `course_unit_task_list` VALUES ('0ebbeb6e651579cd85577d5431f8960d', 'Sublime Text 2<a href=\"http://www.sublimetext.com/2\">下载地址</a>', 'be2f553799c55a39cbec1e11b0e59903', '18', '1', '2014-01-06 15:47:05', '2014-01-06 15:47:05');
INSERT INTO `course_unit_task_list` VALUES ('118266f061955927db73c9739bad9d77', '什么是交互式编程模式？具有交互式编程模式的编程环境有什么好处？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:41:29', '2014-01-06 15:41:29');
INSERT INTO `course_unit_task_list` VALUES ('16199a01fa30f1ef6a3b9c42a97c6477', '<pre class=\"prettyprint lang-js\">Please enter your name: Allen\nPlease enter degree in Celsius: 37\n\nHi,Allen\n37 degrees in Celsius is 98.6 degrees in Fahrenheit</pre>\n<p>\n	提示：请注意程序处理过程为输入，处理（转换）和输出。\n</p>', 'b758172da531183a753c8c5ad9723522', '18', '1', '2014-01-06 13:34:36', '2014-01-06 13:34:36');
INSERT INTO `course_unit_task_list` VALUES ('1eff0c242b162bf0abcf5278898afb7a', 'Mac OS X操作系统<a href=\"https://python-guide.readthedocs.org/en/latest/starting/install/osx/\">参考教程</a>', 'b28b4926e5a254f99008add6817e8e39', '18', '1', '2014-01-06 15:44:39', '2014-01-06 15:44:39');
INSERT INTO `course_unit_task_list` VALUES ('1f981c682ece803513700a93f63bc017', 'Python函数参数及其传值方式', '39bff9513abb9ac54f706a8a5b11e7c2', '9', '1', '2013-12-09 16:31:37', '2013-12-09 16:31:37');
INSERT INTO `course_unit_task_list` VALUES ('22f7bb5b1201b59d87c914e2e45e1821', 'Unix/Linux操作系统<a href=\"https://python-guide.readthedocs.org/en/latest/starting/install/linux/\">参考教程</a>', 'b28b4926e5a254f99008add6817e8e39', '18', '1', '2014-01-06 15:44:25', '2014-01-06 15:44:25');
INSERT INTO `course_unit_task_list` VALUES ('2563c9b702f0da5ea498284eddfe8166', '提示：参阅资料过程中，如有英文问题，请和你的英文指导老师交流。', 'e1b13b36bb15445353bc1ce43e682013', '18', '1', '2014-01-06 15:58:41', '2014-01-06 15:58:41');
INSERT INTO `course_unit_task_list` VALUES ('293ea28d9952123b9bd32a5d40d9acfc', '什么是交互式编程模式？具有交互式编程模式的编程环境有什么好处？', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:18:16', '2014-01-06 13:18:16');
INSERT INTO `course_unit_task_list` VALUES ('29a60eaca18b72a2d349588165ec410f', 'Python变量与作用域', '39bff9513abb9ac54f706a8a5b11e7c2', '9', '1', '2013-12-09 16:31:16', '2013-12-09 16:31:16');
INSERT INTO `course_unit_task_list` VALUES ('2acf1f531545a93f767dc0f94e0ade80', '举例说明转义字符是个什么东东？', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:19:36', '2014-01-06 13:19:36');
INSERT INTO `course_unit_task_list` VALUES ('2d0f8b9971a51157bf3d7605d733cf17', '什么是不可变对象（immutable object）和可变对象（mutable object）？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:42:38', '2014-01-06 15:42:38');
INSERT INTO `course_unit_task_list` VALUES ('2e53c6c40035e34b1bfcfdc48bc9738c', '举例说明转义字符是个什么东东？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:57:54', '2013-12-09 14:57:54');
INSERT INTO `course_unit_task_list` VALUES ('2f186bbc87c37a49bbb1be2d3d15534a', '运行Python程序的方法有那些？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:41:55', '2014-01-06 15:41:55');
INSERT INTO `course_unit_task_list` VALUES ('306a0eca7d00c3baa98a61527237f2d7', '<a href=\"http://stackoverflow.com/questions/986006/python-how-do-i-pass-a-variable-by-reference\">Python函数参数及其传值方式</a>', 'e1b13b36bb15445353bc1ce43e682013', '18', '1', '2014-01-06 15:58:14', '2014-01-06 15:58:14');
INSERT INTO `course_unit_task_list` VALUES ('349ec6ccab6ed6aac9e4bd3a01f3f92f', 'Windows操作系统参考教程<br />\nUnix/Linux操作系统参考教程<br />\n<p>\n	Mac OS X操作系统参考教程\n</p>\n<p>\n	<br />\n</p>\n<p style=\"text-align:left;\">\n	提示：<a href=\"http://www.python.org/getit/\">Python下载地址</a>（2.7或3.0以上两个分支任意版本）；文档阅读中，任何英文问题，欢迎通过电子邮件与你的英语指导老师沟通交流。\n</p>', 'd7b3686538a301f89bcc58e6202b72da', '18', '1', '2014-01-06 13:27:17', '2014-01-06 13:27:17');
INSERT INTO `course_unit_task_list` VALUES ('3834c7adecaef3fa1011686e4a137c42', '编译型语言与解释型语言的异同（编译器和解释器的概念）？<br />\n<br />\n<div>\n	<br />\n</div>', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:17:56', '2014-01-06 13:17:56');
INSERT INTO `course_unit_task_list` VALUES ('3d53b3ebbd0397b5e071d55ae77bdcd3', '在Python语言中，多行长语句是如何处理的？', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:19:24', '2014-01-06 13:19:24');
INSERT INTO `course_unit_task_list` VALUES ('4273a5d6983de373e931244005266cb1', '提示：文档阅读中，任何英文问题，欢迎通过电子邮件与你的英语指导老师沟通交流。', 'be2f553799c55a39cbec1e11b0e59903', '18', '1', '2014-01-06 15:47:50', '2014-01-06 15:47:50');
INSERT INTO `course_unit_task_list` VALUES ('42d33d67afe6fca852c9d247fd5e618b', '运行Python程序的方法有那些？', '229b8fe4546a5062b1bc5a1dc4ea37b9', '18', '1', '2014-01-06 13:18:39', '2014-01-06 13:18:39');
INSERT INTO `course_unit_task_list` VALUES ('480be981d8b1b468700b2deb81c1a11a', 'Sublime Text 2<a href=\"http://docs.sublimetext.info/en/latest/file_processing/build_systems.html\">Python2版本编译/构建配置</a> 或者 <a href=\"http://blitzprog.org/posts/how-to-make-sublime-text-2-work-with-python-3\">Python3版本编译/构建配置</a>', 'be2f553799c55a39cbec1e11b0e59903', '18', '1', '2014-01-06 15:47:26', '2014-01-06 15:47:26');
INSERT INTO `course_unit_task_list` VALUES ('48d1ffd68bc48fd0745961e7b6da482e', '一家综家电合维修服务商，为了保障维修与保养服务的质量，希望为其具体实施服务的技术人员开发一套分步骤显示指令的维修与保养辅助指南程序。该程序实际运行情况如下：<br />\n<pre class=\"prettyprint lang-js\">This program tell you how to disassemble\ndisassemble a washing machine.\nThere are four steps in the process:\n\nPlease enter to see step 1.\nStep 1: Unplug the dryer and\nmove it away from the wall.\n\nPress Enter to see Step 2.\nStep 2: Remove the six screws\nfrom the back of the washing machine.\n\nPress Enter to see Step 3.\nStep 3: Remove the back panel\nfrom the washing machine.\n\nPress Enter to see Step 4.\nStep 4: Pull the top of the\nwashing machine straight up.</pre>\n提示：请将每一个步骤定义为一个函数，并使用input()函数。<br />', '5044581eadfe76e302546603401584e8', '9', '1', '2013-12-09 16:25:36', '2013-12-09 16:25:36');
INSERT INTO `course_unit_task_list` VALUES ('4c1539203c6b92861b6d895daa566ca2', 'Sublime Text 2<a href=\"http://www.sublimetext.com/docs/2/\">使用指南</a>', 'be2f553799c55a39cbec1e11b0e59903', '18', '1', '2014-01-06 15:47:16', '2014-01-06 15:47:16');
INSERT INTO `course_unit_task_list` VALUES ('4e8ee810e00976d945a4433f58a0fe61', '举例说明转义字符是个什么东东？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:42:28', '2014-01-06 15:42:28');
INSERT INTO `course_unit_task_list` VALUES ('6669f1ef979ffbce4f334dfa0f6bf8c2', '<span style=\"color:#333333;font-family:Helvetica, arial, freesans, clean, sans-serif;font-size:14px;line-height:22px;background-color:#FFFFFF;\">安装，配置和了解IDLE程序编辑/运行环境和Sublime Text 2 程序编辑器。</span>', '9d8080e04dd230e81091a0dd654fdf7f', '9', '1', '2013-12-09 15:07:14', '2013-12-09 15:07:14');
INSERT INTO `course_unit_task_list` VALUES ('66daca292e7aa757ec866b23a03e5272', '<p>\n	有一家快速发展的的土木工程设计公司，为了持续不断地吸引人才，准备实施一项员工福利计划。福利计划是这样的，公司计划按照员工年收入和年奖金总额的5%补充到每一位员工的养老金中。现在，公司想开发一个程序，计算每年每位员工的额外补充的养老金金额。实际程序运行如下：\n</p>\n<p>\n<pre class=\"prettyprint lang-js\">Enter your gross pay: 80000.00\nEnter the amount of bonus: 20000.00\n\nContribution for gross pay: ￥4000.00\nContribution for bonuses: ￥1000.00\nTotal amount: ￥5000.00</pre>\n提示：请定义两个函数分别处理按年收入和季度奖金计算养老金补充金额；另外，请将Contribution Rate（5%）设置为一个全局常量。\n</p>', '37d9a8ca29fa09a0a9e6d833937596b8', '9', '1', '2013-12-09 16:27:05', '2013-12-09 16:27:05');
INSERT INTO `course_unit_task_list` VALUES ('67cacbe7d3091fc1e39d351bbbcd8afd', '什么是交互式编程模式？具有交互式编程模式的编程环境有什么好处？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:56:47', '2013-12-09 14:56:47');
INSERT INTO `course_unit_task_list` VALUES ('6b0ad36f7c09be47e51f61888c0b22fb', '<a href=\"http://www.pythonforbeginners.com/cheatsheet/python-style-guide/\">Python编程风格</a>', 'e1b13b36bb15445353bc1ce43e682013', '18', '1', '2014-01-06 15:58:29', '2014-01-06 15:58:29');
INSERT INTO `course_unit_task_list` VALUES ('73888e80b2066bf46290a531b76f47c7', '<a href=\"http://stackoverflow.com/questions/291978/short-description-of-python-scoping-rules\">Python变量与作用域</a>', '88017d864054973c536ab4a5256b67ac', '18', '1', '2014-01-06 13:43:19', '2014-01-06 13:43:19');
INSERT INTO `course_unit_task_list` VALUES ('74f39487b0731332637598044c5f16fc', '<pre class=\"prettyprint lang-js\">Please enter your name: Allen\nPlease enter degree in Celsius: 37\n\nHi,Allen\n37 degrees in Celsius is 98.6 degrees in Fahrenheit</pre>\n<p>提示：请注意程序处理过程为输入，处理（转换）和输出。</p>', '4f54b182e7962418c5895f0b93c69dde', '18', '1', '2014-01-06 15:53:10', '2014-01-06 15:53:10');
INSERT INTO `course_unit_task_list` VALUES ('755b53f9ada526ba2f03cce344465e5f', '<pre class=\"prettyprint lang-js\">This program tell you how to disassemble\ndisassemble a washing machine.\nThere are four steps in the process:\n\nPlease enter to see step 1.\nStep 1: Unplug the dryer and\nmove it away from the wall.\n\nPress Enter to see Step 2.\nStep 2: Remove the six screws\nfrom the back of the washing machine.\n\nPress Enter to see Step 3.\nStep 3: Remove the back panel\nfrom the washing machine.\n\nPress Enter to see Step 4.\nStep 4: Pull the top of the\nwashing machine straight up.</pre>\n<p>提示：请将每一个步骤定义为一个函数，并使用input()函数。</p>', '0ab93e4f72ac3e00fee7e96f3dcca3cf', '18', '1', '2014-01-06 13:38:17', '2014-01-06 13:38:17');
INSERT INTO `course_unit_task_list` VALUES ('78e902f9ba11b3c10839c180de992599', '在Python语言中，多行长语句是如何处理的？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:42:12', '2014-01-06 15:42:12');
INSERT INTO `course_unit_task_list` VALUES ('7f1ec80fae25da46c8426b41ef962595', '<a href=\"http://stackoverflow.com/questions/986006/python-how-do-i-pass-a-variable-by-reference\">Python函数参数及其传值方式</a>', '88017d864054973c536ab4a5256b67ac', '18', '1', '2014-01-06 13:43:38', '2014-01-06 13:43:38');
INSERT INTO `course_unit_task_list` VALUES ('816a3a26ca4dbc645ffc3cac584e865e', '<pre class=\"prettyprint lang-js\">Enter your gross pay: 80000.00\nEnter the amount of bonus: 20000.00\n\nContribution for gross pay: ￥4000.00\nContribution for bonuses: ￥1000.00\nTotal amount: ￥5000.00</pre>\n<p>提示：请定义两个函数分别处理按年收入和季度奖金计算养老金补充金额；另外，请将Contribution Rate（5%）设置为一个全局常量。</p>', '5c7a1146caad8f6aa577e4fe53faa729', '18', '1', '2014-01-06 15:56:45', '2014-01-06 15:56:45');
INSERT INTO `course_unit_task_list` VALUES ('8f26d606013811bd578333e65ceb4d74', '<p>\n	分别使用IDLE和Sublime Text 2以交互模式和命令行模式运行下面这个程序。\n</p>\n<p>\n<pre class=\"prettyprint lang-js\">print(\"Hello world\")\nprint(\"\"\"I\'m reading \"The Old Man and the Sea\" by Hemingway\"\"\")</pre>\n<span style=\"color:#333333;font-family:Helvetica, arial, freesans, clean, sans-serif;font-size:14px;line-height:22px;background-color:#FFFFFF;\">提示：Sublime Text 2模式需要创建一个文件，保存为扩展名为.py文本文件。</span>\n</p>', '8cccddb57360c329bf3e40403bb68338', '9', '1', '2013-12-09 16:19:42', '2013-12-09 16:19:42');
INSERT INTO `course_unit_task_list` VALUES ('8f5608537599aa2c55ed78e78781935e', '<a href=\"http://www.pythonforbeginners.com/cheatsheet/python-style-guide/\">Python编程风格</a>', '88017d864054973c536ab4a5256b67ac', '18', '1', '2014-01-06 13:44:19', '2014-01-06 13:44:19');
INSERT INTO `course_unit_task_list` VALUES ('92523b1f34026cc5e406ebb2731c34a8', '在Python语言中，多行长语句是如何处理的？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:57:34', '2013-12-09 14:57:34');
INSERT INTO `course_unit_task_list` VALUES ('94dcb8fc889ce894be733bb51c3d1941', '编译型语言与解释型语言的异同（编译器和解释器的概念）？', 'b492afc12db01d5a531d8b65a80dbdfb', '18', '1', '2014-01-06 15:38:14', '2014-01-06 15:38:14');
INSERT INTO `course_unit_task_list` VALUES ('a2102d98556e63561e6ad0e21c411103', 'Python编程风格', '39bff9513abb9ac54f706a8a5b11e7c2', '9', '1', '2013-12-09 16:31:54', '2013-12-09 16:31:54');
INSERT INTO `course_unit_task_list` VALUES ('a23a828d258f17108825d81a94bec0af', '配置 Python 开发环境', 'fb7dfd46900aa80c903957ed39e5dccb', '9', '1', '2013-12-09 17:52:46', '2013-12-09 17:52:46');
INSERT INTO `course_unit_task_list` VALUES ('a7c199eecdc4f4811c40198b9817299a', '提示：参阅资料过程中，如有英文问题，请和你的英文指导老师交流。', '88017d864054973c536ab4a5256b67ac', '18', '1', '2014-01-06 13:45:53', '2014-01-06 13:45:53');
INSERT INTO `course_unit_task_list` VALUES ('c103aef401f9985757826466d349a842', 'IDLE程序编辑/运行环境<a href=\"http://www.ai.uga.edu/mc/idle/index.html\">教程</a>', 'be2f553799c55a39cbec1e11b0e59903', '18', '1', '2014-01-06 15:46:55', '2014-01-06 15:46:55');
INSERT INTO `course_unit_task_list` VALUES ('c71e183840cc6a5488bbd7874044871e', '<p>\n	编写一个小程序，将摄氏度转换为华氏度。程序提示使用者首先输入姓名，然后提示摄氏度数值，然后显示使用者姓名和华氏度。摄氏与华氏转换公式为：华氏度 = 9 / 5 × 摄氏度 + 32。程序运行基本如下：\n</p>\n<p>\n<pre class=\"prettyprint\">Please enter your name: Allen\nPlease enter degree in Celsius: 37\n\nHi,Allen\n37 degrees in Celsius is 98.6 degrees in Fahrenheit</pre>\n提示：请注意程序处理过程为输入，处理（转换）和输出。\n</p>', '1bf8012037ee46e53b93aefd98192f32', '9', '1', '2013-12-09 16:21:55', '2013-12-09 16:21:55');
INSERT INTO `course_unit_task_list` VALUES ('c7bac9d7b56c5124201d9dc160251d7f', '<a href=\"http://stackoverflow.com/questions/291978/short-description-of-python-scoping-rules\">Python变量与作用域</a>', 'e1b13b36bb15445353bc1ce43e682013', '18', '1', '2014-01-06 15:57:52', '2014-01-06 15:57:52');
INSERT INTO `course_unit_task_list` VALUES ('cda8cf2d330ffcadf19d68622822d0db', '什么是不可变对象（immutable object）和可变对象（mutable object）？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:58:10', '2013-12-09 14:58:10');
INSERT INTO `course_unit_task_list` VALUES ('cdbec14b0b4947fd327a9d61f7f420ea', '安装 Python 解释器', 'fb7dfd46900aa80c903957ed39e5dccb', '9', '1', '2013-12-09 17:52:28', '2013-12-09 17:52:28');
INSERT INTO `course_unit_task_list` VALUES ('d4ff6a5b9ff8aeb4aa5f932ad74dd747', '编译型语言与解释型语言的异同（编译器和解释器的概念）？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:56:27', '2013-12-09 14:56:27');
INSERT INTO `course_unit_task_list` VALUES ('d71f53772fa41f5df0ce99dba6e47090', '运行Python程序的方法有那些？', '93d302b0686d61a151f179a3ab3b5484', '9', '1', '2013-12-09 14:57:06', '2013-12-09 14:57:06');
INSERT INTO `course_unit_task_list` VALUES ('d765ffc94ffb466dd1445cfbcd93fa03', '提示：<a href=\"http://www.python.org/getit/\">Python下载地址</a>（2.7或3.0以上两个分支任意版本）；文档阅读中，任何英文问题，欢迎通过电子邮件与你的英语指导老师沟通交流。', 'b28b4926e5a254f99008add6817e8e39', '18', '1', '2014-01-06 15:45:15', '2014-01-06 15:45:15');
INSERT INTO `course_unit_task_list` VALUES ('daad8dc330ec71f1afab68f6e15817f1', '<pre>\n<pre class=\"prettyprint lang-js\">print(\"Hello world\")\nprint(\"\"\"I\'m reading \"The Old Man and the Sea\" by Hemingway\"\"\")</pre>\n<span style=\"font-family:\'sans serif\', tahoma, verdana, helvetica;line-height:1.5;\">提示：Sublime Text 2模式需要创建一个文件，保存为扩展名为.py文本文件。</span></pre>', 'e0434a3b9555acbc9a34d14c1665e1c3', '18', '1', '2014-01-06 13:31:56', '2014-01-06 13:31:56');
INSERT INTO `course_unit_task_list` VALUES ('dcfc289268656f96be70b556a134f2fb', '<pre class=\"prettyprint lang-js\">print(\"Hello world\")\nprint(\"\"\"I\'m reading \"The Old Man and the Sea\" by Hemingway\"\"\")</pre>\n<p>提示：Sublime Text 2模式需要创建一个文件，保存为扩展名为.py文本文件。</p>', '4504719a3383c6fe38a684d8072111b5', '18', '1', '2014-01-06 15:51:24', '2014-01-06 15:51:24');
INSERT INTO `course_unit_task_list` VALUES ('ec96af5520ef3537de1d8e7f5003cfcf', '<pre class=\"prettyprint lang-js\">Enter your gross pay: 80000.00\nEnter the amount of bonus: 20000.00\n\nContribution for gross pay: ￥4000.00\nContribution for bonuses: ￥1000.00\nTotal amount: ￥5000.00</pre>\n<p>提示：请定义两个函数分别处理按年收入和季度奖金计算养老金补充金额；另外，请将Contribution Rate（5%）设置为一个全局常量。</p>', '0a783a4ea9d089794724e8b7d980974f', '18', '1', '2014-01-06 13:40:00', '2014-01-06 13:40:00');

-- ----------------------------
-- Table structure for `message_to_instructor`
-- ----------------------------
DROP TABLE IF EXISTS `message_to_instructor`;
CREATE TABLE `message_to_instructor` (
  `id` varchar(32) NOT NULL,
  `pub_user` int(11) NOT NULL,
  `noti_user` int(11) NOT NULL,
  `course_id` varchar(32) DEFAULT NULL,
  `unit_id` varchar(32) DEFAULT NULL,
  `task_id` varchar(32) DEFAULT NULL,
  `task_content_id` varchar(32) DEFAULT NULL,
  `discus_id` varchar(32) DEFAULT NULL,
  `content` varchar(140) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_assignment` tinyint(4) NOT NULL,
  `is_response` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of message_to_instructor
-- ----------------------------
INSERT INTO `message_to_instructor` VALUES ('0f8a5eb8ce1c1a51367a2dcd850996cb', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'fb7dfd46900aa80c903957ed39e5dccb', '', 'c05d2366ed9918dc74d47f10a11c81c9', '评论了一个作业', '0', '2014-03-07 19:15:02', '2014-03-07 19:15:02', '1', '1');
INSERT INTO `message_to_instructor` VALUES ('190cbd6c2aa52c9b3d52d38e6037cf45', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', '', '18f829ccd44706af4af5aa17c7bf659c', '评论了一个作业', '1', '2014-01-13 11:32:13', '2014-01-17 11:39:05', '1', '1');
INSERT INTO `message_to_instructor` VALUES ('21d3ff099bc436a1aecb303502a2210f', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', 'fea8c4a9e2dd7c63dd68ccb03c105eeb', '发起了一个讨论', '1', '2014-01-13 11:04:41', '2014-01-17 11:38:56', '0', '0');
INSERT INTO `message_to_instructor` VALUES ('61ccbdc1daf2842f936660e3980cdd39', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', '', '18f829ccd44706af4af5aa17c7bf659c', '评论了一个作业', '1', '2014-01-13 11:32:55', '2014-01-17 11:39:07', '1', '1');
INSERT INTO `message_to_instructor` VALUES ('a60724037b46b95b5382b227a5086dde', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '86ac31708d4e1f8b1a4c5622b19a46aa', '发起了一个讨论', '1', '2014-01-13 11:47:43', '2014-01-17 11:39:12', '0', '0');
INSERT INTO `message_to_instructor` VALUES ('eaedecbb4e6c59e9dec231e30a805da6', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', 'fea8c4a9e2dd7c63dd68ccb03c105eeb', '回复了一个讨论', '1', '2014-01-13 12:08:59', '2014-01-17 11:39:18', '0', '1');
INSERT INTO `message_to_instructor` VALUES ('f7daf72d1bfd59b342a0afd8b92616a1', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', '', '18f829ccd44706af4af5aa17c7bf659c', '评论了一个作业', '0', '2014-03-07 19:14:04', '2014-03-07 19:14:04', '1', '1');
INSERT INTO `message_to_instructor` VALUES ('fa4f399f75bee7296de407181031a2b6', '19', '22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484', 'd71f53772fa41f5df0ce99dba6e47090', '0baafa4a9513b7f2192491ee077c0513', '发起了一个讨论', '1', '2014-01-13 11:14:07', '2014-01-17 11:39:02', '0', '0');

-- ----------------------------
-- Table structure for `message_to_student`
-- ----------------------------
DROP TABLE IF EXISTS `message_to_student`;
CREATE TABLE `message_to_student` (
  `id` varchar(32) NOT NULL,
  `pub_user` int(11) NOT NULL,
  `noti_user` int(11) NOT NULL,
  `course_id` varchar(32) DEFAULT NULL,
  `unit_id` varchar(32) DEFAULT NULL,
  `task_id` varchar(32) DEFAULT NULL,
  `task_content_id` varchar(32) DEFAULT NULL,
  `discus_id` varchar(32) DEFAULT NULL,
  `content` varchar(140) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_assignment` tinyint(4) NOT NULL,
  `is_checked` tinyint(4) NOT NULL,
  `is_course_apply` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of message_to_student
-- ----------------------------

-- ----------------------------
-- Table structure for `migrations`
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('2013_10_29_055020_create_users_table', '1');
INSERT INTO `migrations` VALUES ('2013_10_29_081202_create_course_table', '1');

-- ----------------------------
-- Table structure for `task_type`
-- ----------------------------
DROP TABLE IF EXISTS `task_type`;
CREATE TABLE `task_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of task_type
-- ----------------------------
INSERT INTO `task_type` VALUES ('1', '问答型');
INSERT INTO `task_type` VALUES ('2', '流程型');
INSERT INTO `task_type` VALUES ('3', '程序型');
INSERT INTO `task_type` VALUES ('4', '讨论型');

-- ----------------------------
-- Table structure for `units_task_assignment`
-- ----------------------------
DROP TABLE IF EXISTS `units_task_assignment`;
CREATE TABLE `units_task_assignment` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `task_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `pub_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `course_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_complete` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of units_task_assignment
-- ----------------------------
INSERT INTO `units_task_assignment` VALUES ('18f829ccd44706af4af5aa17c7bf659c', '93d302b0686d61a151f179a3ab3b5484', '作业完成', '19', '2013-12-16 21:05:01', '2013-12-16 21:06:11', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '1');
INSERT INTO `units_task_assignment` VALUES ('a896f142355478da688dd9d0045039ab', '93d302b0686d61a151f179a3ab3b5484', '<h2>Dialogs</h2>\n\n<p>Please refer to the&nbsp;<a class=\"docClass\" href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.definition\" rel=\"CKEDITOR.dialog.definition\" style=\"color: rgb(12, 127, 204); text-decoration: none; box-sizing: border-box;\">Dialog definition API</a>&nbsp;for general help on how to create a dialog box.</p>\n\n<h2>Filebrowser Plugin</h2>\n\n<p>The&nbsp;filebrowser&nbsp;plugin is built-in into CKEditor. It&#39;s only purpose is to provide an API inside of CKEditor to easily integrate any external file browser with it and to add file browser features to various CKEditor components (usually to dialogs).</p>\n\n<h3>Adding &quot;Browse Server&quot; button</h3>\n\n<p>To assign the filebrowser plugin to an element inside of a dialog box, set the &quot;filebrowser&quot; property. For example in the&nbsp;image&nbsp;plugin source there is:</p>\n\n<pre class=\"prettyprint\">\n{\n    type: &#39;button&#39;,\n    hidden: true,\n    id: &#39;browse&#39;,\n    filebrowser: &#39;Link:txtUrl&#39;,\n    label: editor.lang.common.browseServer,\n    style: &#39;float:right&#39;,\n},</pre>\n\n<p>This button will be hidden by default (hidden:true). The filebrowser plugin looks for all elements with the filebrowser attribute and unhides them if appropriate configuration setting is available (<a href=\"http://docs.ckeditor.com/#!/guide/dev_file_browse_upload-section-1\" style=\"color: rgb(12, 127, 204); text-decoration: none; box-sizing: border-box;\">filebrowserBrowseUrl/filebrowserUploadUrl</a>).</p>\n\n<p>The action performed by the plugin depends on the element type, for&nbsp;<a class=\"docClass\" href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.definition.fileButton\" rel=\"CKEDITOR.dialog.definition.fileButton\" style=\"color: rgb(12, 127, 204); text-decoration: none; box-sizing: border-box;\">fileButton</a>&nbsp;it is&nbsp;<strong>QuickUpload</strong>, for other elements the default action is&nbsp;<strong>Browse</strong>. In the example above, the file browser will be launched (in a popup) when button is clicked.</p>\n\n<p>The&nbsp;&#39;Link:txtUrl&#39;&nbsp;value instructs the plugin to update an element with id&nbsp;txtUrl&nbsp;inside of the&nbsp;Link&nbsp;tab when&nbsp;<a class=\"docClass\" href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.tools-method-callFunction\" rel=\"CKEDITOR.tools-method-callFunction\" style=\"color: rgb(12, 127, 204); text-decoration: none; box-sizing: border-box;\">CKEDITOR.tools.callFunction</a>( funcNum )&nbsp;is called (see&nbsp;<a href=\"http://docs.ckeditor.com/#!/guide/dev_file_browser_api\" style=\"color: rgb(12, 127, 204); text-decoration: none; box-sizing: border-box;\">Custom File Browser</a>).</p>\n', '20', '2014-01-12 11:16:01', '2014-01-12 16:40:35', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '0');
INSERT INTO `units_task_assignment` VALUES ('c05d2366ed9918dc74d47f10a11c81c9', 'fb7dfd46900aa80c903957ed39e5dccb', '<h4>\n	1：代码如下\n</h4>\n<pre class=\"prettyprint lang-js\">/**\n * This function returns the parsed url parameters of the\n * current request. Multiple values per key are supported,\n * it will always return arrays of strings for the value parts.\n */\njQuery.getQueryParameters = function(s) {\n  if (typeof s == \'undefined\')\n    s = document.location.search;\n  var parts = s.substr(s.indexOf(\'?\') + 1).split(\'&amp;\');\n  var result = {};\n  for (var i = 0; i &lt; parts.length; i++) {\n    var tmp = parts[i].split(\'=\', 2);\n    var key = jQuery.urldecode(tmp[0]);\n    var value = jQuery.urldecode(tmp[1]);\n    if (key in result)\n      result[key].push(value);\n    else\n      result[key] = [value];\n  }\n  return result;\n};\n</pre>\n<h4>\n	2：这是一段代码\n</h4>\n<p>\n	<br />\n</p>\n<pre class=\"prettyprint lang-js\">/**\n * This function returns the parsed url parameters of the\n * current request. Multiple values per key are supported,\n * it will always return arrays of strings for the value parts.\n */\njQuery.getQueryParameters = function(s) {\n  if (typeof s == \'undefined\')\n    s = document.location.search;\n  var parts = s.substr(s.indexOf(\'?\') + 1).split(\'&amp;\');\n  var result = {};\n  for (var i = 0; i &lt; parts.length; i++) {\n    var tmp = parts[i].split(\'=\', 2);\n    var key = jQuery.urldecode(tmp[0]);\n    var value = jQuery.urldecode(tmp[1]);\n    if (key in result)\n      result[key].push(value);\n    else\n      result[key] = [value];\n  }\n  return result;\n};\n</pre>\n还有错吗 现在\n<p>\n	<br />\n</p>\n<p>\n	<br />\n</p>', '19', '2013-12-25 11:48:01', '2014-01-08 17:44:06', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '1');
INSERT INTO `units_task_assignment` VALUES ('ce4c4a886e17cae255a540e975cf093b', '9d8080e04dd230e81091a0dd654fdf7f', '<p>sHave you used&nbsp;<a href=\"http://slideshare.com/\" target=\"_blank\">SlideShare</a>? It is a Web 2.0 based slide hosting service &mdash; similar to YouTube, but for slideshows. With&nbsp;<a href=\"http://www.slideshare.net/about\" target=\"_blank\">60 million monthly visitors</a>&nbsp;and 130 million pageviews, it is amongst the most visited 200 websites in the world.</p>\n\n<p>The graphic marketing tool can&nbsp;<a href=\"http://www.searchdecoder.com/personal-branding-ebook/\" target=\"_blank\">turbocharge your personal branding</a>. Serving up images relevant to your brand combined with short, punchy text sends out an irresistible message to individuals interested in your brand.</p>\n\n<blockquote>If you do not prefer writing in-depth posts or mugging for videos Slideshare can be your online savior.</blockquote>\n\n<p>It is also a great medium for&nbsp;<a href=\"http://dinodogan.com/introverts-guide-to-self-promotion/\" target=\"_blank\">introverts interested in self-promotion</a>&nbsp;because you don&rsquo;t need to get in front of the camera or big audience.</p>\n\n<p>Content strategist&nbsp;<a href=\"http://blog.hubspot.com/blog/tabid/6307/bid/33461/7-Ways-to-Optimize-Your-SlideShare-Presentations-for-More-Traffic-Leads.aspx\" target=\"_blank\">Gregory Ciotti</a>&nbsp;explains that beautiful, well-designed SildeShare presentations garner the most attention.&nbsp;<strong>Pay attention to substance and style</strong>&nbsp;to build your personal brand using the creative marketing medium.</p>\n', '19', '2014-01-09 14:41:58', '2014-01-13 10:11:22', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '0');

-- ----------------------------
-- Table structure for `units_task_assignment_discus`
-- ----------------------------
DROP TABLE IF EXISTS `units_task_assignment_discus`;
CREATE TABLE `units_task_assignment_discus` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `assignment_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `pub_user` int(11) NOT NULL,
  `is_instructor` smallint(6) NOT NULL,
  `parent_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `course_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `task_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of units_task_assignment_discus
-- ----------------------------
INSERT INTO `units_task_assignment_discus` VALUES ('5fa849d4e7cbddd102839b8dae414281', 'a896f142355478da688dd9d0045039ab', '<h4>Syntaxhighlighter Interface</h4>\n\n<p>ckeditor-syntaxhighlight</p>\n\n<p>A plugin originally written for CKEditor 3+ that enables code syntax highlighting. Interface for Alex Gorbatchev&#39;s syntaxhighlighter.</p>\n\n<p>Updated to work with CKEditor 4+; some features added.</p>\n\n<p>Supported languages: English, German and French. Feel free to contribute further translations</p>\n', '20', '0', '', '2014-01-12 14:44:19', '2014-01-12 17:07:29', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484');
INSERT INTO `units_task_assignment_discus` VALUES ('69578e54e7b44fc6f8262dfc7a2847e6', 'a896f142355478da688dd9d0045039ab', '<p>作业讨论22</p>\n', '20', '0', '', '2014-01-12 16:44:36', '2014-01-12 17:07:19', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484');
INSERT INTO `units_task_assignment_discus` VALUES ('8011c184d06e4bdee3697be3d26a194c', 'ce4c4a886e17cae255a540e975cf093b', '<p>发一个讨论.</p>\n', '19', '0', '', '2014-01-09 14:44:45', '2014-01-12 17:10:45', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9d8080e04dd230e81091a0dd654fdf7f');
INSERT INTO `units_task_assignment_discus` VALUES ('931208f4befef85272944465a4d3b394', 'ce4c4a886e17cae255a540e975cf093b', '<p>评论第三ss</p>\n', '19', '0', '', '2014-01-09 16:39:47', '2014-01-13 10:10:33', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9d8080e04dd230e81091a0dd654fdf7f');
INSERT INTO `units_task_assignment_discus` VALUES ('b08f9cebc1a14a13f93bdd7a74cfe333', 'c05d2366ed9918dc74d47f10a11c81c9', '<p>谢谢大家。</p>\n', '19', '0', '', '2014-03-07 19:15:02', '2014-03-07 19:15:02', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'fb7dfd46900aa80c903957ed39e5dccb');
INSERT INTO `units_task_assignment_discus` VALUES ('b99bf91117848b717cf3225fadf1c3d9', 'ce4c4a886e17cae255a540e975cf093b', '测试作业评论', '19', '0', '', '2014-01-09 14:56:48', '2014-01-09 14:56:48', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '9d8080e04dd230e81091a0dd654fdf7f');
INSERT INTO `units_task_assignment_discus` VALUES ('b9b3fbb41911b8f9a3dc55612f01d931', 'c05d2366ed9918dc74d47f10a11c81c9', '测试作业', '19', '0', '', '2014-01-08 17:38:18', '2014-01-08 17:38:18', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'fb7dfd46900aa80c903957ed39e5dccb');
INSERT INTO `units_task_assignment_discus` VALUES ('bab6a50128a6b294dff633d404263fa6', '18f829ccd44706af4af5aa17c7bf659c', '<p>这是一个测试。</p>\n', '19', '0', '', '2014-03-07 19:14:04', '2014-03-07 19:14:04', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484');
INSERT INTO `units_task_assignment_discus` VALUES ('bb7c548730d3fdec98f3b9494977bed0', '18f829ccd44706af4af5aa17c7bf659c', '<p>These words might all mean the same thing to you. Perhaps you hear geek, nerd, and dweeb, but we all know these have very important differences. Knowing the differences also can give you a sense of how deep you want to go on your coding adventure.</p>\n\n<ul>\n	<li>Coders - Can pretty much figure out it. It&#39;ll work, but it won&#39;t be pretty.</li>\n	<li>Hackers - usually low level folks, skillful, with detailed understanding of some area deeply, often scarily deeply.</li>\n	<li>Programmer - Write code and understand algorithms. Often work alone and well.</li>\n	<li>Developer - Are the best generalists, can use lots of different systems and languages and get them to talk to each other. Are true and broad professionals, work with people, and communicate well.</li>\n</ul>\n\n<blockquote>\n<p>Computer Scientist - Need to be able to prove how computers work, at a theoretical level. Are usually math people also.</p>\n</blockquote>\n\n<p>If you are closer to one of these already you can get an idea of which direction to head.</p>\n', '19', '0', '', '2014-01-09 14:37:10', '2014-01-12 18:34:02', 'c73b3af472ed5d36ca4b533d4ac8995a', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', '93d302b0686d61a151f179a3ab3b5484');

-- ----------------------------
-- Table structure for `units_task_complete`
-- ----------------------------
DROP TABLE IF EXISTS `units_task_complete`;
CREATE TABLE `units_task_complete` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `task_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `pub_user` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of units_task_complete
-- ----------------------------

-- ----------------------------
-- Table structure for `units_task_list_complete`
-- ----------------------------
DROP TABLE IF EXISTS `units_task_list_complete`;
CREATE TABLE `units_task_list_complete` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `task_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `task_list_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `pub_user` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `course_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of units_task_list_complete
-- ----------------------------
INSERT INTO `units_task_list_complete` VALUES ('00092aad12192501fc206a68fb64618a', '93d302b0686d61a151f179a3ab3b5484', '92523b1f34026cc5e406ebb2731c34a8', '19', '1', '2013-12-16 21:10:03', '2014-01-13 11:14:41', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('0eabb352196de75a20174b02d735c987', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '21', '0', '2014-03-07 19:20:17', '2014-03-07 19:20:31', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('1846c5b09a377978db58f3a69ac01ba6', '93d302b0686d61a151f179a3ab3b5484', '67cacbe7d3091fc1e39d351bbbcd8afd', '19', '1', '2013-12-16 21:04:12', '2013-12-16 21:04:12', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('581efc8baa14776f2206f5ba1294cc73', 'fb7dfd46900aa80c903957ed39e5dccb', '074bca40b6c3140c0eb3f9a062483c84', '19', '1', '2013-12-19 16:43:30', '2013-12-19 16:43:30', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('6b98cf250895fc6d8da20872bb79b37c', '93d302b0686d61a151f179a3ab3b5484', '2e53c6c40035e34b1bfcfdc48bc9738c', '19', '0', '2014-01-08 15:14:20', '2014-01-31 23:11:53', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('7e651d70ee97f425767dcb5e1e2f549b', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '20', '0', '2014-01-07 16:47:45', '2014-01-14 12:06:17', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('8975c336a136ad055862a946be14f812', '93d302b0686d61a151f179a3ab3b5484', 'd71f53772fa41f5df0ce99dba6e47090', '19', '1', '2013-12-16 21:09:57', '2014-01-13 11:14:40', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('a3df5abb0c9113b87fd45268def6b6cf', 'fb7dfd46900aa80c903957ed39e5dccb', 'cdbec14b0b4947fd327a9d61f7f420ea', '19', '0', '2013-12-19 16:43:32', '2014-03-07 19:16:21', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('a427b2643c8170905007ef2267f9828e', '93d302b0686d61a151f179a3ab3b5484', '67cacbe7d3091fc1e39d351bbbcd8afd', '21', '0', '2014-03-07 19:20:27', '2014-03-07 19:20:33', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('a5260bf0b55d672baefd41f6dc0a739c', 'fb7dfd46900aa80c903957ed39e5dccb', 'a23a828d258f17108825d81a94bec0af', '19', '1', '2013-12-25 11:52:12', '2014-03-07 19:16:19', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('e1301691d4481c6215cfc1ea02a6b55a', '9d8080e04dd230e81091a0dd654fdf7f', '6669f1ef979ffbce4f334dfa0f6bf8c2', '19', '0', '2014-01-09 14:08:51', '2014-01-09 14:08:54', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('f7617b879f4aa837c4d3b8e429a54703', '93d302b0686d61a151f179a3ab3b5484', 'cda8cf2d330ffcadf19d68622822d0db', '19', '0', '2014-01-08 15:14:21', '2014-01-09 17:50:33', 'c73b3af472ed5d36ca4b533d4ac8995a');
INSERT INTO `units_task_list_complete` VALUES ('f954b8dd0542a7bde48b3a703fa135ad', '93d302b0686d61a151f179a3ab3b5484', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '19', '1', '2013-12-16 21:04:07', '2014-01-08 15:57:48', 'c73b3af472ed5d36ca4b533d4ac8995a');

-- ----------------------------
-- Table structure for `units_task_list_discus`
-- ----------------------------
DROP TABLE IF EXISTS `units_task_list_discus`;
CREATE TABLE `units_task_list_discus` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `course_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `task_parent_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `task_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `pub_user` int(11) NOT NULL,
  `is_instructor` smallint(6) NOT NULL,
  `parent_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_ok` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of units_task_list_discus
-- ----------------------------
INSERT INTO `units_task_list_discus` VALUES ('0baafa4a9513b7f2192491ee077c0513', 'c73b3af472ed5d36ca4b533d4ac8995a', '93d302b0686d61a151f179a3ab3b5484', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'd71f53772fa41f5df0ce99dba6e47090', '<p>发起一个新讨论</p>\n', '19', '0', '', '2014-01-13 11:14:07', '2014-01-13 11:14:07', '0');
INSERT INTO `units_task_list_discus` VALUES ('5b0f1fd1ee72a521bc4adfab1ef059e2', 'c73b3af472ed5d36ca4b533d4ac8995a', '93d302b0686d61a151f179a3ab3b5484', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '<p>测试回复</p>\n', '19', '0', 'fea8c4a9e2dd7c63dd68ccb03c105eeb', '2014-01-13 12:08:59', '2014-01-13 12:08:59', '0');
INSERT INTO `units_task_list_discus` VALUES ('86ac31708d4e1f8b1a4c5622b19a46aa', 'c73b3af472ed5d36ca4b533d4ac8995a', '93d302b0686d61a151f179a3ab3b5484', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '<p>发起一个新的讨论</p>\n', '19', '0', '', '2014-01-13 11:47:43', '2014-01-13 12:13:43', '1');
INSERT INTO `units_task_list_discus` VALUES ('fea8c4a9e2dd7c63dd68ccb03c105eeb', 'c73b3af472ed5d36ca4b533d4ac8995a', '93d302b0686d61a151f179a3ab3b5484', '8c02e26c9ab3e0fefbc97a6ae1bcfcff', 'd4ff6a5b9ff8aeb4aa5f932ad74dd747', '<h3>程序员们的开年技术书选择（标题 1）</h3>\n\n<h4>程序员们的开年技术书选择（标题 2）</h4>\n\n<p>大家好，这篇贴子是人民邮电出版社信息技术分社的第一期书讯，以后每个月的1号，我们都会从&ldquo;人邮IT书坊&rdquo;微信账号给大家推荐最新图书、最优秀、最热门的技术图书，希望大家多多关注信息技术分社图书，&ldquo;人邮IT书坊&rdquo;定期会有福利送给大家。</p>\n\n<blockquote>\n<p>大家好，这篇贴子是人民邮电出版社信息技术分社的第一期书讯，以后每个月的1号，我们都会从&ldquo;人邮IT书坊&rdquo;微信账号给大家推荐最新图书、最优秀、最热门的技术图书，希望大家多多关注信息技术分社图书，&ldquo;人邮IT书坊&rdquo;定期会有福利送给大家。</p>\n</blockquote>\n\n<pre class=\"brush:java;\">\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(&quot;Hello, World&quot;);\n    }\n}</pre>\n', '19', '0', '', '2014-01-13 11:04:41', '2014-01-17 12:19:29', '0');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(56) COLLATE utf8_unicode_ci NOT NULL,
  `group_id` int(11) NOT NULL,
  `login_count` int(11) NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '0',
  `score` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('18', '管理员', 'admin', '1', '0', '0', '0', '1', '2013-12-12 16:07:25', '2013-12-12 16:07:25');
INSERT INTO `users` VALUES ('19', '马云', '1', '1', '0', '0', '0', '2', '2013-12-12 16:38:56', '2013-12-12 16:38:56');
INSERT INTO `users` VALUES ('20', '李彦宏', '2', '1', '0', '0', '0', '2', '2013-12-12 16:44:38', '2013-12-12 16:44:38');
INSERT INTO `users` VALUES ('21', '马化腾', '3', '1', '0', '0', '0', '2', '2013-12-12 16:58:31', '2013-12-12 16:58:31');
INSERT INTO `users` VALUES ('22', '张银辉', '11', '1', '0', '0', '0', '3', '2013-12-12 16:59:39', '2013-12-12 16:59:39');
INSERT INTO `users` VALUES ('23', '周鸿祎', '4', '1', '0', '0', '0', '2', '2013-12-26 16:54:58', '2013-12-26 16:54:58');
INSERT INTO `users` VALUES ('24', 'gan', 'ganxg@trht.com.cn', '1', '0', '0', '0', '2', '2013-12-31 15:41:59', '2013-12-31 15:41:59');

-- ----------------------------
-- Table structure for `user_auth`
-- ----------------------------
DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE `user_auth` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(56) COLLATE utf8_unicode_ci NOT NULL,
  `login_time` datetime NOT NULL,
  `login_ip` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_auth
-- ----------------------------
INSERT INTO `user_auth` VALUES ('8fdd2b09de18ff373d0bf322effe3d7f', '19', '马云', '1', '2014-03-31 03:03:51', '::1', '2014-03-31 15:14:51', '2014-03-31 15:14:51');
INSERT INTO `user_auth` VALUES ('d050195df8522fc96cde933d3c58d96e', '21', '马化腾', '3', '2014-03-07 07:03:02', '123.127.240.133', '2014-03-07 19:18:02', '2014-03-07 19:18:02');

-- ----------------------------
-- Table structure for `user_course_auth`
-- ----------------------------
DROP TABLE IF EXISTS `user_course_auth`;
CREATE TABLE `user_course_auth` (
  `id` varchar(32) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` varchar(32) NOT NULL,
  `units_level` tinyint(4) NOT NULL,
  `task_level` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_course_auth
-- ----------------------------
INSERT INTO `user_course_auth` VALUES ('145b322434ab3fbeccfcea6d2e2f2284', '21', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '2013-12-12 17:01:33', '2013-12-12 17:01:33');
INSERT INTO `user_course_auth` VALUES ('6decc1e76552156e41072bdf92bdca74', '23', '0d9079779c360f6397c3cdfb450e68d3', '0', '0', '2014-01-08 17:30:38', '2014-01-08 17:30:38');
INSERT INTO `user_course_auth` VALUES ('75f5dd7e540aec9a760ef6c25ba2fa4a', '20', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '0', '2013-12-12 17:01:34', '2013-12-12 17:01:34');
INSERT INTO `user_course_auth` VALUES ('d6ba38f9daa06386323b3ef113566190', '19', 'c73b3af472ed5d36ca4b533d4ac8995a', '0', '2', '2013-12-12 17:01:36', '2014-01-08 17:44:06');

-- ----------------------------
-- Table structure for `user_ext`
-- ----------------------------
DROP TABLE IF EXISTS `user_ext`;
CREATE TABLE `user_ext` (
  `id` int(11) NOT NULL,
  `nickname` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `age` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `follower` int(11) NOT NULL,
  `followed` int(11) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `intro` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_ext
-- ----------------------------
INSERT INTO `user_ext` VALUES ('18', '', '', '', '0', '0', '0', '', '', '2013-12-12 16:07:25', '2013-12-12 16:07:25');
INSERT INTO `user_ext` VALUES ('19', '', '1389928767ea451ce36d367fcea419778d23afb82b', '21', '0', '0', '0', '', '', '2013-12-12 16:38:56', '2014-03-07 19:17:31');
INSERT INTO `user_ext` VALUES ('20', '', 'b2d907362bd5187f5dd8a00f39b52ddc', '', '0', '0', '0', '', '', '2013-12-12 16:44:38', '2013-12-12 16:57:13');
INSERT INTO `user_ext` VALUES ('21', '', '5f205c2a3a006c16702ece42906e36dc', '', '0', '0', '0', '', '', '2013-12-12 16:58:31', '2013-12-12 16:59:08');
INSERT INTO `user_ext` VALUES ('22', '', '8a2d00de7ca48ac48b6d419c6cab4f18', '25', '0', '0', '0', '', '', '2013-12-12 16:59:39', '2014-01-17 11:48:00');
INSERT INTO `user_ext` VALUES ('23', '', '', '', '0', '0', '0', '', '', '2013-12-26 16:54:59', '2013-12-26 16:54:59');
INSERT INTO `user_ext` VALUES ('24', '', '', '', '0', '0', '0', '', '', '2013-12-31 15:41:59', '2013-12-31 15:41:59');

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `desc` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '管理员', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `user_role` VALUES ('2', '学生', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `user_role` VALUES ('3', '老师', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `user_role` VALUES ('4', '普通用户', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for `user_role_auth`
-- ----------------------------
DROP TABLE IF EXISTS `user_role_auth`;
CREATE TABLE `user_role_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_role_auth
-- ----------------------------

-- ----------------------------
-- Table structure for `user_system`
-- ----------------------------
DROP TABLE IF EXISTS `user_system`;
CREATE TABLE `user_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(100) NOT NULL COMMENT '用户名',
  `email` varchar(100) DEFAULT NULL COMMENT '电子邮箱',
  `password` char(32) NOT NULL COMMENT '密码',
  `register_time` datetime NOT NULL COMMENT '注册时间',
  `register_ip` varchar(50) NOT NULL DEFAULT '127.0.0.1' COMMENT '注册IP',
  `last_login_time` datetime NOT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(50) NOT NULL DEFAULT '127.0.0.1' COMMENT '最后登录IP',
  `login_count` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `reset_key` char(32) DEFAULT NULL COMMENT '重置密码KEY',
  `reset_pwd` varchar(10) DEFAULT NULL COMMENT '重置密码VALUE',
  `error_time` datetime DEFAULT NULL COMMENT '登录错误时间',
  `error_count` int(11) DEFAULT '0' COMMENT '登录错误次数',
  `error_ip` varchar(50) DEFAULT NULL COMMENT '登录错误IP',
  `activation` tinyint(1) NOT NULL DEFAULT '1' COMMENT '激活状态',
  `activation_code` char(32) DEFAULT NULL COMMENT '激活码',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user_system
-- ----------------------------
INSERT INTO `user_system` VALUES ('18', '管理员', 'admin', '202cb962ac59075b964b07152d234b70', '2013-12-12 04:12:25', '::1', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-12 16:07:25', '2013-12-12 16:07:25');
INSERT INTO `user_system` VALUES ('19', '马云', '1', 'c4ca4238a0b923820dcc509a6f75849b', '2013-12-12 04:12:56', '::1', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-12 16:38:56', '2013-12-12 16:38:56');
INSERT INTO `user_system` VALUES ('20', '李彦宏', '2', 'c81e728d9d4c2f636f067f89cc14862c', '2013-12-12 04:12:38', '::1', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-12 16:44:38', '2013-12-12 16:44:38');
INSERT INTO `user_system` VALUES ('21', '马化腾', '3', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '2013-12-12 04:12:31', '::1', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-12 16:58:31', '2013-12-12 16:58:31');
INSERT INTO `user_system` VALUES ('22', '张银辉', '11', '6512bd43d9caa6e02c990b0a82652dca', '2013-12-12 04:12:39', '::1', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-12 16:59:39', '2013-12-12 16:59:39');
INSERT INTO `user_system` VALUES ('23', '周鸿祎', '4', 'a87ff679a2f3e71d9181a67b7542122c', '2013-12-26 04:12:59', '123.127.240.133', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-26 16:54:59', '2013-12-26 16:54:59');
INSERT INTO `user_system` VALUES ('24', 'gan', 'ganxg@trht.com.cn', 'e10adc3949ba59abbe56e057f20f883e', '2013-12-31 03:12:59', '123.127.240.133', '0000-00-00 00:00:00', '127.0.0.1', '0', '', null, null, '0', null, '1', null, '2013-12-31 15:41:59', '2013-12-31 15:41:59');
