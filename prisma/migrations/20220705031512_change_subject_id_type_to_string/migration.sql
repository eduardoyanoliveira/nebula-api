/*
  Warnings:

  - The primary key for the `tbl_subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tbl_subjects" DROP CONSTRAINT "tbl_subjects_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tbl_subjects_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tbl_subjects_id_seq";
