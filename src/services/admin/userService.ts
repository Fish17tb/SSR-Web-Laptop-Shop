import { prisma } from "config/prismaClient";
import { ACCOUNT_TYPE, TOTAL_ITEMS_PER_PAGE } from "config/constant";
import bcrypt from "bcrypt";

const saltRounds = 10; // Password strength

const countTotalUserPage = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const totalItems = await prisma.user.count();

  const totalPages = Math.ceil(totalItems / pageSize); // hàm làm tròn

  return totalPages;
};

const getListUserService = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
  });
  return users;
};

// hash password for seed data
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

const handleCreateUserService = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
  role: number
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
      roleId: +role,
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
  fullName: string,
  address: string,
  phone: string,
  avatar: string,
  role: number
) => {
  const updateUser = await prisma.user.update({
    where: {
      // plus sign to convert data type
      id: +id,
    },
    data: {
      fullName: fullName,
      address: address,
      roleId: +role,
      phone: phone,
      ...(avatar !== undefined && { avatar: avatar }),
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
  comparePassword,
  countTotalUserPage,
};
