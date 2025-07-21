import { CartDetail } from "./../../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import {
  handlePlaceOrderService,
  updateCartBeforeToCheckOut,
} from "services/client/cartService";
import { getProductInCart } from "services/client/productService";

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  // console.log("ck-data-user", user);
  if (!user) {
    return res.redirect("/login");
  } else {
    const cartDetails = await getProductInCart(+user.id);
    // console.log("ck-cartDetails", cartDetails);

    const totalPrice = cartDetails
      ?.map((item) => +item.price * +item.quantity)
      ?.reduce((a, b) => a + b, 0);

    const cartId = cartDetails.length ? cartDetails[0].cartId : 0;

    return res.render("client/cart/cart.ejs", {
      cartDetails: cartDetails,
      totalPrice: totalPrice,
      cartId: cartId,
    });
  }
};

const handleCartBeforeToCheckOut = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const { cartId } = req.body;
  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];

  await updateCartBeforeToCheckOut(currentCartDetail, cartId);
  return res.redirect("/checkout");
};

const handlePlaceOrder = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

  const message = await handlePlaceOrderService(
    user.id,
    receiverName,
    receiverAddress,
    receiverPhone,
    +totalPrice
  );
  if (message) {
    console.log("ck-message", message);
    return res.redirect("/checkout");
  }

  return res.redirect("/thanks");
};

export { getCartPage, handleCartBeforeToCheckOut, handlePlaceOrder };
