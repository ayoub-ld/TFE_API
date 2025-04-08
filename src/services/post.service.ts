import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().post;

export const getAllPosts = () => {
  return prisma.findMany();
};

export const getUserPosts = (id_user: string) => {
  return prisma.findMany({
    where: { author_id: id_user },
  });
};

export const getPostByKeyword = async (keyword: string) => {
  try {
    return await prisma.findMany({
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
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};
