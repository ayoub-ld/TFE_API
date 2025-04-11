import { Request, Response } from "express";
import * as postService from "../services/post.service";

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

      const allPosts = await postService.getAllPosts(limit);
      res.status(200).json({ data: allPosts, meta: { limit } });
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
};

export default postController;
