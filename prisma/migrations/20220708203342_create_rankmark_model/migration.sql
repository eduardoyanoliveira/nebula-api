-- CreateTable
CREATE TABLE "tbl_rankmarks" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "points" INTEGER NOT NULL,
    "color" VARCHAR(12) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_rankmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rankmarks_name_key" ON "tbl_rankmarks"("name");
