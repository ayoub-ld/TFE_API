import { Router } from "express";
import type { Request, Response } from "express";
import * as userModel from "../models/user.model";

const userRouter = Router();

/// GET /users - Récupérer tous les utilisateurs
userRouter
  .route("/")
  .get(userModel.getAllUsers)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// GET /users/:id - Récupérer un utilisateur par son ID
userRouter
  .route("/:id")
  .get(userModel.getUserById)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// POST /users - Créer un nouvel utilisateur
userRouter
  .route("/")
  .post(userModel.createUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// PUT /users/:id - Mettre à jour un utilisateur
userRouter
  .route("/:id")
  .put(userModel.updateUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

/// DELETE /users/:id - Supprimer un utilisateur
userRouter
  .route("/:id")
  .delete(userModel.deleteUser)
  .all((_req: Request, res: Response) => {
    res.status(405).json({ error: "Method not allowed" });
  });

export default userRouter;
