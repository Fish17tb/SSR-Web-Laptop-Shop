import { CartDetail } from "./../../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import { updateCartBeforeToCheckOut } from "services/client/cartService";
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

    return res.render("client/cart/cart.ejs", {
      cartDetails: cartDetails,
      totalPrice: totalPrice,
    });
  }
};

const handleCartBeforeToCheckOut = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];

  await updateCartBeforeToCheckOut(currentCartDetail);
  return res.redirect("/checkout");
};

export { getCartPage, handleCartBeforeToCheckOut };
