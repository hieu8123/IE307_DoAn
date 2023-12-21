-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 20, 2023 lúc 10:47 AM
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
(1, 'Samsung', 'One of the world\'s leading smartphone manufacturers', 'samsung.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48'),
(2, 'iPhone', 'Apple\'s product with the iOS operating system', 'iphone.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48'),
(3, 'Oppo', 'Famous Chinese smartphone brand', 'oppo.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48'),
(4, 'Xiaomi', 'Chinese technology manufacturer specializing in smartphones', 'xiaomi.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48'),
(5, 'Vivo', 'Chinese smartphone brand specializing in selfie phones', 'vivo.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48'),
(6, 'Realme', 'Oppo\'s sub-brand specializing in affordable smartphones', 'realme.png', '2023-12-15 03:28:17', '2023-12-18 04:33:48');

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
  `code` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `amount`, `discount`, `delivery_address`, `status`, `country`, `city`, `zipcode`, `payment_method`, `delivery_date`, `received_date`, `code`, `createdAt`, `updatedAt`) VALUES
(4, 2, 89970000, 0, '123', 'pending', '123', '456', '', 'cod', NULL, NULL, '$2b$10$uGbydudQFQy2nYy/S36jIOZmXOM8VN7L1uO8BltvizfvuAfpKiw/e', '2023-12-16 13:54:33', '2023-12-20 08:01:02');

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
  `code` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `brand_id`, `price`, `quantity`, `description`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'iPhone 15 Pro Max', 'iphone-15-pro-max-blue-thumbnew-600x600.jpg', 2, 34990000, 999999, 'Experience the cutting-edge technology with the iPhone 15 Pro Max. This stunning device boasts a vibrant blue design, a massive 34990000 price tag, and unlimited possibilities.', '$2b$10$rNxSCJJFdWAKK/KrPiGe9ufZkwgRJVnPgztWozsjmekqbUT2FgdLG', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(2, 'iPhone 15 Pro', 'iphone-15-pro-black-thumbnew-600x600.jpg', 2, 28990000, 999999, 'Elevate your mobile experience with the sleek iPhone 15 Pro in classic black. Packed with powerful features, this device is priced at 28990000, offering you unmatched performance and style.', '$2b$10$wK2AZYAP256tFgw0MiWI6Oti9LyAlzOLSlHCNm53Oz80LWEz9acQq', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(3, 'iPhone 15 Plus', 'iphone-15-plus-128gb-xanh-thumb-600x600.jpg', 2, 25990000, 999999, 'Get more with the iPhone 15 Plus! With 128GB of storage and a stylish green design, this device is priced at 25990000, providing ample space for your files and a refreshing look.', '$2b$10$7jOn3uUD3gjGojAPjVSgsOQr4XLviky3CvgZLM/CbXHEA6vMPRnry', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(4, 'iPhone 15', 'iphone-15-den-thumb-600x600.jpg', 2, 22990000, 999999, 'Introducing the iPhone 15, a device that combines style and functionality. With a sleek denim design and a price of 22990000, this smartphone is a perfect blend of affordability and performance.', '$2b$10$5.29Bj1.3VLMvKpQC/ab0.qyunzmgriDv4CNCvb2bG7Nxm4Cmz6Bi', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(5, 'Samsung Galaxy A05', 'samsung-galaxy-a05-thumb-600x600.jpg', 1, 3090000, 999999, 'Discover the Samsung Galaxy A05, a budget-friendly smartphone with a sleek design. Priced at 3090000, it offers great value for your money.', '$2b$10$NsDLpTZMmL8HTTqSdt9Lr.e7j2kTHr2HGLA7kcl.xhhBYl59WmnGq', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(6, 'OPPO Find N3 5G', 'oppo-find-n3-vang-dong-thumb-600x600.jpg', 3, 44990000, 999999, 'Unleash the power of 5G with the OPPO Find N3 5G. This device, priced at 44990000, redefines speed and innovation in the palm of your hand.', '$2b$10$eFB3r0YGWmpgKkQyLFjnIuFoxklwGnTTqhkC0I6/gBNg0r0/D4d5e', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(7, 'OPPO Find N3 Flip 5G', 'oppo-find-n3-flip-pink-thumb-600x600.jpeg', 3, 22990000, 999999, 'Experience the future with the OPPO Find N3 Flip 5G. Its unique flip design and pink color make it a stylish choice, and at 22990000, it is both fashionable and functional.', '$2b$10$bJxZb0BCeE1JJWagPQVzCe/YUahYTP/6yU51XI7GrzaovDI3y1/oq', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(8, 'Xiaomi Redmi 13C', 'xiaomi-redmi-13c-xanh-1-2-600x600.jpg', 4, 3090000, 999999, 'Meet the Xiaomi Redmi 13C, a budget-friendly device with a cool blue design. Priced at 3090000, it is a perfect companion for your daily tasks.', '$2b$10$UIVOmHTC5tcb/52Qk/pMFuS7hveSX.gprw1baHw.EjRMFv1FfuoNK', '2023-12-15 08:21:47', '2023-12-20 07:59:57'),
(9, 'Xiaomi Redmi 12', 'xiaomi-redmi-12-bac-thumb-(1)-600x600.jpg', 4, 4290000, 999999, 'Step up your smartphone game with the Xiaomi Redmi 12. With a sleek silver design and a price tag of 4290000, it offers a perfect balance of style and performance.', '$2b$10$0/zvSffq6iAN5y8qG0RJaucoASkz6UNT70sVE8sRfHjrKfNfQj6zq', '2023-12-15 08:21:47', '2023-12-20 09:17:07'),
(10, 'vivo Y17s', 'vivo-y17-xanh-thumb-600x600.jpg', 5, 4490000, 999999, 'Explore the features of the vivo Y17s. With its vibrant green color and a price of 4490000, it is a budget-friendly choice packed with impressive capabilities.', '$2b$10$5DGsxNHGidRKpo3w9wME5OMwuI5G.aLehQDYbYXIDvXZqpXb1ylLW', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(11, 'iPhone 14 Pro Max', 'iphone-14-pro-max-tim-thumb-600x600.jpg', 2, 29990000, 999999, 'Discover the features of the iPhone 14 Pro Max. With its elegant purple design and a price tag of 29990000, it combines style and performance for an exceptional mobile experience.', '$2b$10$/B8BYhOr80vjHYwQKf0Qy.nRRvh22pcHOZyQGxAOBD4B5hhIkB8W.', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(12, 'Xiaomi 13T 5G', 'xiaomi-13-t-xanh-duong-thumb-thumb-600x600.jpg', 4, 11990000, 999999, 'Introducing the Xiaomi 13T 5G, a powerful device with a captivating blue design. Priced at 11990000, it offers 5G connectivity and high-end features for an affordable price.', '$2b$10$4r9OFS896Faa9J9JOqSHzeyB104MOxw7lprZS/WjfY.QayamU3/Ya', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(13, 'OPPO Reno10 5G', 'oppo-reno10-blue-thumbnew-600x600.jpg', 3, 9990000, 999999, 'Explore the capabilities of the OPPO Reno10 5G. With a striking blue color and a price of 9990000, it delivers impressive performance and a sleek design.', '$2b$10$R4nph2rY654If4M1Nex6/eBtdE3UHkNB6zUq9oLgq8VEbeOoLWEGi', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(14, 'OPPO Reno10 Pro+ 5G', 'oppo-reno10-pro-plus-thumbnew-600x600.jpg', 3, 19990000, 999999, 'Take your mobile photography to the next level with the OPPO Reno10 Pro+ 5G. Priced at 19990000, it features advanced camera technology and a stylish design.', '$2b$10$9cCejYmSqW07WvrUVFfC.ekg1BRvhM7NelAk82a1Fadrk.lqFUmRq', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(15, 'Samsung Galaxy S23 FE 5G', 'samsung-galaxy-s23-fe-xanh-thumb-600x600.jpg', 1, 14890000, 999999, 'Immerse yourself in the Samsung Galaxy S23 FE 5G. With a refreshing green color and a price of 14890000, it offers 5G connectivity and a stunning display.', '$2b$10$TYeGJ20ewab7ybvjnU.d7umqCs9QtP9iCN8FfQbo/e2gpv0TjqvtK', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(16, 'OPPO Reno10 Pro 5G', 'oppo-reno10-pro-grey-thumbnew-600x600.jpg', 3, 13990000, 999999, 'Experience the power of the OPPO Reno10 Pro 5G. With a sophisticated grey design and a price tag of 13990000, it is a stylish choice for tech enthusiasts.', '$2b$10$enwdWRwZCzdBc7DsqjKImeyfS5dftm1XmaByLjiknF1C0SLaZQ/UK', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(17, 'OPPO A57 128GB', 'oppo-a57-xanh-thumb-1-600x600.jpeg', 3, 4990000, 999999, 'Discover the OPPO A57 128GB, a budget-friendly smartphone with a vibrant green color. Priced at 4990000, it offers ample storage and reliable performance.', '$2b$10$pmOwoCAYaZzWmgPoMGLC8eosv0w.O.tkVdIT4BlTaH17nj1h1kruK', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(18, 'vivo V25 series', 'vivo-v25-5g-vang-thumb-1-1-600x600.jpg', 5, 10490000, 999999, 'Get ready for the future with the vivo V25 series. With 5G capabilities and a dazzling gold design, it is priced at 10490000, providing a perfect blend of style and functionality.', '$2b$10$bv9sVvXVkyIbnSb45d/3ReIUNNRJ0Az//wZXiNOnAA2wrbX/PobFy', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(19, 'Xiaomi 13T Pro 5G', 'xiaomi-13t-pro-xanh-thumb-600x600.jpg', 4, 15990000, 999999, 'Unleash the power of the Xiaomi 13T Pro 5G. With a captivating green color and a price of 15990000, it offers high-end features and exceptional performance.', '$2b$10$CrAWoslQViEto40xYRsxeupyIlOdO.IhaUzK9Y4x3353uwmSVxl3O', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(20, 'Xiaomi Redmi Note 12 4G', 'xiaomi-redmi-note-12-vang-1-thumb-momo-600x600.jpg', 4, 6490000, 999999, 'Meet the Xiaomi Redmi Note 12 4G, a budget-friendly device with a stylish gold design. Priced at 6490000, it is perfect for users seeking reliable performance.', '$2b$10$Nd.oaTo9lU6e4DwXTuNeCeh8SanuwmOK.lB6klUtrn5hqCOPSsT8m', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(21, 'Xiaomi Redmi Note 12 Pro', 'xiaomi-redmi-12-pro-4g-xanh-thumb-600x600.jpg', 4, 7190000, 999999, 'Immerse yourself in the Xiaomi Redmi Note 12 Pro. With a vibrant green color and a price tag of 7190000, it offers pro-level features and a stylish design for the modern smartphone user.', '$2b$10$yhv/WTQtSpXXrpfyoPeIC.kyEugcWfuBSKxW1RpPyBKZn4RM8SYpW', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(22, 'Xiaomi Redmi 12C', 'xiaomi-redmi-12c-grey-thumb-600x600.jpg', 4, 3590000, 999999, 'Meet the Xiaomi Redmi 12C, a budget-friendly device with a sleek grey design. Priced at 3590000, it provides reliable performance and a minimalist look for users on the go.', '$2b$10$T1QTW.Iu4bS3ruEqHXTKPOwhiSMRNyDZTkRHG7e9BGTDnP3v/tkfy', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(23, 'Xiaomi 13 Lite 5G', 'xiaomi-13-lite-den-thumb-600x600.jpg', 4, 11490000, 999999, 'Discover the capabilities of the Xiaomi 13 Lite 5G. With a captivating denim design and a price of 11490000, it offers 5G connectivity and a balance of style and functionality.', '$2b$10$DP9ZiCMLV30NNTJcd0yodOklXjvurpiVtrmyz4t6dZMM3MXYaentK', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(24, 'Xiaomi 12 5G', 'Xiaomi-12-xam-thumb-mau-600x600.jpg', 4, 13990000, 999999, 'Experience the future with the Xiaomi 12 5G. With a sophisticated dark grey design and a price tag of 13990000, it offers cutting-edge features for tech enthusiasts.', '$2b$10$EYz9v.qerl36/gqel5lcXOddsS42KWwyia58w0YF9hQ05KsbUJH7m', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(25, 'realme C53', 'realme-c53-gold-thumb-1-600x600.jpg', 6, 4290000, 999999, 'Explore the features of the realme C53, a device with a stylish gold finish. Priced at 4290000, it delivers a blend of performance and affordability for budget-conscious users.', '$2b$10$fQKoYZZxFyE83xpZl0WqSOGBzS9OLcMN7/mFzBYFTO7N0z4EAKcxu', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(26, 'realme C30s (3GB/64GB)', 'realme-c30s-3gb-64gb-blue-thumb-600x600.jpg', 6, 2690000, 999999, 'Introducing the realme C30s (3GB/64GB). With a vibrant blue design and a price tag of 2690000, it offers ample storage and performance for everyday use.', '$2b$10$NwNfFNAeBaHcUmQHQHRcNOQHZE/MgFGyGavYMWHkOzLahZhTMXkeK', '2023-12-15 08:21:47', '2023-12-20 07:59:58'),
(27, 'realme C55', 'realme-c35-vang-thumb-600x600.jpg', 6, 4990000, 999999, 'Step up your mobile experience with the realme C55. With a sleek gold design and a price of 4990000, it is a perfect choice for users seeking style and functionality.', '$2b$10$6IIHhtKFsvs.e7l11gt2w.SQQJEz6iX5Ko8wFSfy03C.BOwcQJibu', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(28, 'realme 10', 'realme-10-thumb-1-600x600.jpg', 6, 6390000, 999999, 'Meet the realme 10, a device that combines style and performance. With a distinctive design and a price tag of 6390000, it is perfect for users who demand more from their smartphones.', '$2b$10$p2ykap1JK2iTdWhXGdA9QOdkeZWkaYE7Cn9F27fYLPs08UCKJxO8a', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(29, 'realme C51', 'realme-c51-xanh-thumbnail-600x600.jpg', 6, 3690000, 999999, 'Discover the realme C51, a budget-friendly device with a stylish green finish. Priced at 3690000, it offers a balance of performance and affordability for users on a budget.', '$2b$10$ZmitI5.hyqAbfcz.rKj.wuuZjnkRxzC40x/.zeVkV3l7llyIEiDcG', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(30, 'Samsung Galaxy Z Fold5 5G', 'samsung-galaxy-z-fold5- kem-600x600.jpg', 1, 40990000, 999999, 'Experience the future of smartphones with the Samsung Galaxy Z Fold5 5G. Priced at 40990000, it unfolds new possibilities and redefines the way you interact with your device.', '$2b$10$dvnLo/mQ8iATtD/gPAt5ae2Ks1BTttgy.0Y9wYurnRsQLO.JXgaE6', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(31, 'iPhone 14 Pro', 'iphone-14-pro-vang-thumb-600x600.jpg', 2, 27990000, 999999, 'Explore the features of the iPhone 14 Pro, a device with a stylish gold finish. Priced at 27990000, it offers a perfect blend of performance and elegance for the modern user.', '$2b$10$03A6Vo8JMBwT1cbPtF3AEuwe.Jta1OvDB6U2lqY7QUMQFKFukVDoK', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(32, 'Samsung Galaxy S23 Ultra 5G', 'samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg', 1, 31990000, 999999, 'Experience the ultimate with the Samsung Galaxy S23 Ultra 5G. With a captivating green color and a price tag of 31990000, it redefines what a smartphone can achieve.', '$2b$10$OI1VfKy8SRJgQWml3ngEC.LM37YhuEF4AAY45K7H4XutNU0Aa/Nv2', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(33, 'Samsung Galaxy Z Fold4 5G', 'samsung-galaxy-z-fold4-kem-256gb-600x600.jpg', 1, 40990000, 999999, 'Unfold new possibilities with the Samsung Galaxy Z Fold4 5G. Priced at 40990000, it combines a stunning design with powerful features for a truly immersive experience.', '$2b$10$d32BYhluexCSuMNFRnWzqeW7O0UEv5y1CmkN3FkgZDjB6S4YocYJG', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(34, 'iPhone 14 Plus', 'iPhone-14-plus-thumb-xanh-1-600x600.jpg', 2, 24990000, 999999, 'Get more with the iPhone 14 Plus! With a refreshing green color and a price of 24990000, it offers advanced features and a stylish design for the modern user.', '$2b$10$o6UVQ6TOST5L1G6hp5Uj0OEtFMS8k3PWc1e61vMVS7ByE9W6g3Jou', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(35, 'Samsung Galaxy Z Flip5 5G', 'samsung-galaxy-z-flip5-xanh-mint-thumb-600x600.jpg', 1, 25990000, 999999, 'Flip into the future with the Samsung Galaxy Z Flip5 5G. With a mint green color and a price tag of 25990000, it is a stylish and compact device for on-the-go users.', '$2b$10$udArdsajFIGntbxcR.F5hurYAloZ4WJGIWwszoPqbmlO6KnxUAx8C', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(36, 'Samsung Galaxy S23+ 5G', 'samsung-galaxy-s23-plus-3-600x600.jpg', 1, 26990000, 999999, 'Step up to the Samsung Galaxy S23+ 5G. With a sleek design and a price of 26990000, it offers a perfect balance of style and performance for tech enthusiasts.', '$2b$10$bl5i/51VCquP0HqcDZuAvOR8ljwK7ZOr7dm8XKaM8INHxpuaaQJ0m', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(37, 'iPhone 14', 'iPhone-14-thumb-tim-1-600x600.jpg', 2, 21990000, 999999, 'Discover the iPhone 14, a device that combines elegance and performance. With a vibrant purple color and a price tag of 21990000, it is perfect for users who demand the best.', '$2b$10$IxmjfCP/6e.zT70yGkS3n.i/BpDOmwwJuKKxikDmASfKBYGCuylem', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(38, 'OPPO Find N2 Flip 5G', 'oppo-find-n2-flip-purple-thumb-1-600x600-1-600x600.jpg', 3, 19990000, 999999, 'Flip into innovation with the OPPO Find N2 Flip 5G. With a stylish purple design and a price of 19990000, it offers a unique flip experience and advanced features.', '$2b$10$HpxnyNdDSa8Ttg0k600vWeUknJaEV0gxZKsAu4r2DlSKs4GRzQcdK', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(39, 'Samsung Galaxy S22 Ultra 5G 128GB', 'Galaxy-S22-Ultra-Burgundy-600x600.jpg', 1, 30990000, 999999, 'Experience the Samsung Galaxy S22 Ultra 5G 128GB. With a luxurious burgundy color and a price tag of 30990000, it delivers top-notch features and style for the discerning user.', '$2b$10$zE6wKut3NT8/xgrne6aEHOhAQOX7Zuhm2JgdTLcTFYNX1kD81aQh.', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(40, 'Samsung Galaxy S23 5G 128GB', 'samsung-galaxy-s23-600x600.jpg', 1, 22990000, 999999, 'Discover the Samsung Galaxy S23 5G 128GB, a device that redefines your smartphone experience. Priced at 22990000, it offers a perfect balance of performance and affordability.', '$2b$10$0CSZUo2tzWLT6eL9CWKBQOtiWQYZ.16rpCgU.8CiXYcCjBy1A2BKq', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(41, 'iPhone 13', 'iphone-13-pink-2-600x600.jpg', 2, 18990000, 999999, 'Experience the iPhone 13, a device that stands out with its elegant pink color. Priced at 18990000, it offers a perfect blend of style and performance for the modern user.', '$2b$10$ERZantF2ZYR7TiHrCcPp1.7EgY4nnbtpI01dwHihrOEq2WCtojnq6', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(42, 'Samsung Galaxy Z Flip4 5G', 'samsung-galaxy-z-flip4-5g-128gb-thumb-tim-600x600.jpg', 1, 23990000, 999999, 'Flip into the future with the Samsung Galaxy Z Flip4 5G. With a stylish purple design and a price tag of 23990000, it combines compact form factor with advanced features.', '$2b$10$sE3ns6eiDx8s8gx4KMTNKu87hPTBToXE8Fngir8ZE6RwZcbUuukIK', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(43, 'realme 11 Pro+ 5G', 'realme-11-pro-plus-5g-thumb-600x600.jpeg', 6, 14990000, 999999, 'Unleash the power of the realme 11 Pro+ 5G. With a sleek design and a price of 14990000, it offers top-notch features and performance for users who demand the best.', '$2b$10$b6/5EzT2eTp.DsFtukcf6uCwFV0YgGwAPGy/i39RvZDYHwE1V/UJW', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(44, 'iPhone 12', 'iphone-12-tim-1-600x600.jpg', 2, 17990000, 999999, 'Discover the iPhone 12, a device that redefines elegance and performance. With a vibrant purple color and a price tag of 17990000, it is perfect for users with a taste for luxury.', '$2b$10$yT.pdE4JtppOwUKsyHb6x.QGQFKZGyT58dCXe3a0bZDruH6xMgu46', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(45, 'OPPO Reno8 Pro 5G', 'oppo-reno8-pro-thumb-den-600x600.jpg', 3, 18990000, 999999, 'Explore the OPPO Reno8 Pro 5G, a device that combines style and innovation. Priced at 18990000, it offers advanced camera features and a sleek design for the modern user.', '$2b$10$kfe80QDCgsXp96SVEdynBeNcmqKaTXVUFwQ5U25LXbFK40WapJB8.', '2023-12-15 08:21:47', '2023-12-20 07:59:59'),
(46, 'vivo V29 5G', 'vivo-v29-tim-thumb-600x600.jpg', 5, 12990000, 999999, 'Step into the future with the vivo V29 5G. With a stylish purple design and a price tag of 12990000, it offers 5G connectivity and a perfect blend of style and performance.', '$2b$10$hA1yUkGvd57ndIv5v98fJ.vbxHKFN1MGi7SXrf7n4sYmj01IJDNd.', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(47, 'realme 11 Pro 5G', 'realme-11-pro-5g-green-thumb-1-600x600.jpg', 6, 11990000, 999999, 'Discover the realme 11 Pro 5G, a device that brings together style and performance. With a vibrant green color and a price of 11990000, it is perfect for users on the go.', '$2b$10$sxgKG6Y20t8XdSHb7lNrZOmZpF73HjjQC55Uw6IE.hyGn0fH7ipUC', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(48, 'iPhone 11', 'iphone-11-trang-600x600.jpg', 2, 11990000, 999999, 'Experience the iPhone 11, a device that combines simplicity and power. With a classic white design and a price tag of 11990000, it offers a reliable and stylish mobile experience.', '$2b$10$cbZ37qfuVMrCf.0gQB84xexphHWy.aiY/KLGmCrsbvm5QBZntelpG', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(49, 'Samsung Galaxy M54 5G', 'samsung-galaxy-m54-bac-thumb-600x600.jpg', 1, 11990000, 999999, 'Explore the Samsung Galaxy M54 5G, a device that offers a perfect balance of style and functionality. Priced at 11990000, it is a budget-friendly choice for tech-savvy users.', '$2b$10$iBiVC9YM31HZHcRaDH/nO.App.jpG7iCeHi9XQ43aZWXwEM9bZ.hy', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(50, 'Samsung Galaxy S21 FE 5G', 'Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg', 1, 12990000, 999999, 'Step up to the Samsung Galaxy S21 FE 5G. With a dazzling gold design and a price tag of 12990000, it offers advanced features and a stylish look for the modern user.', '$2b$10$4Gy/M.AyHjcIaGIEL8crG.U3JL0pHn5PrqSrCYYfS51X9.0srvLd6', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(51, 'Samsung Galaxy A54 5G', 'samsung-galaxy-a54-thumb-tim-600x600.jpg', 1, 10490000, 999999, 'Discover the Samsung Galaxy A54 5G, a device that combines affordability with top-notch features. Priced at 10490000, it is a perfect choice for users who seek a reliable and budget-friendly smartphone.', '$2b$10$NNgp8HvBEsE/YydpTGDsTOXRCB/50Se4PRQ9C0xHBpoS2SIN4EGT.', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(52, 'vivo V25 Pro 5G', 'vivo-v25-pro-5g-xanh-thumb-1-600x600.jpg', 5, 13990000, 999999, 'Experience the power of the vivo V25 Pro 5G. With a stylish green design and a price tag of 13990000, it offers advanced features and a sleek look for the modern user.', '$2b$10$RrWdZwILoLtz/J9vXzvmX.E6Tj1c1v5gXsu54U9UcMgSaUXGxAFIC', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(53, 'OPPO Reno8 T 5G', 'oppo-reno8t-den1-thumb-600x600.jpg', 3, 10990000, 999999, 'Step into the fast lane with the OPPO Reno8 T 5G. With a classic black design and a price of 10990000, it offers 5G connectivity and a perfect blend of style and performance.', '$2b$10$5vFVyX2/w7X.RPm5GoszBuQC1/OYLcAPTrW2agB4AzMNTXnE7ID9u', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(54, 'vivo V29e 5G', 'vivo-v29e-tim-thumb-600x600.jpg', 5, 8990000, 999999, 'Explore the vivo V29e 5G, a device that combines affordability with stylish design. Priced at 8990000, it is a great choice for users who value both performance and budget.', '$2b$10$r32rzh1o59J/Foe/FdGIfOT4TJI7FWF5mR5YTUFtTQTM.yASh.ZAi', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(55, 'Xiaomi Redmi Note 12 Pro 5G', 'xiaomi-redmi-note-12-pro-5g-momo-1-600x600.jpg', 4, 9490000, 999999, 'Unleash the potential of the Xiaomi Redmi Note 12 Pro 5G. With a trendy design and a price tag of 9490000, it offers top-notch features and performance for tech enthusiasts.', '$2b$10$8c/5l16sqLxmuM.bwBMnwus4.iODgfyyNMNf1vxhmaOdjNjNtv232', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(56, 'Xiaomi Redmi Note 12 Pro 5G Tím', 'xiaomi-redmi-note-12-pro-5g-tim-thumb-1-600x600.jpg', 4, 9490000, 999999, 'Stand out with the Xiaomi Redmi Note 12 Pro 5G in purple. Priced at 9490000, it offers a perfect blend of style and performance for users who demand the best.', '$2b$10$ohYosOvpNPqtWvBjv/X90OWmMw7qxgr8zSv1vB2luAzDoSXxDRto2', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(57, 'OPPO A98 5G', 'oppo-a98-5g-xanh-thumb-1-2-600x600.jpg', 3, 8990000, 999999, 'Discover the OPPO A98 5G, a device that brings together style and innovation. With a vibrant green color and a price of 8990000, it is perfect for users who seek a reliable and stylish smartphone.', '$2b$10$8.igN0rRQTxsEAPsmirttuoX9exyvUcoNt3lsKNowpb.CODRaV9mC', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(58, 'vivo V27e', 'vivo-v27e-tim-thumb-600x600.jpg', 5, 8990000, 999999, 'Step into the future with the vivo V27e. With a stylish purple design and a price tag of 8990000, it offers advanced features and a sleek look for the modern user.', '$2b$10$ydQnjhNnvgdxfcRkS7zl6OtCBQhH91wLTx9XB0Ow10QwmLyU7/.LO', '2023-12-15 08:21:47', '2023-12-20 08:00:00'),
(59, 'Samsung Galaxy A34 5G', 'samsung-galaxy-a34-thumb-den-600x600.jpg', 1, 8490000, 999999, 'Explore the Samsung Galaxy A34 5G, a device that offers a perfect balance of style and functionality. Priced at 8490000, it is a budget-friendly choice for tech-savvy users.', '$2b$10$u4y6rdrobvnUS5qA69u/v.KrjjLX0pPujtWyCHmclAYM2tPgJajOu', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(60, 'Samsung Galaxy M34 5G', 'samsung-galaxy-m34-xanh-ngoc-thumb-600x600.jpg', 1, 7990000, 999999, 'Step up to the Samsung Galaxy M34 5G. With a cool green design and a price tag of 7990000, it offers advanced features and a stylish look for the modern user.', '$2b$10$a9ULGuS1X1A51n2C3xEoKeCwaGH8XknmawUH9DeLF1JSZOs02EWzu', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(61, 'OPPO Reno8 T', 'oppo-reno8t-4g-den1-thumb-600x600.jpg', 3, 8490000, 999999, 'Introducing the OPPO Reno8 T, a 4G device in classic black. Priced at 8490000, it offers a perfect blend of style and performance for users who seek a reliable smartphone.', '$2b$10$S2DZb5LvBYWraRMck42pueZmbHY0./7XdZwZLN9d5u1fPvL6qMBpS', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(62, 'realme 11', 'realme-11-thumb-600x600.jpg', 6, 7390000, 999999, 'Experience the realme 11, a budget-friendly device with a sleek design. Priced at 7390000, it offers essential features for users who demand affordability without compromising performance.', '$2b$10$MJ3Hud3tZOQOJgd1JnXZX.06FNCDULpVYrEFXibb4/J8AU.vmFF9m', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(63, 'OPPO A78', 'oppo-a78-xanh-thumb-1-600x600.jpg', 3, 6990000, 999999, 'Discover the OPPO A78, a stylish smartphone in vibrant green. Priced at 6990000, it offers a perfect balance of style and functionality for users who seek both aesthetics and performance.', '$2b$10$d2G7TaAndMP.W3a.2Wvcq.pG2EjyHmt7F1Y5RAsbZpjqYC2O6sexa', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(64, 'Samsung Galaxy A24', 'samsung-galaxy-a24-black-thumb-600x600.jpg', 1, 6490000, 999999, 'Step up to the Samsung Galaxy A24, a sleek black device priced at 6490000. It combines affordability with essential features, making it an ideal choice for budget-conscious users.', '$2b$10$DU3cnlIgbt95lz9AOf5B3OUtlNEsgG6NUIyn6m6YN0zWcZMOyxkTK', '2023-12-15 08:21:48', '2023-12-20 08:00:00'),
(65, 'vivo Y36', 'vivo-y36-xanh-thumbnew-600x600.jpg', 5, 6290000, 999999, 'Unleash the potential of the vivo Y36, a stylish device in blue. Priced at 6290000, it offers essential features and a sleek look for users who seek a reliable smartphone with a touch of style.', '$2b$10$NUBanUld.Oe2KroMeFysn.yhfZkYAgrwdn2NFRmy2GAEQAUDxXWC2', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(66, 'Xiaomi Redmi Note 12S', 'xiaomi-redmi-note12s-den-thumb-600x600.jpg', 4, 6690000, 999999, 'Explore the Xiaomi Redmi Note 12S, a powerful device in classic black. Priced at 6690000, it offers top-notch features and performance for tech enthusiasts who demand the best.', '$2b$10$akWLn7JcYYdYQSqoaTfFsutshrNzOykZouU/5qi9oWLc63ZmxBzba', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(67, 'OPPO A58', 'oppo-a58-4g-green-thumb-600x600.jpg', 3, 5990000, 999999, 'Step into the future with the OPPO A58, a 4G device in vibrant green. Priced at 5990000, it offers essential features and a stylish look for users who seek a reliable and budget-friendly smartphone.', '$2b$10$g6IVJKG2zZc1qhJqS3a4q.JbG/H2dPqavnJoYqQrMP7Oe6ItC/n7K', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(68, 'OPPO A77s', 'oppo-a77s-xanh-thumb-1-600x600.jpg', 3, 6290000, 999999, 'Discover the OPPO A77s, a stylish device in vibrant blue. Priced at 6290000, it offers a perfect blend of style and performance for users who demand a reliable smartphone with a touch of elegance.', '$2b$10$YTMoR0eqrgH0IPUrppKpF.lvh9gy1ijEaR.XyXn8tZ5GCvQHMVlpu', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(69, 'vivo Y35', 'vivo-y35-thumb-1-600x600.jpg', 5, 6990000, 999999, 'Unleash the potential of the vivo Y35, a budget-friendly device with a sleek design. Priced at 6990000, it offers essential features and a stylish look for users who seek a reliable smartphone without breaking the bank.', '$2b$10$YOzuM/QZzjL7FAXQoVj2iOXV7VbIF1KQUToJP.tWllczJCEYDBCom', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(70, 'Samsung Galaxy A14 5G', 'samsung-galaxy-a14-5g-thumb-nau-600x600.jpg', 1, 5190000, 999999, 'Step into the future with the Samsung Galaxy A14 5G, a device in earthy brown. Priced at 5190000, it offers essential features and a stylish look for users who seek a reliable and budget-friendly smartphone.', '$2b$10$bjvPkKL1OEDtAO.YiRjRlu3vSBx70VHYYrufArFxGHIBMtHQt6QBy', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(71, 'Samsung Galaxy A14 4G', 'samsung-galaxy-a14-tlte-thumb-den-600x600.jpg', 1, 4990000, 999999, 'Experience the Samsung Galaxy A14 4G, a budget-friendly device in classic black. Priced at 4990000, it offers essential features for users who seek affordability without compromising performance.', '$2b$10$IYEXhBDoQrTEMhQLW/iQLuE5OJYci1V6awbLDAWuZQ2oQLi61ZF.a', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(72, 'OPPO A38', 'oppo-a38-gold-thumb-600x600.jpg', 3, 4490000, 999999, 'Introducing the OPPO A38, a stylish smartphone in elegant gold. Priced at 4490000, it combines a sleek design with essential features, making it an ideal choice for users who value both style and functionality.', '$2b$10$4ri0Osx3/Wmqdjxd283hfu1IG/5IhD8ipXqvlZskeDirfi6tduSoi', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(73, 'Samsung Galaxy A05s', 'samsung-galaxy-a05s-sliver-thumb-600x600.jpeg', 1, 4490000, 999999, 'Step up to the Samsung Galaxy A05s, a sleek device in metallic silver. Priced at 4490000, it combines affordability with essential features, making it an ideal choice for budget-conscious users.', '$2b$10$5uqZAOLGS2MTx1zJ4A2rXOnbkA2YEK5vHd3OUtegN2WpLJ64c8U6a', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(74, 'vivo Y22s', 'vivo-y22s-vang-thumb-1-2-600x600.jpeg', 5, 5290000, 999999, 'Unleash the potential of the vivo Y22s, a stylish device in vibrant gold. Priced at 5290000, it offers essential features and a sleek look for users who seek a reliable smartphone with a touch of style.', '$2b$10$zNRXmIObQIV2fV0JbNzNRe2Mk6/LtTmUGZafs/A2d93WdbLcKoa/.', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(75, 'OPPO A18', 'oppo-a18-xanh-thumb-1-2-3-600x600.jpg', 3, 3690000, 999999, 'Discover the OPPO A18, a stylish device in vibrant green. Priced at 3690000, it offers a perfect balance of style and functionality for users who seek both aesthetics and performance.', '$2b$10$7I/PJuU/gwhr3p5MFzi1ReODWIaMKlM4/4Rx9.su8Td/ZCUT.RiWW', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(76, 'Samsung Galaxy A04s', 'samsung-galaxy-a04s-thumb-den-600x600.jpg', 1, 3990000, 999999, 'Explore the Samsung Galaxy A04s, a budget-friendly device in classic black. Priced at 3990000, it offers essential features and a sleek look for users who seek a reliable smartphone without breaking the bank.', '$2b$10$Wy4CRKYLUJwScx0hTO6HVeNAgUilpsJGRzPq0oNvkAcTchAYbn5Ee', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(77, 'OPPO A17', 'oppo-a17-den-thumb-600x600.jpg', 3, 3990000, 999999, 'Step into the future with the OPPO A17, a 4G device in classic black. Priced at 3990000, it offers essential features and a stylish look for users who seek a reliable and budget-friendly smartphone.', '$2b$10$bgZUahRRcda3zj.PH42kQOCkURt8JJq41nzgJfl1Tgw2nMUIa6I.a', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(78, 'vivo Y16 64GB', 'vivo-y16-vang-thumb-600x600.jpg', 5, 3990000, 999999, 'Unleash the potential of the vivo Y16 64GB, a stylish device in vibrant gold. Priced at 3990000, it offers essential features and a sleek look for users who seek a reliable smartphone with a touch of elegance.', '$2b$10$Lrgr.jpE1T0UVSGA0NATWe/.DKKflu5.ZqlcC3sgmhTTbQxnO5zci', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(79, 'OPPO A17K', 'oppo-a17k-vang-thumb-Ä-600x600.jpg', 3, 3290000, 999999, 'Discover the OPPO A17K, a stylish device in vibrant gold. Priced at 3290000, it offers a perfect blend of style and performance for users who demand a reliable smartphone with a touch of elegance.', '$2b$10$Lf8AghmaQhKhwhUZlgPt6u2MKHoz9f7EnExw8TPmsULdNr/F2.BzG', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(80, 'vivo Y02T', 'vivo-y02t-xanh-tim-thumb-600x600.jpg', 5, 2990000, 999999, 'Step into the future with the vivo Y02T, a stylish device in a unique combination of green and purple. Priced at 2990000, it offers essential features and a stylish look for users who seek a reliable smartphone without breaking the bank.', '$2b$10$7CQL4gDDoV6WgZLz3OY28.PjS1NVJFgtkyBIDxiDSqF9gxk65lfna', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(81, 'Samsung Galaxy A04', 'samsung-galaxy-a04-thumb-xanh-600x600.jpg', 1, 2990000, 999999, 'Introducing the Samsung Galaxy A04, a budget-friendly device in refreshing green. Priced at 2990000, it offers essential features for users who seek affordability without compromising performance.', '$2b$10$7OHNVyr5bp3WNXp.7CAUhe3SHP2Lf7t2dCjWD664ZzjKTB167eYum', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(82, 'vivo Y02s 64GB', 'vivo-y02s-thumb-xanh-600x600.jpg', 5, 3290000, 999999, 'Unleash the potential of the vivo Y02s 64GB, a stylish device in vibrant green. Priced at 3290000, it offers essential features and a sleek look for users who seek a reliable smartphone with a touch of style.', '$2b$10$jTS5CMcju.8hKO.m5ZBnweH1iQGdDDClJ5yzjB0iouthTsmYPfhxe', '2023-12-15 08:21:48', '2023-12-20 08:00:01'),
(83, 'vivo Y01', 'vivi-y01-Äen-thumb-600x600.jpg', 5, 2390000, 999999, 'Experience the vivo Y01, a budget-friendly device in classic black. Priced at 2390000, it offers essential features for users who seek affordability without compromising performance.', '$2b$10$yggOvTHH2PFCdiMdstcL/ecb5vkUqiuEsAJbO9po.ZGBoG8IzWlbK', '2023-12-15 08:21:48', '2023-12-20 08:00:02'),
(84, 'Xiaomi Redmi A2 series', 'xiaomi-redmi-a2-xanh-duong-thumbnail-600x600.jpg', 4, 2190000, 999999, 'Discover the Xiaomi Redmi A2 series, a stylish device in classic blue. Priced at 2190000, it offers essential features and a sleek look for users who seek a reliable smartphone with a touch of style.', '$2b$10$UehbaFcX/pd8IFC4TucbgunrjZ.QWQx5yDr1lW8VHGsfFYf9RqoDi', '2023-12-15 08:21:48', '2023-12-20 08:00:02');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

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
