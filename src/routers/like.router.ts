import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import likeController from "../controllers/like.controller";

const likeRouter = Router();

// POST /like/:postId - Like a post
likeRouter
  .route("/:postId")
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await likeController.likePost(req, res);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await likeController.unlikePost(req, res);
    } catch (err) {
      next(err);
    }
  })
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await likeController.getPostLikes(req, res);
    } catch (err) {
      next(err);
    }
  })
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

// GET /like/:postId/check/:userId - Check if a user has liked a post
likeRouter
  .route("/:postId/check/:userId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await likeController.checkPostLike(req, res);
    } catch (err) {
      next(err);
    }
  })
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default likeRouter;
