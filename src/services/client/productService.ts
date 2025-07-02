import { prisma } from "config/prismaClient";

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product
};

export { getProductById };
