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

const handlePlaceOrderService = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartDetails: true,
    },
  });
  if (cart) {
    const dataOrderDetail =
      cart?.cartDetails?.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })) ?? [];
    // create order
    await prisma.order.create({
      data: {
        receiverName,
        receiverAddress,
        receiverPhone,
        status: "PENDING",
        paymentMethod: "COD",
        paymentStatus: "PAYMENT_UNPAID",
        totalPrice,
        userId,
        // create oreder_detail
        orderDetails: {
          create: dataOrderDetail,
        },
      },
    });

    // remove cart detail + cart
    await prisma.cartDetail.deleteMany({
      where: { cartId: cart.id },
    });

    await prisma.cart.delete({
      where: { id: cart.id },
    });
  }
};

export { updateCartBeforeToCheckOut, handlePlaceOrderService };
