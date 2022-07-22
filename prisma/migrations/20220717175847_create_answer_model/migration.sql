-- CreateTable
CREATE TABLE "tbl_answers" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "tbl_answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_answers" ADD CONSTRAINT "tbl_answers_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answers" ADD CONSTRAINT "tbl_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "tbl_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
