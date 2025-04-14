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
      const googleId = req.params.googleId;
      const user = await userService.getUserByGoogleId(googleId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user by Google ID:", error);
      res.status(500).json({ error: "Error while fetching user by Google ID" });
    }
  },
  //% Get user by email
  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      console.log("Looking up user by email:", email);
      const user = await userService.getUserByEmail(email);
      
      console.log("User lookup result:", user ? "User found" : "User not found");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      res.status(500).json({ error: "Error while fetching user by email" });
    }
  },

  //% Create a new user
  createUser: async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      console.log("Creating user with data:", JSON.stringify(userData));
      
      const newUser = await userService.createUser(userData);
      console.log("User created successfully:", newUser);
      
      res.status(201).json({ data: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        error: "Error while creating user",
        details: error instanceof Error ? error.message : "Unknown error",
      });
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
