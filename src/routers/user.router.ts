import { Router } from "express";
import type { Request, Response } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

/// Consolidated root route
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /user/:id - Récupérer un utilisateur par son ID
userRouter
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /user/google/:googleId - Récupérer un utilisateur par son ID de Google
userRouter
  .route("/google/:googleId")
  .get(async (req: Request, res: Response) => {
    await userController.getUserByGoogleId(req, res);
  })
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /user/email/:email - Récupérer un utilisateur par son email
userRouter
  .route("/email/:email")
  .get(async (req: Request, res: Response) => {
    await userController.getUserByEmail(req, res);
  })
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default userRouter;
