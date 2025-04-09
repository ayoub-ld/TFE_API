-- AlterTable
ALTER TABLE "Hashtag" ALTER COLUMN "id_hashtag" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "id_like" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "id_post" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "PostImage" ALTER COLUMN "id_image" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_user" SET DEFAULT gen_random_uuid();
