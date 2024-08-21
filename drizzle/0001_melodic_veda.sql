CREATE TABLE `messages` (
	`id` varchar(255) NOT NULL,
	`sid` varchar(255) NOT NULL,
	`role` varchar(32) NOT NULL,
	`content` longtext NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_sid_sites_id_fk` FOREIGN KEY (`sid`) REFERENCES `sites`(`id`) ON DELETE no action ON UPDATE no action;