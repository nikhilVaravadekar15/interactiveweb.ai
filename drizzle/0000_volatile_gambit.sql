CREATE TABLE `sites` (
	`id` varchar(255) NOT NULL,
	`url` varchar(2048) NOT NULL,
	`collection_name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sites_id` PRIMARY KEY(`id`)
);
