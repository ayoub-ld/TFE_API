import { Request, Response } from "express";
import * as likeService from "../services/like.service";

const likeController = {
  /**
   * Add a like to a post
   */
  likePost: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const { userId } = req.body;

      if (!postId || !userId) {
        return res.status(400).json({ error: "Post ID and User ID are required" });
      }

      const like = await likeService.createLike(userId, postId);
      const likesCount = await likeService.getLikesCountForPost(postId);

      res.status(201).json({ 
        message: "Post liked successfully", 
        data: like,
        likes_count: likesCount
      });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ 
        error: "Error while liking post",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  },

  /**
   * Remove a like from a post
   */
  unlikePost: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const { userId } = req.body;

      if (!postId || !userId) {
        return res.status(400).json({ error: "Post ID and User ID are required" });
      }

      const result = await likeService.removeLike(userId, postId);
      
      if (!result) {
        return res.status(404).json({ error: "Like not found" });
      }

      const likesCount = await likeService.getLikesCountForPost(postId);

      res.status(200).json({ 
        message: "Post unliked successfully", 
        likes_count: likesCount
      });
    } catch (error) {
      console.error("Error unliking post:", error);
      res.status(500).json({ 
        error: "Error while unliking post",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  },

  /**
   * Get likes for a post
   */
  getPostLikes: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      
      if (!postId) {
        return res.status(400).json({ error: "Post ID is required" });
      }

      const likes = await likeService.getLikesForPost(postId);
      const likesCount = await likeService.getLikesCountForPost(postId);

      res.status(200).json({ 
        data: likes,
        likes_count: likesCount
      });
    } catch (error) {
      console.error("Error getting post likes:", error);
      res.status(500).json({ 
        error: "Error while getting post likes",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  },

  /**
   * Check if a user has liked a post
   */
  checkPostLike: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
      
      if (!postId || !userId) {
        return res.status(400).json({ error: "Post ID and User ID are required" });
      }

      const hasLiked = await likeService.hasUserLikedPost(userId, postId);

      res.status(200).json({ 
        hasLiked
      });
    } catch (error) {
      console.error("Error checking post like:", error);
      res.status(500).json({ 
        error: "Error while checking post like",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
};

export default likeController;
