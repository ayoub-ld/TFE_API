import { Router } from "express";
import type { Request, Response } from "express";
import postController from "../controllers/post.controller";

const postRouter = Router();

/// GET /post - Récupérer tous les posts
postRouter
  .route("/")
  .get(postController.getAllPosts)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /post/:id - Récupérer tous les post d'un utilisateur par son user_ID
postRouter
  .route("/:id")
  .get(postController.getUserPosts)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /post/search/:keyword - Récupérer tous les posts contenant un mot clé
postRouter
  .route("/search/:keyword")
  .get(postController.getPostByKeyword)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default postRouter;
