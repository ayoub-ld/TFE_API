import { PrismaClient } from "@prisma/client/";
import { Request, Response } from "express";

const posts = new PrismaClient().post;

const postController = {
  //% Get all posts
  getAllPosts: async (_req: Request, res: Response) => {
    try {
      const allPosts = await posts.findMany();
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
      const userPosts = await posts.findMany({
        where: { author_id: id },
      });

      res.status(200).json({ data: userPosts });
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ error: "Error while fetching user posts" });
    }
  },
};

export default postController;
