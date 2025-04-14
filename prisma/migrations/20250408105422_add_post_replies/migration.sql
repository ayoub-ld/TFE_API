-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "parent_id" UUID;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Post"("id_post") ON DELETE SET NULL ON UPDATE CASCADE;
