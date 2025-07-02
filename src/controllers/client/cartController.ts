import { Request, Response } from "express";
const getCartPage = (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  } else {
    return res.render("client/cart/cart.ejs");
  }
};

export { getCartPage };
