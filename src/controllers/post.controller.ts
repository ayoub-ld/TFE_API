import { Request, Response } from "express";
import * as postService from "../services/post.service";

const postController = {
  //% Get all posts
  getAllPosts: async (_req: Request, res: Response) => {
    try {
      const allPosts = await postService.getAllPosts();
      res.status(200).json({ data: allPosts });
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
      const keyword = req.params.keyword;
      const postsByKeyword = await postService.getPostByKeyword(keyword);

      res.status(200).json({ data: postsByKeyword });
    } catch (error) {
      console.error("Error fetching posts by keyword:", error);
      res.status(500).json({ error: "Error while fetching posts by keyword" });
    }
  },
};

export default postController;
