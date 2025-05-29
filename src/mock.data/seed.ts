import { prisma } from "config/prismaClient";
import { hashPassword } from "services/userService";
import { ACCOUNT_TYPE } from "config/constant";

const initDataFake = async () => {
  const userCount = await prisma.user.count();
  const roleCount = await prisma.role.count();

  if (roleCount === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User quyền thông thường",
        },
      ],
    });
  }

  if (userCount === 0) {
    const defaultPassword = await hashPassword("123456");
    const roleUser = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });
    if (roleUser)
      await prisma.user.createMany({
        data: [
          {
            fullName: "Ngô Văn Quyết",
            email: "ngoquyet245@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            phone: "0957237425",
            roleId: roleUser.id,
          },
          {
            fullName: "Trần Bình Trọng",
            email: "binhtrong123@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            phone: "0957328434",
            roleId: roleUser.id,
          },
        ],
      });
  }
  if (roleCount !== 0 && userCount !== 0) {
    console.log("Data already exists in the database");
  }
};

export default initDataFake;
