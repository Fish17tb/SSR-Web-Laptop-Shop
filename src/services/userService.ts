import { prisma } from "config/prismaClient";
import getConnection from "../config/database";

const getListUserService = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const handleCreateUserService = async (
  name: string,
  email: string,
  address: string
) => {
  const user = await prisma.user.create({
    data: {
      fullName: name,
      email: email,
      address: address,
      password: "123456",
      accountType: "user",
      phone: "1234567890",
      username: "user",
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
}
export {
  handleCreateUserService,
  getListUserService,
  handleDeleteUserService,
  getPageDetailUserService,
  handleUpdateUserService,
  getAllRoleService
};
