-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 01, 2022 at 04:34 PM
-- Server version: 5.7.17-log
-- PHP Version: 5.6.30

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbhawkeye`
--

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE usuarios (
  id INT(11) NOT NULL,
  nombre VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  contrasenia VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE videos (
  idUsuario INT(11),
  idCloudinary VARCHAR(124),
  urlVideo VARCHAR(124),
  urlMiniatura VARCHAR(124),
  titulo VARCHAR(50),
  rival VARCHAR(40) DEFAULT NULL,
  tipo VARCHAR(40),
  esFavorito TINYINT(1),
  FechaPartido DATE,
  arrayPiques TEXT,
  urlHeatmap VARCHAR(124),
  velocidades TEXT,
  PRIMARY KEY (idCloudinary),
  KEY FK (idUsuario)
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usuarios`
--
ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

--
-- Indexes for table `videos`
--
ALTER TABLE videos
  ADD PRIMARY KEY (idCloudinary),
  ADD KEY `FK` (idUsuario);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE usuarios
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `videos`
--
ALTER TABLE videos
  ADD CONSTRAINT `FK` FOREIGN KEY (idUsuario) REFERENCES usuarios (id);

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
