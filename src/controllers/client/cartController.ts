import { Request, Response } from "express";
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

export { getCartPage };
