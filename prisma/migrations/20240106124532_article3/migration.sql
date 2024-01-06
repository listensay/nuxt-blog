-- DropIndex
DROP INDEX `Article_category_id_fkey` ON `Article`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `cover` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `keywords` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `summary` VARCHAR(191) NOT NULL DEFAULT '';
