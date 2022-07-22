/*
  Warnings:

  - You are about to drop the column `create_at` on the `tbl_subjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_subjects" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
