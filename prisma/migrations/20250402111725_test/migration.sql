-- AddForeignKey
ALTER TABLE "Hashtag" ADD CONSTRAINT "Hashtag_id_hashtag_fkey" FOREIGN KEY ("id_hashtag") REFERENCES "Post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;
