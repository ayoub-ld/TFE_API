import { Router } from "express";
import type { Request, Response } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

/// GET /user - Récupérer tous les utilisateurs
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /user/:id - Récupérer un utilisateur par son ID
userRouter
  .route("/:id")
  .get(userController.getUserById)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// POST /user - Créer un nouvel utilisateur
userRouter
  .route("/")
  .post(userController.createUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// PUT /user/:id - Mettre à jour un utilisateur
userRouter
  .route("/:id")
  .put(userController.updateUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// DELETE /user/:id - Supprimer un utilisateur
userRouter
  .route("/:id")
  .delete(userController.deleteUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default userRouter;
