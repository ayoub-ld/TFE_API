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

export const createUser = (userData: Request["body"]) => {
  return prisma.create({
    data: userData,
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
