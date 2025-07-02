import { Request, Response } from "express";
import {
  addProductToCartService,
  getProductById,
} from "services/client/productService";

const getPageDetailProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(+id);
  return res.render("client/product/detailProduct.ejs", { product });
};

const addProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await addProductToCartService(1, +id, user);
  } else {
    return res.redirect("/login");
  }

  return res.redirect("/");
};

export { getPageDetailProduct, addProductToCart };
