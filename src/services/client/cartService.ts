import { prisma } from "./../../config/prismaClient";

const updateCartBeforeToCheckOut = async (
  data: { id: string; quantity: string }[]
) => {
  for (let i = 0; i < data.length; i++) {
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id,
      },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }
};

export { updateCartBeforeToCheckOut };
