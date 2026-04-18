CREATE TABLE `stripeCustomers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripeCustomers_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripeCustomers_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `stripeCustomers_stripeCustomerId_unique` UNIQUE(`stripeCustomerId`)
);
--> statement-breakpoint
CREATE TABLE `stripePayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`userId` int NOT NULL,
	`stripePaymentIntentId` varchar(255) NOT NULL,
	`stripeCheckoutSessionId` varchar(255),
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'EUR',
	`status` enum('pending','succeeded','failed','canceled') DEFAULT 'pending',
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripePayments_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripePayments_stripePaymentIntentId_unique` UNIQUE(`stripePaymentIntentId`),
	CONSTRAINT `stripePayments_stripeCheckoutSessionId_unique` UNIQUE(`stripeCheckoutSessionId`)
);
--> statement-breakpoint
ALTER TABLE `stripeCustomers` ADD CONSTRAINT `stripeCustomers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stripePayments` ADD CONSTRAINT `stripePayments_orderId_orders_id_fk` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stripePayments` ADD CONSTRAINT `stripePayments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;