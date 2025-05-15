import { prisma } from "config/prismaClient";

const initDataFake = async () => {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "Bob",
          email: "bob@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
          username: "user",
        },
        {
          fullName: "Alex",
          email: "alex@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
          username: "user",
        },
        {
          fullName: "Peter",
          email: "peter@prisma.io",
          password: "123456",
          accountType: "user",
          phone: "1234567890",
          username: "user",
        },
      ],
    });
  } else {
    console.log("Data already exists in the database");
  }
};

export default initDataFake;
