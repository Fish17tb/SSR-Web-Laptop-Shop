import { prisma } from "config/prismaClient";

const initDataFake = async () => {
  const userCount = await prisma.user.count();
  const roleCount = await prisma.role.count();
  if (userCount === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "Bob",
          email: "bob@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
        },
        {
          fullName: "Alex",
          email: "alex@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
        },
        {
          fullName: "Peter",
          email: "peter@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
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
