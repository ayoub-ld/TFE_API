import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate()).post;

export const getAllPosts = () => {
  return prisma.findMany();
};

export const getUserPosts = (id_user: string) => {
  return prisma.findMany({
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
    where: { author_id: id_user },
  });
};

export const getPostByKeyword = async (keyword: string) => {
  return await prisma.findMany({
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
    where: {
      OR: [{ content: { contains: keyword, mode: "insensitive" } }],
    },
    include: {
      author: {
        select: {
          id_user: true,
          username: true,
          profile_picture: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};
