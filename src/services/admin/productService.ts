import { prisma } from "config/prismaClient";

const handleCreateProductSv = async (
  name: string,
  price: number,
  image: string,
  detailDesc: string,
  shortDesc: string,
  quantity: string,
  factory: string,
  target: string,
  sold: number
) => {
  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      image: image,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: +quantity,
      factory: factory,
      target: target,
      sold: +"",
    },
  });
  return product;
};

export { handleCreateProductSv };
