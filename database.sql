-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for alsanmotor
DROP DATABASE IF EXISTS `alsanmotor`;
CREATE DATABASE IF NOT EXISTS `alsanmotor` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `alsanmotor`;

-- Dumping structure for table alsanmotor.beban
DROP TABLE IF EXISTS `beban`;
CREATE TABLE IF NOT EXISTS `beban` (
  `kode_beban` varchar(6) NOT NULL,
  `nama_beban` varchar(50) NOT NULL,
  `nama_form` varchar(50) NOT NULL,
  PRIMARY KEY (`kode_beban`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.beban: ~5 rows (approximately)
/*!40000 ALTER TABLE `beban` DISABLE KEYS */;
REPLACE INTO `beban` (`kode_beban`, `nama_beban`, `nama_form`) VALUES
	('BB001', 'Electricity', 'listrik'),
	('BB002', 'Water', 'air'),
	('BB003', 'Employees Salary', 'gaji_karyawan'),
	('BB004', 'Service needs', 'belanja_kebutuhan_jasa'),
	('BB005', 'Miscellaneous', 'lain_lain');
/*!40000 ALTER TABLE `beban` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.beban_d
DROP TABLE IF EXISTS `beban_d`;
CREATE TABLE IF NOT EXISTS `beban_d` (
  `kode_transaksi_beban` varchar(13) NOT NULL,
  `kode_beban` varchar(6) NOT NULL,
  `biaya` float NOT NULL,
  KEY `kode_transaksi_beban` (`kode_transaksi_beban`),
  CONSTRAINT `beban_d_ibfk_1` FOREIGN KEY (`kode_transaksi_beban`) REFERENCES `beban_h` (`kode_transaksi_beban`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.beban_d: ~0 rows (approximately)
/*!40000 ALTER TABLE `beban_d` DISABLE KEYS */;
/*!40000 ALTER TABLE `beban_d` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.beban_h
DROP TABLE IF EXISTS `beban_h`;
CREATE TABLE IF NOT EXISTS `beban_h` (
  `kode_transaksi_beban` varchar(13) NOT NULL,
  `bulan` date NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`kode_transaksi_beban`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.beban_h: ~0 rows (approximately)
/*!40000 ALTER TABLE `beban_h` DISABLE KEYS */;
/*!40000 ALTER TABLE `beban_h` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.distributor
DROP TABLE IF EXISTS `distributor`;
CREATE TABLE IF NOT EXISTS `distributor` (
  `kode_distributor` varchar(13) NOT NULL,
  `nama_distributor` varchar(50) NOT NULL,
  `no_telepon` varchar(15) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  PRIMARY KEY (`kode_distributor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.distributor: ~3 rows (approximately)
/*!40000 ALTER TABLE `distributor` DISABLE KEYS */;
REPLACE INTO `distributor` (`kode_distributor`, `nama_distributor`, `no_telepon`, `alamat`) VALUES
	('DS10032019003', 'BelanjaSparePart.com', '08746389264', 'Jalan Kebon Pala 2'),
	('DS26092018001', 'Jaya Distributor', '081519329905', 'Jalan Jendral Sudirman'),
	('DS30092018002', 'Makmur Distributor', '081519329905', 'Jalan Bunga Dalam 1');
/*!40000 ALTER TABLE `distributor` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.divisi
DROP TABLE IF EXISTS `divisi`;
CREATE TABLE IF NOT EXISTS `divisi` (
  `Kode_Divisi` varchar(5) NOT NULL,
  `Nama_Divisi` varchar(30) NOT NULL,
  PRIMARY KEY (`Kode_Divisi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.divisi: ~4 rows (approximately)
/*!40000 ALTER TABLE `divisi` DISABLE KEYS */;
REPLACE INTO `divisi` (`Kode_Divisi`, `Nama_Divisi`) VALUES
	('ADM', 'Administrator'),
	('KSR', 'Cashier'),
	('OWN', 'Owner'),
	('STM', 'Steam');
/*!40000 ALTER TABLE `divisi` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.jumlah
DROP TABLE IF EXISTS `jumlah`;
CREATE TABLE IF NOT EXISTS `jumlah` (
  `product` int(11) NOT NULL,
  `karyawan` int(11) NOT NULL,
  `distributor` int(11) NOT NULL,
  `pembelian` int(11) NOT NULL,
  `penjualan` int(11) NOT NULL,
  `pemesanan` int(11) NOT NULL,
  `beban` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.jumlah: ~1 rows (approximately)
/*!40000 ALTER TABLE `jumlah` DISABLE KEYS */;
REPLACE INTO `jumlah` (`product`, `karyawan`, `distributor`, `pembelian`, `penjualan`, `pemesanan`, `beban`) VALUES
	(10, 3, 3, 0, 0, 1, 3);
/*!40000 ALTER TABLE `jumlah` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.karyawan
DROP TABLE IF EXISTS `karyawan`;
CREATE TABLE IF NOT EXISTS `karyawan` (
  `kode_karyawan` varchar(13) NOT NULL,
  `nama_karyawan` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telp` varchar(15) NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `kode_divisi` varchar(5) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `userid` varchar(10) NOT NULL,
  PRIMARY KEY (`kode_karyawan`),
  KEY `kode_divisi` (`kode_divisi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.karyawan: ~5 rows (approximately)
/*!40000 ALTER TABLE `karyawan` DISABLE KEYS */;
REPLACE INTO `karyawan` (`kode_karyawan`, `nama_karyawan`, `email`, `jenis_kelamin`, `alamat`, `no_telp`, `tanggal_masuk`, `kode_divisi`, `foto`, `userid`) VALUES
	('admin', 'Ali', '', 'Male', '', '', '2009-04-20', 'ADM', 'team-01.PNG', 'admin'),
	('KR10032019003', 'Gabrielle', 'hafidh2704@gmail.com', 'Female', 'Jalan Menteng Raya', '085817911180', '2019-03-10', 'KSR', '30746.jpg', 'gabrielle'),
	('KR25092018001', 'Pawandeep', 'cobawebgratis@gmail.com', 'Male', 'Jalan Bunga Dalam 1 No.11 Matraman', '085713147829', '2018-09-25', 'KSR', 'PAWANDEEP.JPG', 'pawandeep'),
	('KR30092018002', 'Ritesh', 'samsunggn3exynos@gmail.com', 'Male', 'Jalan Matraman Raya No.20', '085817911180', '2018-09-30', 'STM', '7558.jpg', ''),
	('owner', 'Avie Susana', '', 'Female', '', '', '2009-04-20', 'OWN', 'team-02.png', 'owner');
/*!40000 ALTER TABLE `karyawan` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.kategori
DROP TABLE IF EXISTS `kategori`;
CREATE TABLE IF NOT EXISTS `kategori` (
  `Kode_Kategori` varchar(3) NOT NULL,
  `Kategori` varchar(50) NOT NULL,
  PRIMARY KEY (`Kode_Kategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.kategori: ~3 rows (approximately)
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
REPLACE INTO `kategori` (`Kode_Kategori`, `Kategori`) VALUES
	('ACS', 'Accessories'),
	('JSA', 'Service'),
	('SPR', 'Spare Part');
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.mobil
DROP TABLE IF EXISTS `mobil`;
CREATE TABLE IF NOT EXISTS `mobil` (
  `plat_nomor` varchar(13) NOT NULL,
  `merk_mobil` varchar(50) NOT NULL,
  `nama_mobil` varchar(50) NOT NULL,
  `pemilik` varchar(50) NOT NULL,
  `jenis` varchar(15) NOT NULL,
  `jumlah_cuci` int(11) NOT NULL,
  `User_Id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`plat_nomor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.mobil: ~6 rows (approximately)
/*!40000 ALTER TABLE `mobil` DISABLE KEYS */;
REPLACE INTO `mobil` (`plat_nomor`, `merk_mobil`, `nama_mobil`, `pemilik`, `jenis`, `jumlah_cuci`, `User_Id`) VALUES
	('1', 'General', 'General', 'General', 'Umum', 0, NULL),
	('B2361MF', 'Mitsubitsihi', 'Xpander Cross', 'Brian McKnight', 'Langganan', 0, 'brian'),
	('B2947JDU', 'Honda', 'Jazz', 'Kurt Cobain', 'Langganan', 0, 'kurt'),
	('B2983TMU', 'Daihatsu', 'Ayla', 'Celine Dion', 'Langganan', 0, 'celine'),
	('B4578TMU', 'Nissan', 'Livina', 'Mariah Carey', 'Langganan', 0, 'mariah'),
	('B777JR', 'Honda', 'Brio', 'Penguasa', 'Langganan', 0, 'penguasa'),
	('B8872KG', 'Toyota', 'Camry', 'Ibnu Sina', 'Langganan', 0, 'ibnu');
/*!40000 ALTER TABLE `mobil` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.pembelian_d
DROP TABLE IF EXISTS `pembelian_d`;
CREATE TABLE IF NOT EXISTS `pembelian_d` (
  `kode_pembelian` varchar(16) NOT NULL,
  `kode_product` varchar(16) NOT NULL,
  `harga` float NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` float NOT NULL,
  KEY `kode_pembelian` (`kode_pembelian`),
  KEY `kode_barang` (`kode_product`),
  CONSTRAINT `pembelian_d_ibfk_1` FOREIGN KEY (`kode_pembelian`) REFERENCES `pembelian_h` (`kode_pembelian`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.pembelian_d: ~0 rows (approximately)
/*!40000 ALTER TABLE `pembelian_d` DISABLE KEYS */;
/*!40000 ALTER TABLE `pembelian_d` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.pembelian_h
DROP TABLE IF EXISTS `pembelian_h`;
CREATE TABLE IF NOT EXISTS `pembelian_h` (
  `kode_pembelian` varchar(16) NOT NULL,
  `kode_karyawan` varchar(13) NOT NULL,
  `kode_distributor` varchar(13) NOT NULL,
  `tanggal_pembelian` date NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`kode_pembelian`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.pembelian_h: ~0 rows (approximately)
/*!40000 ALTER TABLE `pembelian_h` DISABLE KEYS */;
/*!40000 ALTER TABLE `pembelian_h` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.pemesanan_d
DROP TABLE IF EXISTS `pemesanan_d`;
CREATE TABLE IF NOT EXISTS `pemesanan_d` (
  `kode_pemesanan` varchar(16) NOT NULL,
  `kode_product` varchar(16) NOT NULL,
  `harga` float NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` float NOT NULL,
  KEY `kode_pemesanan` (`kode_pemesanan`),
  KEY `kode_product` (`kode_product`),
  CONSTRAINT `pemesanan_d_ibfk_1` FOREIGN KEY (`kode_pemesanan`) REFERENCES `pemesanan_h` (`kode_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.pemesanan_d: ~2 rows (approximately)
/*!40000 ALTER TABLE `pemesanan_d` DISABLE KEYS */;
REPLACE INTO `pemesanan_d` (`kode_pemesanan`, `kode_product`, `harga`, `qty`, `sub_total`) VALUES
	('PM24092020001', 'PR21112018SPR003', 4000, 2, 8000),
	('PM24092020001', 'PR26052019SPR009', 10000, 2, 20000);
/*!40000 ALTER TABLE `pemesanan_d` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.pemesanan_h
DROP TABLE IF EXISTS `pemesanan_h`;
CREATE TABLE IF NOT EXISTS `pemesanan_h` (
  `kode_pemesanan` varchar(16) NOT NULL,
  `kode_karyawan` varchar(13) NOT NULL,
  `plat_nomor` varchar(13) NOT NULL,
  `tanggal_pemesanan` date NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total` float NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  `sumber` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`kode_pemesanan`),
  KEY `kode_karyawan` (`kode_karyawan`),
  KEY `kode_pelanggan` (`plat_nomor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.pemesanan_h: ~2 rows (approximately)
/*!40000 ALTER TABLE `pemesanan_h` DISABLE KEYS */;
REPLACE INTO `pemesanan_h` (`kode_pemesanan`, `kode_karyawan`, `plat_nomor`, `tanggal_pemesanan`, `total_qty`, `total`, `status`, `sumber`) VALUES
	('PM24092020001', 'KR25092018001', 'B8872KG', '2020-07-28', 4, 28000, 'LUNAS', 'ANDROID'),
	('PM24092020002', 'KR25092018001', 'B8872KG', '2020-07-28', 4, 28000, 'LUNAS', 'ANDROID');
/*!40000 ALTER TABLE `pemesanan_h` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.penjualan_d
DROP TABLE IF EXISTS `penjualan_d`;
CREATE TABLE IF NOT EXISTS `penjualan_d` (
  `kode_penjualan` varchar(16) NOT NULL,
  `kode_product` varchar(16) NOT NULL,
  `harga` float NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` float NOT NULL,
  KEY `kode_penjualan` (`kode_penjualan`),
  KEY `kode_product` (`kode_product`),
  CONSTRAINT `penjualan_d_ibfk_1` FOREIGN KEY (`kode_penjualan`) REFERENCES `penjualan_h` (`kode_penjualan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.penjualan_d: ~0 rows (approximately)
/*!40000 ALTER TABLE `penjualan_d` DISABLE KEYS */;
/*!40000 ALTER TABLE `penjualan_d` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.penjualan_h
DROP TABLE IF EXISTS `penjualan_h`;
CREATE TABLE IF NOT EXISTS `penjualan_h` (
  `kode_penjualan` varchar(16) NOT NULL,
  `kode_karyawan` varchar(13) NOT NULL,
  `plat_nomor` varchar(13) NOT NULL,
  `tanggal_penjualan` date NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total` float NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  `sumber` varchar(30) DEFAULT NULL,
  `kode_pemesanan` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`kode_penjualan`),
  KEY `kode_karyawan` (`kode_karyawan`),
  KEY `kode_pelanggan` (`plat_nomor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.penjualan_h: ~0 rows (approximately)
/*!40000 ALTER TABLE `penjualan_h` DISABLE KEYS */;
/*!40000 ALTER TABLE `penjualan_h` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `Kode_Product` varchar(16) NOT NULL,
  `Nama_Product` varchar(50) NOT NULL,
  `Kode_Kategori` varchar(3) NOT NULL,
  `Merk` varchar(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Harga_Beli` float NOT NULL,
  `Harga_Jual` float NOT NULL,
  `Stock` float NOT NULL,
  PRIMARY KEY (`Kode_Product`),
  KEY `Kode_Kategori` (`Kode_Kategori`),
  KEY `Kode_Kategori_2` (`Kode_Kategori`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Kode_Kategori`) REFERENCES `kategori` (`Kode_Kategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.product: ~9 rows (approximately)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
REPLACE INTO `product` (`Kode_Product`, `Nama_Product`, `Kode_Kategori`, `Merk`, `Type`, `Harga_Beli`, `Harga_Jual`, `Stock`) VALUES
	('PR19052019ACS007', 'Audio Full Set', 'ACS', 'Pioneer', 'DDX 750', 3000000, 6000000, 50),
	('PR19052019JSA008', 'Vacuum', 'JSA', '', '', 0, 10000, 0),
	('PR21072020ACS010', 'Kaca Film', 'ACS', 'Solar Gard', 'LX Premium Series Besar', 2000000, 2599000, 50),
	('PR21112018JSA002', 'Cuci', 'JSA', '', '', 0, 30000, 0),
	('PR21112018JSA004', 'Spooring ', 'JSA', '', '', 0, 300000, 0),
	('PR21112018SPR003', 'Busi Toyota Avanza', 'SPR', 'Toyota', 'TYTBS3', 100000, 180000, 50),
	('PR26052019SPR009', 'Kaca Spion Aavanza', 'SPR', '', '', 100000, 150000, 50),
	('PR26092018ACS001', 'Head Unit Sony', 'ACS', 'Sony', 'XAV-712BT', 3000000, 4000000, 50),
	('PR27012019ACS005', 'Bantal', 'ACS', '', '', 150000, 250000, 50);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table alsanmotor.userr
DROP TABLE IF EXISTS `userr`;
CREATE TABLE IF NOT EXISTS `userr` (
  `User_Id` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Levell` varchar(1) NOT NULL,
  PRIMARY KEY (`User_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table alsanmotor.userr: ~5 rows (approximately)
/*!40000 ALTER TABLE `userr` DISABLE KEYS */;
REPLACE INTO `userr` (`User_Id`, `email`, `Password`, `Levell`) VALUES
	('admin', '', '5f4dcc3b5aa765d61d8327deb882cf99', '1'),
	('brian', 'brian@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '3'),
	('ibnu', 'ibnu@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '3'),
	('owner', '', '5f4dcc3b5aa765d61d8327deb882cf99', '1'),
	('pawandeep', 'pawandeep@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '2'),
	('penguasa', 'penguasaphonty@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '3');
/*!40000 ALTER TABLE `userr` ENABLE KEYS */;

-- Dumping structure for trigger alsanmotor.beli
DROP TRIGGER IF EXISTS `beli`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `beli` AFTER INSERT ON `pembelian_d` FOR EACH ROW BEGIN
 UPDATE product
 SET Stock = Stock+New.qty
 WHERE
 kode_product = NEW.kode_product;
 END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger alsanmotor.jual
DROP TRIGGER IF EXISTS `jual`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `jual` AFTER INSERT ON `penjualan_d` FOR EACH ROW UPDATE product SET Stock=Stock-NEW.qty WHERE Kode_Product = NEW.kode_product//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
