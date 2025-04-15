import {PrismaClient} from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient().$extends(withAccelerate());
const likesClient = prisma.likes;

export const likePost = async (id_post: string, userId: string) => {
  console.log('Like service - Creating like:', { id_post, userId, type: typeof userId });
  
  try {
    const result = await likesClient.create({
      data: {
        id_like: uuidv4(), // Make sure we're generating a UUID for the like ID
        post_id: id_post,
        user_id: userId
      }
    });
    console.log('Like created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in likePost service:', error);
    throw error;
  }
};

export const unlikePost = async (id_post: string, userId: string) => {
  console.log('Like service - Removing like:', { id_post, userId, type: typeof userId });
  
  try {
    const result = await likesClient.deleteMany({
      where: {
        post_id: id_post,
        user_id: userId
      }
    });
    console.log('Like removed successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in unlikePost service:', error);
    throw error;
  }
};
