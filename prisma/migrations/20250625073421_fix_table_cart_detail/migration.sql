/*
  Warnings:

  - You are about to drop the column `sum` on the `cart_detail` table. All the data in the column will be lost.
  - Added the required column `price` to the `cart_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `cart_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_detail` DROP COLUMN `sum`,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;
