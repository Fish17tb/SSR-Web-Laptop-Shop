import { ACCOUNT_TYPE } from "config/constant";
import { prisma } from "config/prismaClient";
import { comparePassword, hashPassword } from "services/admin/userService";

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

export { isEmailExist, registerNewUser };
