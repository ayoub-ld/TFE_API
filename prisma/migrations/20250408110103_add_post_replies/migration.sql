/*
  Warnings:

  - Added the required column `updated_at` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "is_reply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reply_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Post_parent_id_idx" ON "Post"("parent_id");

-- CreateIndex
CREATE INDEX "Post_created_at_idx" ON "Post"("created_at");
