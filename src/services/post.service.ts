import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient().$extends(withAccelerate());
const postClient = prisma.post;
const likesClient = prisma.likes;

export const getAllPosts = (limit: number = 15) => {
  return postClient.findMany({
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    include: {
      author: {
        select: {
          username: true,
          profile_picture: true,
        },
      },
      likes: true,
    },
  });
};

export const getUserPosts = (id_user: string) => {
  return postClient.findMany({
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
    where: { author_id: id_user },
  });
};

export const getPostByKeyword = async (keyword: string) => {
  return await postClient.findMany({
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

export const getPostsByUserId = async (userId: string) => {
  return postClient.findMany({
    where: { author_id: userId },
    include: {
      author: true,
      likes: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const createPost = (content: string, author_id: string) => {
  return postClient.create({
    data: {
      id_post: uuidv4(), // Add explicit UUID generation
      content,
      author_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    include: {
      author: {
        select: {
          username: true,
          profile_picture: true
        }
      }
    }
  });
};
