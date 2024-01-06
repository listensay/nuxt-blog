-- AlterTable
ALTER TABLE `Article` ADD COLUMN `category_id` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `cover` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `keywords` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `summary` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `create_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
