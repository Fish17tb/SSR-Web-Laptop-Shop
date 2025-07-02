import { ACCOUNT_TYPE } from "config/constant";
import { prisma } from "config/prismaClient";
import { hashPassword } from "services/admin/userService";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const newPassword = await hashPassword(password);
  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: newPassword,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  } else {
    throw new Error("User Role không tồn tại!");
  }
};

const getUserWithRoleById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    omit: {
      password: true,
    },
    include: {
      role: true,
    },
  });

  // You can use pass javaScript
  // delete user.password
  return user;
};

const getUserSumCart = async (id: number) => {
  const user = await prisma.cart.findUnique({
    where: {
      userId: id,
    },
  });

  // You can use pass javaScript
  // delete user.password
  return user?.sum ?? 0;
};

export { isEmailExist, registerNewUser, getUserWithRoleById, getUserSumCart };
