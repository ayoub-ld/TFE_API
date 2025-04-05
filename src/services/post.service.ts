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
