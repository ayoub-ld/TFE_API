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

export const getUserByEmail = (email: string) => {
  console.log("Service: Looking for user with email:", email);
  return prisma.findUnique({
    where: { email: email },
    cacheStrategy: {
      ttl: 30,
      swr: 60,
    },
  });
};

export const createUser = async (userData: Request["body"]) => {
  console.log("Service: Creating user with data:", JSON.stringify(userData));
  
  // Check for existing user with same email or google_id
  const existingUser = await prisma.findFirst({
    where: {
      OR: [{ email: userData.email }, { google_id: userData.google_id }],
    },
  });

  console.log("Service: Check for existing user result:", existingUser ? "User exists" : "No existing user");

  if (existingUser) {
    if (existingUser.email === userData.email) {
      console.log("Service: User with this email already exists");
      throw new Error("User with this email already exists");
    }
    if (existingUser.google_id === userData.google_id) {
      console.log("Service: User with this Google ID already exists");
      throw new Error("User with this Google ID already exists");
    }
  }

  try {
    const newUser = await prisma.create({
      data: {
        google_id: userData.google_id,
        email: userData.email,
        username: userData.username,
        firstname: userData.firstname || "Unknown-Firstname",
        lastname: userData.lastname || "Unknown-Lastname",
        profile_picture: userData.profile_picture || "/default-avatar.png",
      },
    });
    console.log("Service: User created successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Service: Error creating user in database:", error);
    throw error;
  }
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
