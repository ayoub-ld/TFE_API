import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import postController from "../controllers/post.controller";

const postRouter = Router();

/// GET /post - Récupérer tous les posts
// Update the root route
postRouter
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await postController.getAllPosts(req, res);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await postController.createPost(req, res);
    } catch (err) {
      next(err);
    }
  })
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /post/search - Récupérer tous les posts contenant un mot clé
postRouter
  .route("/search")
  .get(postController.getPostByKeyword)
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

/// POST /post/:id/like - Liker une publication  
postRouter
  .route("/:id/like")
  .post(postController.likePost)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// DELETE /post/:id/like - UnLike une publication
postRouter
  .route("/:id/like")
  .delete(postController.unlikePost)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // GET /post/user/:userId - Récupérer tous les posts d'un utilisateur par son user_ID
postRouter
.route("/user/:userId")
.get(postController.getPostsByUserId) 
.all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default postRouter;
