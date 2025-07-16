import { Request, Response } from "express";
import { getProductInCart } from "services/client/productService";

const getCheckOutpage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }

  const cartDetails = await getProductInCart(+user.id);
  const totalPrice = cartDetails
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);

  return res.render("client/checkout/checkout.ejs", {
    cartDetails,
    totalPrice,
  });
};

const getPageThanks = (req: Request, res: Response) => {
return res.render("client/checkout/thanks.ejs")
};

export { getCheckOutpage, getPageThanks };
