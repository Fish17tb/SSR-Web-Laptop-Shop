import { TOTAL_ITEMS_PER_PAGE } from "config/constant";
import { prisma } from "config/prismaClient";

const countTotalProductPage = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const totalItems = await prisma.product.count();

  const totalPages = Math.ceil(totalItems / pageSize);

  return totalPages;
};

const getListProductService = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
  return products;
};

const handleCreateProductService = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  factory: string,
  quantity: number,
  target: string,
  imageUpload: string
) => {
  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      factory: factory,
      quantity: quantity,
      target: target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
  return product;
};

const getPageDetailProductService = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      // plus sign to convert data type
      id: +id,
    },
  });
  return product;
};

const handleUpdateProductService = async (
  id: string,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  factory: string,
  quantity: number,
  target: string,
  imageUpload: string
) => {
  const updateProduct = await prisma.product.update({
    where: {
      // plus sign to convert data type
      id: +id,
    },
    data: {
      name: name,
      price: +price,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      factory: factory,
      quantity: +quantity,
      target: target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
  return updateProduct;
};

const handleDeleteProductService = async (id: string) => {
  const deleteUser = await prisma.product.delete({
    where: {
      // plus sign to convert data type
      id: +id,
    },
  });
  return deleteUser;
};

export {
  handleCreateProductService,
  getListProductService,
  getPageDetailProductService,
  handleUpdateProductService,
  handleDeleteProductService,
  countTotalProductPage,
};
