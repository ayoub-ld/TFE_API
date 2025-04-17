import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient().$extends(withAccelerate());

/**
 * Creates a like for a post
 * @param userId ID of the user liking the post
 * @param postId ID of the post being liked
 * @returns The created like record
 */
export const createLike = async (userId: string, postId: string) => {
  // First check if this like already exists to prevent duplicates
  const existingLike = await prisma.likes.findFirst({
    where: {
      user_id: userId,
      post_id: postId
    }
  });

  if (existingLike) {
    return existingLike; // Already liked
  }

  // Create the like
  return await prisma.likes.create({
    data: {
      id_like: uuidv4(),
      user_id: userId,
      post_id: postId,
      created_at: new Date()
    }
  });
};

/**
 * Removes a like from a post
 * @param userId ID of the user unliking the post
 * @param postId ID of the post being unliked
 * @returns The deleted like record or null if not found
 */
export const removeLike = async (userId: string, postId: string) => {
  // Find the existing like
  const existingLike = await prisma.likes.findFirst({
    where: {
      user_id: userId,
      post_id: postId
    }
  });

  if (!existingLike) {
    return null; // Nothing to unlike
  }

  // Delete the like
  return await prisma.likes.delete({
    where: {
      id_like: existingLike.id_like
    }
  });
};

/**
 * Checks if a user has liked a post
 * @param userId ID of the user
 * @param postId ID of the post
 * @returns true if the user has liked the post, false otherwise
 */
export const hasUserLikedPost = async (userId: string, postId: string) => {
  const like = await prisma.likes.findFirst({
    where: {
      user_id: userId,
      post_id: postId
    }
  });

  return !!like;
};

/**
 * Gets the number of likes for a post
 * @param postId ID of the post
 * @returns The number of likes
 */
export const getLikesCountForPost = async (postId: string) => {
  return await prisma.likes.count({
    where: {
      post_id: postId
    }
  });
};

/**
 * Gets all likes for a post
 * @param postId ID of the post
 * @returns Array of likes
 */
export const getLikesForPost = async (postId: string) => {
  return await prisma.likes.findMany({
    where: {
      post_id: postId
    },
    include: {
      post: true
    }
  });
};
