import { prisma } from "config/prismaClient";

const getListOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  });

  return orders;
};

const getListDetailOrders = async (orderId: number) => {
  const orderDetails = await prisma.orderDetail.findMany({
    where: { orderId },
    include: {
      product: true,
    },
  });

  return orderDetails;
};

export { getListOrders, getListDetailOrders };
