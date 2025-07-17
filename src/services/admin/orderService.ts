import { prisma } from "config/prismaClient";

const getListOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  });

  return orders;
};

const getListDetailOrders = async () => {
  const orderDetails = await prisma.orderDetail.findMany({
    include: {
      product: true,
      order: true,
    },
  });

  return orderDetails;
};

export { getListOrders, getListDetailOrders };
