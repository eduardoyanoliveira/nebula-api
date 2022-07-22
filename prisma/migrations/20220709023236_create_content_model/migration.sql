-- CreateTable
CREATE TABLE "tbl_contents" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(80) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject_id" TEXT NOT NULL,

    CONSTRAINT "tbl_contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_contents" ADD CONSTRAINT "tbl_contents_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "tbl_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
