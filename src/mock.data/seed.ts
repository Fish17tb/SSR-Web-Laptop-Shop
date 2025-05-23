import { prisma } from "config/prismaClient";
import { hashPassword } from "services/userService";
import { ACCOUNT_TYPE } from "config/constant";

const initDataFake = async () => {
  const userCount = await prisma.user.count();
  const roleCount = await prisma.role.count();
  if (userCount === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "Ngô Văn Quyết",
          email: "ngoquyet245@gmail.com",
          password: await hashPassword("123456"),
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0957237425",
        },
        {
          fullName: "Trần Bình Trọng",
          email: "binhtrong123@gmail.com",
          password: await hashPassword("123456"),
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0957328434",
        },
      ],
    });
  } else if (roleCount === 0) {
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
  } else {
    console.log("Data already exists in the database");
  }
};

export default initDataFake;
