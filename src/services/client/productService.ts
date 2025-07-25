import { TOTAL_ITEMS_PER_PAGE_CLIENT_PRODUCT } from "config/constant";
import { prisma } from "config/prismaClient";

const countTotalProductPage = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE_CLIENT_PRODUCT;
  const totalItems = await prisma.product.count();

  const totalPages = Math.ceil(totalItems / pageSize);

  return totalPages;
};

const getListProducts = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE_CLIENT_PRODUCT;
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
  return products;
};

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

const addProductToCartService = async (
  quantity: number,
  productId: number,
  user: Express.User
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (cart) {
    // update
    // cập nhật sum giỏ hàng
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });

    // cập nhật cart-detail
    // nếu chưa có, tạo mới ngược lại có rồi, cập nhật quantity

    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });

    // upsert = update + insert
    await prisma.cartDetail.upsert({
      where: {
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        productId: productId,
        price: product.price,
        quantity: quantity,
      },
    });
  } else {
    // create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
  });
  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
    return currentCartDetail;
  }
  return [];
};

const handleDeleteProductInCart = async (
  cartDetailId: number,
  userId: number,
  sumCart: number
) => {
  // xóa cart-detail
  const currentCartDetail = await prisma.cartDetail.findUnique({
    where: { id: cartDetailId },
  });

  const quantity = currentCartDetail.quantity;

  await prisma.cartDetail.delete({
    where: { id: cartDetailId },
  });

  if (sumCart === 1) {
    // delete cart
    await prisma.cart.delete({
      where: { userId },
    });
  } else {
    // update cart
    await prisma.cart.update({
      where: { userId },
      data: {
        sum: {
          decrement: quantity,
        },
      },
    });
  }
};
export {
  getListProducts,
  getProductById,
  addProductToCartService,
  getProductInCart,
  handleDeleteProductInCart,
  countTotalProductPage,
};
