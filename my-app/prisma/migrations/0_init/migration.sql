-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Author_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryListing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `CategoryListing_categoryId_fkey`(`categoryId`),
    UNIQUE INDEX `CategoryListing_listingId_categoryId_key`(`listingId`, `categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `state` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `gallery` JSON NOT NULL,
    `description` TEXT NULL,
    `rating` DOUBLE NULL,
    `website` VARCHAR(191) NULL,
    `operatingHours` TEXT NULL,
    `tags` JSON NOT NULL,
    `locationId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `type_of_service` JSON NOT NULL,
    `review_generated` TEXT NULL,
    `similar_places` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `data_id` VARCHAR(255) NULL,
    `google_reviews` JSON NULL,

    UNIQUE INDEX `Listing_slug_key`(`slug`),
    INDEX `Listing_authorId_fkey`(`authorId`),
    INDEX `Listing_locationId_fkey`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing_old` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `state` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `gallery` JSON NOT NULL,
    `description` TEXT NULL,
    `rating` DOUBLE NULL,
    `website` VARCHAR(191) NULL,
    `operatingHours` TEXT NULL,
    `tags` JSON NOT NULL,
    `locationId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `type_of_service` JSON NOT NULL,
    `review_generated` TEXT NULL,
    `similar_places` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',

    UNIQUE INDEX `Listing_slug_key`(`slug`),
    INDEX `Listing_authorId_fkey`(`authorId`),
    INDEX `Listing_locationId_fkey`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `address` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Newsletter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Newsletter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `listingId` INTEGER NOT NULL,

    INDEX `Review_listingId_fkey`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `careNeeded` VARCHAR(191) NULL,
    `relationToResident` VARCHAR(191) NULL,
    `moveInDate` DATETIME(3) NULL,
    `budget` VARCHAR(191) NULL,
    `listingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ServiceRequest_listingId_fkey`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

