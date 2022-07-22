-- CreateTable
CREATE TABLE "tbl_questions" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(70) NOT NULL,
    "text" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,

    CONSTRAINT "tbl_questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_questions" ADD CONSTRAINT "tbl_questions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_questions" ADD CONSTRAINT "tbl_questions_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "tbl_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
