import { prisma } from "config/prismaClient";
import getConnection from "../config/database";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";

const saltRounds = 10; // Password strength

const getListUserService = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// hash password for seed data
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

const handleCreateUserService = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string
) => {
  const defaultPassword = await hashPassword("123456");
  const user = await prisma.user.create({
    data: {
      fullName: fullName,
      email: email,
      address: address,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      phone: phone,
      avatar: avatar,
    },
  });
  return user;
};

const handleDeleteUserService = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      // plus sign to convert data type
      id: +id,
    },
  });
  return deleteUser;
};

const getPageDetailUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      // plus sign to convert data type
      id: +id,
    },
  });
  return user;
};

const handleUpdateUserService = async (
  id: string,
  name: string,
  email: string,
  address: string
) => {
  const updateUser = await prisma.user.update({
    where: {
      // plus sign to convert data type
      id: +id,
    },
    data: {
      fullName: name,
      email: email,
      address: address,
    },
  });
  return updateUser;
};

const getAllRoleService = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};
export {
  handleCreateUserService,
  getListUserService,
  handleDeleteUserService,
  getPageDetailUserService,
  handleUpdateUserService,
  getAllRoleService,
  hashPassword,
};
