import { TOTAL_ITEMS_PER_PAGE } from "config/constant";
import { prisma } from "config/prismaClient";

const countTotalOrderPage = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const totalItems = await prisma.order.count();

  const totalPages = Math.ceil(totalItems / pageSize);

  return totalPages;
};

const getListOrders = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const orders = await prisma.order.findMany({
    skip: skip,
    take: pageSize,
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

export { getListOrders, getListDetailOrders, countTotalOrderPage };
