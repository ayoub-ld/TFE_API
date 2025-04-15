import { Request, Response } from "express";
import * as postService from "../services/post.service";
import * as likeService from "../services/like.service";

const MAX_LIMIT = 100; // Define a maximum limit for posts to prevent excessive data retrieval

const postController = {
  //% Get all posts
  getAllPosts: async (req: Request, res: Response) => {
    try {
      let limit = req.query.limit ? parseInt(req.query.limit as string) : 15; // Default limit to 15 if not provided
      if (isNaN(limit) || limit < 1) {
        return res.status(400).json({ error: "Invalid limit parameter" });
      }

      limit = Math.min(limit, MAX_LIMIT); // Ensure the limit does not exceed the maximum limit
      
      const currentUserId = req.query.currentUserId as string || null;
      
      const posts = await postService.getAllPosts(limit);
      
      // Transform posts to include like count and is_liked status
      const transformedPosts = posts.map(post => {
        const likesCount = post.likes ? post.likes.length : 0;
        const isLiked = currentUserId ? 
          post.likes.some((like: any) => like.user_id === currentUserId) : 
          false;
          
        return {
          ...post,
          likes_count: likesCount,
          is_liked: isLiked
        };
      });

      res.status(200).json({ data: transformedPosts, meta: { limit } });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Error while fetching all posts" });
    }
  },

  //% Get user posts by user ID
  getUserPosts: async (req: Request, res: Response) => {
    try {
      const id = req.params.id_user;
      const userPosts = await postService.getUserPosts(id);

      res.status(200).json({ data: userPosts });
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ error: "Error while fetching user posts" });
    }
  },

  //% Get posts by keyword
  getPostByKeyword: async (req: Request, res: Response) => {
    try {
      const keyword = (req.query.q as string) || ""; // Get the keyword from the query string
      console.log("Keyword:", keyword); // Log the keyword for debugging
      const postsByKeyword = await postService.getPostByKeyword(keyword);

      res.status(200).json({ data: postsByKeyword });
    } catch (error) {
      console.error("Error fetching posts by keyword:", error);
      res.status(500).json({ error: "Error while fetching posts by keyword" });
    }
  },

  //% Get posts by user ID
  getPostsByUserId: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const currentUserId = req.query.currentUserId as string || null;
      
      const posts = await postService.getPostsByUserId(userId);
      
      // Transform posts to include like count and is_liked status
      const transformedPosts = posts.map(post => {
        const likesCount = post.likes ? post.likes.length : 0;
        const isLiked = currentUserId ? 
          post.likes.some((like: any) => like.user_id === currentUserId) : 
          false;
          
        return {
          ...post,
          likes_count: likesCount,
          is_liked: isLiked
        };
      });
      
      res.status(200).json({ data: transformedPosts });
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ error: "Error fetching user posts" });
    }
  },
  
  //% Create a new post
  createPost: async (req: Request, res: Response) => {
    try {
      const { content, author_id } = req.body;

      if (!content || !author_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newPost = await postService.createPost(content, author_id);
      res.status(201).json({ data: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({
        error: "Error while creating post",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  //% Like a post
  likePost : async (req:Request, res:Response) => {
    try {
      const id_post = req.params.id;  
      const { userId } = req.body;
      
      console.log('Liking post - Request details:', { 
        id_post, 
        id_post_type: typeof id_post,
        userId, 
        userId_type: typeof userId,
        body: req.body,
        params: req.params
      });
      
      if (!id_post || !userId) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters",
          debug: { id_post, userId, body: req.body } 
        });
      }
      
      // Create like record in database using Prisma
      const like = await likeService.likePost(id_post, userId);
      
      console.log('Like created successfully:', like);
      
      res.status(201).json({ success: true, data: like });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ success: false, message: "Failed to like post" });
    }
  },

  //% Unlike a post
  unlikePost : async (req:Request, res:Response) => {
    try {
      const id_post = req.params.id;  
      const { userId } = req.body;
      
      console.log('Unliking post:', { id_post, userId });
      
      // Remove like record from database using Prisma
      const like = await likeService.unlikePost(id_post, userId);
      
      res.status(200).json({ success: true, data: like });
    } catch (error) {
      console.error("Error unliking post:", error);
      res.status(500).json({ success: false, message: "Failed to unlike post" });
    }
  },
};

export default postController;
