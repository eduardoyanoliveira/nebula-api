-- CreateTable
CREATE TABLE "tbl_ranks" (
    "user_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "tbl_ranks_pkey" PRIMARY KEY ("user_id","subject_id")
);

-- AddForeignKey
ALTER TABLE "tbl_ranks" ADD CONSTRAINT "tbl_ranks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_ranks" ADD CONSTRAINT "tbl_ranks_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "tbl_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
