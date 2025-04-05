import { Request, Response } from "express";
import * as userService from "../services/user.service";

const userController = {
  //% Get all users
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json({ data: allUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error while fetching all users" });
    }
  },

  //% Get user by ID
  getUserById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Error while fetching user by ID" });
    }
  },

  //% Get user by username
  getUserByUsername: async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const user = await userService.getUserByUsername(username);

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user by Username:", error);
      res.status(500).json({ error: "Error while fetching user by Username" });
    }
  },

  //% Get user by Google ID
  getUserByGoogleId: async (req: Request, res: Response) => {
    try {
      const google_id = req.params.google_id;
      const user = await userService.getUserByGoogleId(google_id);

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user by Google ID:", error);
      res.status(500).json({ error: "Error while fetching user by Google ID" });
    }
  },

  //% Create a new user
  createUser: async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);

      res.status(201).json({ data: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error while creating user" });
    }
  },

  //% Update user
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const userData = req.body;

      const updatedUser = await userService.updateUser(userId, userData);

      res.status(200).json({ data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error while updating user" });
    }
  },

  //% Delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.deleteUser(userId);

      res.status(204).json({ data: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error while deleting user" });
    }
  },
};

export default userController;
