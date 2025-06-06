import { prisma } from "config/prismaClient";

const getListProductService = async () => {
  const product = await prisma.product.findMany();
  return product;
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
  handleDeleteProductService
};
