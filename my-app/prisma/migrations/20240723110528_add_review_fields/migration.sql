/*
  Warnings:

  - Added the required column `careType` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationship` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerEmail` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Review` ADD COLUMN `activitiesRating` DOUBLE NULL,
    ADD COLUMN `approved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `careType` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `facilityRating` DOUBLE NULL,
    ADD COLUMN `foodRating` DOUBLE NULL,
    ADD COLUMN `relationship` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewerEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `staffRating` DOUBLE NULL,
    ADD COLUMN `valueRating` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
