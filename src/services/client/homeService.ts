import { TOTAL_ITEMS_PER_PAGE_CLIENT } from "config/constant";
import { prisma } from "config/prismaClient";

const countTotalHomePage = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE_CLIENT;
  const totalItems = await prisma.product.count();

  const totalPages = Math.ceil(totalItems / pageSize);

  return totalPages;
};

const getAllProduct = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE_CLIENT;
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
  return products;
};

export { getAllProduct, countTotalHomePage };
