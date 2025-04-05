import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient().user;

export const getAllUsers = () => {
  return prisma.findMany();
};

export const getUserById = (id: string) => {
  return prisma.findUnique({
    where: { id_user: id },
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.findUnique({
    where: { username: username },
  });
};

export const getUserByGoogleId = (google_id: string) => {
  return prisma.findUnique({
    where: { google_id: google_id },
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
