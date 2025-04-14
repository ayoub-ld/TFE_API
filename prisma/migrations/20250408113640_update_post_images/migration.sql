/*
  Warnings:

  - You are about to drop the column `image_url` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_post_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image_url";

-- AlterTable
ALTER TABLE "PostImage" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "PostImage_post_id_idx" ON "PostImage"("post_id");

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;
