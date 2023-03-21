-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 23, 2016 at 12:08 AM
-- Server version: 5.1.41
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `attmonsys`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_log`
--

CREATE TABLE IF NOT EXISTS `attendance_log` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `subjtid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `barcodeid` varchar(13) NOT NULL,
  `logdate` date NOT NULL,
  `logtime` time NOT NULL,
  `time_difference` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `remarks` varchar(6) NOT NULL,
  `type` varchar(15) NOT NULL,
  `place` varchar(10) NOT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `attendance_log`
--

INSERT INTO `attendance_log` (`logid`, `subjtid`, `sid`, `barcodeid`, `logdate`, `logtime`, `time_difference`, `status`, `remarks`, `type`, `place`) VALUES
(1, 1, 10, '4576347471892', '2016-03-23', '07:57:00', 27, 2, 'login', 'attendance', 'classroom');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `personnel_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `level` int(1) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`uid`, `tid`, `sid`, `personnel_id`, `username`, `password`, `firstname`, `lastname`, `level`) VALUES
(1, 0, 0, 0, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Admin', 'Admin', 3),
(30, 0, 0, 1, 'juantamad', 'ac12fc223a50b8270008064b1cf2122e', '', '', 1),
(39, 23, 0, 0, 'honey', 'b60eb83bf533eecf1bde65940925a981', '', '', 2),
(43, 24, 0, 0, 'chaw', '3e6a2a5423f4acf1628babe55e28232c', '', '', 2),
(44, 25, 0, 0, 'jonax', '2cd546acff828fcd15130afa6829dcf4', '', '', 2),
(45, 26, 0, 0, 'delts', 'e6193ea13ae2ec029ab6d609b3b3df43', '', '', 2),
(46, 0, 10, 0, 'serion@gmail.com', 'e4bd902344941805bd9f30230428b915', '', '', 0),
(48, 0, 12, 0, 'loren@gmail.com', 'f626d175faa4e99a923250e4ebdd5964', '', '', 0),
(49, 0, 13, 0, 'rojo@gmail.com', '172908ed2634376495c11cd95d000a84', '', '', 0),
(50, 0, 14, 0, 'delatorre@gmail.com', 'f6af0b86da64347ff8901cd447942fa7', '', '', 0),
(51, 0, 15, 0, 'ytienza@gmail.com', '6344981e990c08dbe7d2090c84f94ffc', '', '', 0),
(52, 0, 16, 0, 'villanueva@gmail.com', '03d0db3e32a29ae9d44c8ed7a7767ced', '', '', 0),
(53, 0, 17, 0, 'debuyan@gmail.com', '92b5ba7f2f833ef6634b0936d95be2fb', '', '', 0),
(54, 0, 18, 0, 'rosal@gmail.com', 'e07183edae6d7ef114033199587bee7b', '', '', 0),
(55, 0, 19, 0, 'malan@gmail.com', 'c496e0a22195a47621087b8cd4731a31', '', '', 0),
(56, 0, 20, 0, 'legarto@gmail.com', '32d950c9620dfa1ac3234405f74534d3', '', '', 0),
(57, 0, 21, 0, 'simbahon@gmail.com', '78b2ab9dc280c589d8ed24b5d9139084', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE IF NOT EXISTS `student_info` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `barcodeid` varchar(13) NOT NULL,
  `barcodeimg` varchar(17) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(6) NOT NULL,
  `image` varchar(250) NOT NULL,
  `schoolyear` varchar(9) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`sid`, `barcodeid`, `barcodeimg`, `firstname`, `lastname`, `email`, `password`, `image`, `schoolyear`) VALUES
(10, '4576347471892', '4576347471892.png', 'Reynan', 'Serion', 'serion@gmail.com', 'lHoTsZ', '4576347471892.jpg', '2015-2016'),
(12, '1231863596059', '1231863596059.png', 'Renzy', 'Loren', 'loren@gmail.com', 'CyCdm7', '1231863596059.jpg', '2015-2016'),
(13, '4283442873731', '4283442873731.png', 'Marie', 'Rojo', 'rojo@gmail.com', '2m2EoC', '4283442873731.jpg', '2015-2016'),
(14, '2517844712338', '2517844712338.png', 'Ronel', 'Dela Torre', 'delatorre@gmail.com', 'CKkCt5', '2517844712338.jpg', '2015-2016'),
(15, '4299780430464', '4299780430464.png', 'Donard', 'Ytienza', 'ytienza@gmail.com', '9tdRmg', '4299780430464.jpg', '2015-2016'),
(16, '3654456227360', '3654456227360.png', 'Carl', 'Villanueva', 'villanueva@gmail.com', 'lhu8OT', '3654456227360.jpg', '2015-2016'),
(17, '4166748267793', '4166748267793.png', 'Deolita', 'Debuyan', 'debuyan@gmail.com', 'YWSayK', '4166748267793.jpg', '2015-2016'),
(18, '2767718658354', '2767718658354.png', 'Rose Ann', 'Rosal', 'rosal@gmail.com', '4bPnN7', '2767718658354.jpg', '2015-2016'),
(19, '4741034816535', '4741034816535.png', 'Jemelyn', 'Malan', 'malan@gmail.com', 'i993pf', '4741034816535.jpg', '2015-2016'),
(20, '4436460444232', '4436460444232.png', 'Meryl', 'Legarto', 'legarto@gmail.com', 'tSoFlZ', '4436460444232.jpg', '2015-2016'),
(21, '6590362549500', '6590362549500.png', 'Georgie', 'Simbahon', 'simbahon@gmail.com', 'n4gXn6', '6590362549500.jpg', '2015-2016');

-- --------------------------------------------------------

--
-- Table structure for table `subject_info`
--

CREATE TABLE IF NOT EXISTS `subject_info` (
  `subjid` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(50) NOT NULL,
  `subject_description` longtext NOT NULL,
  PRIMARY KEY (`subjid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `subject_info`
--

INSERT INTO `subject_info` (`subjid`, `subject_name`, `subject_description`) VALUES
(11, 'IS 302', 'SURVEY OF PROGRAMMING LANGUAGES'),
(12, 'IS 303', 'STRUCTURED QUERY LANGUAGES'),
(13, 'IS 321', 'INFORMATION SYSTEM PLANNING'),
(14, 'IS 322', 'MANAGEMENT OF TECHNOLOGY'),
(15, 'IS 323', 'E-COMMERCE STRATEGY ARCHITECTURAL'),
(16, 'IS 324', 'SYSTEM ANALYSIS AND DESIGN'),
(17, 'LAW 1', 'LAW ON OBLIGATION AND CONTRACTS'),
(18, 'MQTB', 'QUANTITATIVE TECHNIQUES IN BUSINESS');

-- --------------------------------------------------------

--
-- Table structure for table `subject_teacher_student`
--

CREATE TABLE IF NOT EXISTS `subject_teacher_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjtid` int(11) NOT NULL,
  `yearsectionid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `subject_teacher_student`
--

INSERT INTO `subject_teacher_student` (`id`, `subjtid`, `yearsectionid`) VALUES
(33, 32, 3),
(34, 3, 13),
(35, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `subj_yearlevel`
--

CREATE TABLE IF NOT EXISTS `subj_yearlevel` (
  `subjyearlevelid` int(11) NOT NULL AUTO_INCREMENT,
  `subjid` int(11) NOT NULL,
  `yearlevelid` int(11) NOT NULL,
  PRIMARY KEY (`subjyearlevelid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `subj_yearlevel`
--

INSERT INTO `subj_yearlevel` (`subjyearlevelid`, `subjid`, `yearlevelid`) VALUES
(6, 11, 6),
(7, 12, 6),
(8, 13, 7),
(9, 14, 7),
(10, 15, 8),
(11, 16, 8),
(12, 17, 9),
(13, 18, 9);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_info`
--

CREATE TABLE IF NOT EXISTS `teacher_info` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `image` varchar(250) NOT NULL,
  `schoolyear` varchar(9) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `teacher_info`
--

INSERT INTO `teacher_info` (`tid`, `firstname`, `lastname`, `image`, `schoolyear`) VALUES
(23, 'Honey', 'Lemon', '4115849184090.jpg', '2015-2016'),
(24, 'Chawz', 'Puray', '2616597022400.jpg', '2015-2016'),
(25, 'Jonax', 'Valenz', '1489030162998.jpg', '2015-2016'),
(26, 'Allanz', 'Dela Torre', '4374609810500.jpg', '2015-2016');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subject`
--

CREATE TABLE IF NOT EXISTS `teacher_subject` (
  `subjtid` int(11) NOT NULL AUTO_INCREMENT,
  `subjid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  PRIMARY KEY (`subjtid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `teacher_subject`
--

INSERT INTO `teacher_subject` (`subjtid`, `subjid`, `tid`, `starttime`, `endtime`) VALUES
(1, 11, 23, '07:30:00', '08:30:00'),
(3, 12, 23, '08:30:00', '09:30:00'),
(4, 13, 24, '09:30:00', '10:30:00'),
(5, 14, 24, '10:30:00', '11:30:00'),
(6, 15, 25, '12:30:00', '11:30:00'),
(7, 16, 25, '13:00:00', '14:00:00'),
(8, 17, 26, '14:00:00', '15:00:00'),
(9, 18, 26, '15:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `yearlevel`
--

CREATE TABLE IF NOT EXISTS `yearlevel` (
  `yearlevelid` int(11) NOT NULL AUTO_INCREMENT,
  `yearname` varchar(255) NOT NULL,
  PRIMARY KEY (`yearlevelid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `yearlevel`
--

INSERT INTO `yearlevel` (`yearlevelid`, `yearname`) VALUES
(6, '1st Year'),
(7, '2nd Year'),
(8, '3rd Year'),
(9, '4th Year');

-- --------------------------------------------------------

--
-- Table structure for table `yearlevelsectionstudent`
--

CREATE TABLE IF NOT EXISTS `yearlevelsectionstudent` (
  `ylssid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL,
  `yearsectionid` int(11) NOT NULL,
  PRIMARY KEY (`ylssid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `yearlevelsectionstudent`
--

INSERT INTO `yearlevelsectionstudent` (`ylssid`, `sid`, `yearsectionid`) VALUES
(12, 10, 13),
(14, 12, 15),
(15, 13, 14),
(16, 14, 16),
(17, 15, 17),
(18, 16, 18),
(19, 17, 19),
(20, 18, 20),
(21, 19, 21),
(22, 20, 22),
(23, 21, 23);

-- --------------------------------------------------------

--
-- Table structure for table `year_section`
--

CREATE TABLE IF NOT EXISTS `year_section` (
  `yearsectionid` int(11) NOT NULL AUTO_INCREMENT,
  `sectionname` varchar(255) NOT NULL,
  `yearlevelid` int(11) NOT NULL,
  PRIMARY KEY (`yearsectionid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `year_section`
--

INSERT INTO `year_section` (`yearsectionid`, `sectionname`, `yearlevelid`) VALUES
(13, 'Setion A', 6),
(14, 'Section B', 6),
(15, 'Section C', 6),
(16, 'Section A', 7),
(17, 'Section B', 7),
(18, 'Section C', 7),
(19, 'Section A', 8),
(20, 'Section B', 8),
(21, 'Section C', 8),
(22, 'Section A', 9),
(23, 'Section B', 9);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
