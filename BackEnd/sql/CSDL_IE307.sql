-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 17, 2023 lúc 05:57 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ie307`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Samsung', 'Một trong những nhà sản xuất điện thoại hàng đầu thế giới', 'samsung.png', '2023-12-15 03:28:17', '2023-12-16 03:01:24'),
(2, 'iPhone', 'Sản phẩm của Apple với hệ điều hành iOS', 'iphone.png', '2023-12-15 03:28:17', '2023-12-16 03:01:30'),
(3, 'Oppo', 'Thương hiệu điện thoại Trung Quốc nổi tiếng', 'oppo.png', '2023-12-15 03:28:17', '2023-12-16 03:01:34'),
(4, 'Xiaomi', 'Nhà sản xuất công nghệ Trung Quốc, chuyên sản xuất điện thoại thông minh', 'xiaomi.png', '2023-12-15 03:28:17', '2023-12-16 03:01:40'),
(5, 'Vivo', 'Thương hiệu điện thoại Trung Quốc chuyên sản xuất điện thoại selfie', 'vivo.png', '2023-12-15 03:28:17', '2023-12-16 03:01:45'),
(6, 'Realme', 'Thương hiệu con của Oppo, chuyên sản xuất điện thoại giá rẻ', 'realme.png', '2023-12-15 03:28:17', '2023-12-16 03:01:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `amount` bigint(20) NOT NULL DEFAULT 0,
  `discount` bigint(20) NOT NULL DEFAULT 0,
  `delivery_address` varchar(255) NOT NULL,
  `status` enum('pending','shipped','delivered') NOT NULL DEFAULT 'pending',
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `payment_method` enum('cod','online') NOT NULL DEFAULT 'cod',
  `delivery_date` date DEFAULT NULL,
  `received_date` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `amount`, `discount`, `delivery_address`, `status`, `country`, `city`, `zipcode`, `payment_method`, `delivery_date`, `received_date`, `createdAt`, `updatedAt`) VALUES
(4, 2, 89970000, 0, '123', 'pending', '123', '456', '', 'cod', NULL, NULL, '2023-12-16 13:54:33', '2023-12-16 13:54:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(6, 4, 1, 1, 34990000.00, '2023-12-16 13:54:33', '2023-12-16 13:54:33'),
(7, 4, 2, 1, 28990000.00, '2023-12-16 13:54:33', '2023-12-16 13:54:33'),
(8, 4, 3, 1, 25990000.00, '2023-12-16 13:54:33', '2023-12-16 13:54:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `brand_id` bigint(20) NOT NULL,
  `price` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `brand_id`, `price`, `quantity`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'iPhone 15 Pro Max', 'iphone-15-pro-max-blue-thumbnew-600x600.jpg', 2, 34990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(2, 'iPhone 15 Pro', 'iphone-15-pro-black-thumbnew-600x600.jpg', 2, 28990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(3, 'iPhone 15 Plus', 'iphone-15-plus-128gb-xanh-thumb-600x600.jpg', 2, 25990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(4, 'iPhone 15', 'iphone-15-den-thumb-600x600.jpg', 2, 22990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(5, 'Samsung Galaxy A05', 'samsung-galaxy-a05-thumb-600x600.jpg', 1, 3090000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(6, 'OPPO Find N3 5G', 'oppo-find-n3-vang-dong-thumb-600x600.jpg', 3, 44990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(7, 'OPPO Find N3 Flip 5G', 'oppo-find-n3-flip-pink-thumb-600x600.jpeg', 3, 22990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(8, 'Xiaomi Redmi 13C', 'xiaomi-redmi-13c-xanh-1-2-600x600.jpg', 4, 3090000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(9, 'Xiaomi Redmi 12', 'xiaomi-redmi-12-bac-thumb-(1)-600x600.jpg', 4, 4290000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(10, 'vivo Y17s', 'vivo-y17-xanh-thumb-600x600.jpg', 5, 4490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(11, 'iPhone 14 Pro Max', 'iphone-14-pro-max-tim-thumb-600x600.jpg', 2, 29990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(12, 'Xiaomi 13T 5G', 'xiaomi-13-t-xanh-duong-thumb-thumb-600x600.jpg', 4, 11990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(13, 'OPPO Reno10 5G', 'oppo-reno10-blue-thumbnew-600x600.jpg', 3, 9990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(14, 'OPPO Reno10 Pro+ 5G', 'oppo-reno10-pro-plus-thumbnew-600x600.jpg', 3, 19990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(15, 'Samsung Galaxy S23 FE 5G', 'samsung-galaxy-s23-fe-xanh-thumb-600x600.jpg', 1, 14890000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(16, 'OPPO Reno10 Pro 5G', 'oppo-reno10-pro-grey-thumbnew-600x600.jpg', 3, 13990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(17, 'OPPO A57 128GB', 'oppo-a57-xanh-thumb-1-600x600.jpeg', 3, 4990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(18, 'vivo V25 series', 'vivo-v25-5g-vang-thumb-1-1-600x600.jpg', 5, 10490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(19, 'Xiaomi 13T Pro 5G', 'xiaomi-13t-pro-xanh-thumb-600x600.jpg', 4, 15990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(20, 'Xiaomi Redmi Note 12 4G', 'xiaomi-redmi-note-12-vang-1-thumb-momo-600x600.jpg', 4, 6490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(21, 'Xiaomi Redmi Note 12 Pro', 'xiaomi-redmi-12-pro-4g-xanh-thumb-600x600.jpg', 4, 7190000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(22, 'Xiaomi Redmi 12C', 'xiaomi-redmi-12c-grey-thumb-600x600.jpg', 4, 3590000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(23, 'Xiaomi 13 Lite 5G', 'xiaomi-13-lite-den-thumb-600x600.jpg', 4, 11490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(24, 'Xiaomi 12 5G', 'Xiaomi-12-xam-thumb-mau-600x600.jpg', 4, 13990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(25, 'realme C53', 'realme-c53-gold-thumb-1-600x600.jpg', 6, 4290000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(26, 'realme C30s (3GB/64GB)', 'realme-c30s-3gb-64gb-blue-thumb-600x600.jpg', 6, 2690000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(27, 'realme C55', 'realme-c35-vang-thumb-600x600.jpg', 6, 4990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(28, 'realme 10', 'realme-10-thumb-1-600x600.jpg', 6, 6390000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(29, 'realme C51', 'realme-c51-xanh-thumbnail-600x600.jpg', 6, 3690000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(30, 'Samsung Galaxy Z Fold5 5G', 'samsung-galaxy-z-fold5- kem-600x600.jpg', 1, 40990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(31, 'iPhone 14 Pro', 'iphone-14-pro-vang-thumb-600x600.jpg', 2, 27990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(32, 'Samsung Galaxy S23 Ultra 5G', 'samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg', 1, 31990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(33, 'Samsung Galaxy Z Fold4 5G', 'samsung-galaxy-z-fold4-kem-256gb-600x600.jpg', 1, 40990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(34, 'iPhone 14 Plus', 'iPhone-14-plus-thumb-xanh-1-600x600.jpg', 2, 24990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(35, 'Samsung Galaxy Z Flip5 5G', 'samsung-galaxy-z-flip5-xanh-mint-thumb-600x600.jpg', 1, 25990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(36, 'Samsung Galaxy S23+ 5G', 'samsung-galaxy-s23-plus-3-600x600.jpg', 1, 26990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(37, 'iPhone 14', 'iPhone-14-thumb-tim-1-600x600.jpg', 2, 21990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(38, 'OPPO Find N2 Flip 5G', 'oppo-find-n2-flip-purple-thumb-1-600x600-1-600x600.jpg', 3, 19990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(39, 'Samsung Galaxy S22 Ultra 5G 128GB', 'Galaxy-S22-Ultra-Burgundy-600x600.jpg', 1, 30990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(40, 'Samsung Galaxy S23 5G 128GB', 'samsung-galaxy-s23-600x600.jpg', 1, 22990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(41, 'iPhone 13', 'iphone-13-pink-2-600x600.jpg', 2, 18990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(42, 'Samsung Galaxy Z Flip4 5G', 'samsung-galaxy-z-flip4-5g-128gb-thumb-tim-600x600.jpg', 1, 23990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(43, 'realme 11 Pro+ 5G', 'realme-11-pro-plus-5g-thumb-600x600.jpeg', 6, 14990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(44, 'iPhone 12', 'iphone-12-tim-1-600x600.jpg', 2, 17990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(45, 'OPPO Reno8 Pro 5G', 'oppo-reno8-pro-thumb-den-600x600.jpg', 3, 18990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(46, 'vivo V29 5G', 'vivo-v29-tim-thumb-600x600.jpg', 5, 12990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(47, 'realme 11 Pro 5G', 'realme-11-pro-5g-green-thumb-1-600x600.jpg', 6, 11990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(48, 'iPhone 11', 'iphone-11-trang-600x600.jpg', 2, 11990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(49, 'Samsung Galaxy M54 5G', 'samsung-galaxy-m54-bac-thumb-600x600.jpg', 1, 11990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(50, 'Samsung Galaxy S21 FE 5G', 'Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg', 1, 12990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(51, 'Samsung Galaxy A54 5G', 'samsung-galaxy-a54-thumb-tim-600x600.jpg', 1, 10490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(52, 'vivo V25 Pro 5G', 'vivo-v25-pro-5g-xanh-thumb-1-600x600.jpg', 5, 13990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(53, 'OPPO Reno8 T 5G', 'oppo-reno8t-den1-thumb-600x600.jpg', 3, 10990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(54, 'vivo V29e 5G', 'vivo-v29e-tim-thumb-600x600.jpg', 5, 8990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(55, 'Xiaomi Redmi Note 12 Pro 5G', 'xiaomi-redmi-note-12-pro-5g-momo-1-600x600.jpg', 4, 9490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(56, 'Xiaomi Redmi Note 12 Pro 5G Tím', 'xiaomi-redmi-note-12-pro-5g-tim-thumb-1-600x600.jpg', 4, 9490000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(57, 'OPPO A98 5G', 'oppo-a98-5g-xanh-thumb-1-2-600x600.jpg', 3, 8990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(58, 'vivo V27e', 'vivo-v27e-tim-thumb-600x600.jpg', 5, 8990000, 999999, NULL, '2023-12-15 08:21:47', '2023-12-15 08:39:59'),
(59, 'Samsung Galaxy A34 5G', 'samsung-galaxy-a34-thumb-den-600x600.jpg', 1, 8490000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(60, 'Samsung Galaxy M34 5G', 'samsung-galaxy-m34-xanh-ngoc-thumb-600x600.jpg', 1, 7990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(61, 'OPPO Reno8 T', 'oppo-reno8t-4g-den1-thumb-600x600.jpg', 3, 8490000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(62, 'realme 11', 'realme-11-thumb-600x600.jpg', 6, 7390000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(63, 'OPPO A78', 'oppo-a78-xanh-thumb-1-600x600.jpg', 3, 6990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(64, 'Samsung Galaxy A24', 'samsung-galaxy-a24-black-thumb-600x600.jpg', 1, 6490000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(65, 'vivo Y36', 'vivo-y36-xanh-thumbnew-600x600.jpg', 5, 6290000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(66, 'Xiaomi Redmi Note 12S', 'xiaomi-redmi-note12s-den-thumb-600x600.jpg', 4, 6690000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(67, 'OPPO A58', 'oppo-a58-4g-green-thumb-600x600.jpg', 3, 5990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(68, 'OPPO A77s', 'oppo-a77s-xanh-thumb-1-600x600.jpg', 3, 6290000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(69, 'vivo Y35', 'vivo-y35-thumb-1-600x600.jpg', 5, 6990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(70, 'Samsung Galaxy A14 5G', 'samsung-galaxy-a14-5g-thumb-nau-600x600.jpg', 1, 5190000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(71, 'Samsung Galaxy A14 4G', 'samsung-galaxy-a14-tlte-thumb-den-600x600.jpg', 1, 4990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(72, 'OPPO A38', 'oppo-a38-gold-thumb-600x600.jpg', 3, 4490000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(73, 'Samsung Galaxy A05s', 'samsung-galaxy-a05s-sliver-thumb-600x600.jpeg', 1, 4490000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(74, 'vivo Y22s', 'vivo-y22s-vang-thumb-1-2-600x600.jpeg', 5, 5290000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(75, 'OPPO A18', 'oppo-a18-xanh-thumb-1-2-3-600x600.jpg', 3, 3690000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(76, 'Samsung Galaxy A04s', 'samsung-galaxy-a04s-thumb-den-600x600.jpg', 1, 3990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(77, 'OPPO A17', 'oppo-a17-den-thumb-600x600.jpg', 3, 3990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(78, 'vivo Y16 64GB', 'vivo-y16-vang-thumb-600x600.jpg', 5, 3990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(79, 'OPPO A17K', 'oppo-a17k-vang-thumb-Ä-600x600.jpg', 3, 3290000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(80, 'vivo Y02T', 'vivo-y02t-xanh-tim-thumb-600x600.jpg', 5, 2990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(81, 'Samsung Galaxy A04', 'samsung-galaxy-a04-thumb-xanh-600x600.jpg', 1, 2990000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(82, 'vivo Y02s 64GB', 'vivo-y02s-thumb-xanh-600x600.jpg', 5, 3290000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(83, 'vivo Y01', 'vivi-y01-Äen-thumb-600x600.jpg', 5, 2390000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59'),
(84, 'Xiaomi Redmi A2 series', 'xiaomi-redmi-a2-xanh-duong-thumbnail-600x600.jpg', 4, 2190000, 999999, NULL, '2023-12-15 08:21:48', '2023-12-15 08:39:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `ngaytao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaycapnhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `ngaytao`, `ngaycapnhat`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$S6Kvv4e.6spfaaYtbv2d.OSL.fRwTzuKhseZkeCrmO9cj1giPNKge', 'ROLE_ADMIN', '2023-12-16 12:35:43', '2023-12-16 12:36:07'),
(2, 'user2', 'user2@gmail.com', '$2b$10$HkA3dmvep21RLubf.mYqfOauTrRAvKtApgTXzHWdQ5uSyoEU0J.TC', 'ROLE_USER', '2023-12-15 15:28:52', '2023-12-15 15:28:52'),
(3, '123213', '123213@', '$2b$10$nMKb4My4HRcqNCoeBAhPZ.49nBmv8t9VTVEvL.tcCksLJyAa6BoWa', 'ROLE_USER', '2023-12-15 15:34:21', '2023-12-15 15:34:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlist`
--

CREATE TABLE `wishlist` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`,`product_id`),
  ADD KEY `donhang_id` (`order_id`),
  ADD KEY `dienthoai_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `thuonghieu_id` (`brand_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`,`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
