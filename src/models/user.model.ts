import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

// Define types based on the Prisma schema
export type User = {
  id_user: string;
  google_id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateUserInput = Omit<User, "created_at" | "updated_at">;
export type UpdateUserInput = Partial<
  Omit<User, "id_user" | "created_at" | "updated_at">
>;

// Create a new user
export const createUser = async (userData: CreateUserInput) => {
  return await prisma.user.create({
    data: userData,
  });
};

// Get user by ID
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id_user: id },
  });
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Get user by username
export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// Get user by Google ID
export const getUserByGoogleId = async (googleId: string) => {
  return await prisma.user.findUnique({
    where: { google_id: googleId },
  });
};

// Get all users
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Update user
export const updateUser = async (id: string, userData: UpdateUserInput) => {
  return await prisma.user.update({
    where: { id_user: id },
    data: userData,
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id_user: id },
  });
};

// Get user with posts
export const getUserWithPosts = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id_user: id },
    include: { Post: true },
  });
};

export default User;
