import { prisma } from "./../../config/prismaClient";

const updateCartBeforeToCheckOut = async (
  data: { id: string; quantity: string }[],
  cartId: string
) => {
  let quantity = 0;

  for (let i = 0; i < data.length; i++) {
    quantity += +data[i].quantity;
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id,
      },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }

  // update cart sum
  await prisma.cart.update({
    where: {
      id: +cartId,
    },
    data: {
      sum: quantity,
    },
  });
};

const handlePlaceOrderService = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  try {
    // tạo transaction
    // tx là bản clone được tạo từ prisma (tên thay thế)
    prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
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
        await tx.order.create({
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
        await tx.cartDetail.deleteMany({
          where: { cartId: cart.id },
        });

        await tx.cart.delete({
          where: { id: cart.id },
        });

        // check product
        for (let i = 0; i < cart.cartDetails.length; i++) {
          const productId = cart.cartDetails[i].productId;
          const product = await tx.product.findUnique({
            where: { id: productId },
          });

          if (!product || product.quantity < cart.cartDetails[i].quantity) {
            throw new Error(
              `Sản phẩm ${product?.name} đã hết hoặc không đủ số lượng!`
            );
          }
          await tx.product.update({
            where: { id: productId },
            data: {
              quantity: {
                decrement: cart.cartDetails[i].quantity,
              },
              sold: {
                increment: cart.cartDetails[i].quantity,
              },
            },
          });
        }
      }
    });
    return "";
  } catch (error) {
    return error.message;
  }
};

export { updateCartBeforeToCheckOut, handlePlaceOrderService };
