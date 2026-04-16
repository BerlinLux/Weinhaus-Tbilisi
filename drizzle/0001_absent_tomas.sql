CREATE TABLE `blogArticles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(64) NOT NULL,
	`titleDE` varchar(255) NOT NULL,
	`titleEN` varchar(255) NOT NULL,
	`titleKA` varchar(255) NOT NULL,
	`contentDE` text,
	`contentEN` text,
	`contentKA` text,
	`excerptDE` text,
	`excerptEN` text,
	`excerptKA` text,
	`date` timestamp NOT NULL,
	`category` varchar(100),
	`image` text,
	`published` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogArticles_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogArticles_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(64) NOT NULL,
	`nameDE` varchar(255) NOT NULL,
	`nameEN` varchar(255) NOT NULL,
	`nameKA` varchar(255) NOT NULL,
	`descriptionDE` text,
	`descriptionEN` text,
	`descriptionKA` text,
	`date` timestamp NOT NULL,
	`price` int NOT NULL,
	`seats` int NOT NULL,
	`seatsBooked` int DEFAULT 0,
	`venueDE` varchar(255),
	`venueEN` varchar(255),
	`venueKA` varchar(255),
	`image` text,
	`category` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `events_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`email` varchar(320) NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100),
	`phone` varchar(20),
	`address` text NOT NULL,
	`city` varchar(100),
	`postalCode` varchar(20),
	`country` varchar(100) DEFAULT 'Germany',
	`total` int NOT NULL,
	`status` enum('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
	`items` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(64) NOT NULL,
	`category` enum('bottle','barrel','qvevri','voucher') NOT NULL,
	`nameDE` varchar(255) NOT NULL,
	`nameEN` varchar(255) NOT NULL,
	`nameKA` varchar(255) NOT NULL,
	`descriptionDE` text,
	`descriptionEN` text,
	`descriptionKA` text,
	`price` int NOT NULL,
	`region` varchar(100),
	`image` text,
	`featured` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;