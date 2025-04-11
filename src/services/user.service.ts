import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Request } from "express";

const prisma = new PrismaClient().$extends(withAccelerate()).user;

export const getAllUsers = () => {
  return prisma.findMany({
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
  });
};

export const getUserById = (id: string) => {
  return prisma.findUnique({
    where: { id_user: id },
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.findUnique({
    where: { username: username },
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
  });
};

export const getUserByGoogleId = (google_id: string) => {
  return prisma.findUnique({
    where: { google_id: google_id },
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
  });
};

export const createUser = async (userData: Request["body"]) => {
  // Check for existing user with same email or google_id
  const existingUser = await prisma.findFirst({
    where: {
      OR: [{ email: userData.email }, { google_id: userData.google_id }],
    },
  });

  if (existingUser) {
    if (existingUser.email === userData.email) {
      throw new Error("User with this email already exists");
    }
    if (existingUser.google_id === userData.google_id) {
      throw new Error("User with this Google ID already exists");
    }
  }

  return prisma.create({
    data: {
      google_id: userData.google_id,
      email: userData.email,
      username: userData.username,
      firstname: userData.firstname || "Unknown",
      lastname: userData.lastname || "User",
      profile_picture: userData.profile_picture || "/default-avatar.png",
    },
  });
};

export const updateUser = (userId: string, userData: Request["body"]) => {
  return prisma.update({
    where: { id_user: userId },
    data: userData,
  });
};

export const deleteUser = (userId: string) => {
  return prisma.delete({
    where: { id_user: userId },
  });
};
