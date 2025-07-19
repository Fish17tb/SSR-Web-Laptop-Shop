import { Request, Response } from "express";
import {
  addProductToCartService,
  handleDeleteProductInCart,
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

const addProductToCartFromDetailProduct = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const user = req.user;

  if (!user) return res.redirect("/login");

  await addProductToCartService(+quantity, +id, user);

  return res.redirect(`/detail-product/${id}`);
};

const deleteProductInCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (user) {
    await handleDeleteProductInCart(+id, user.id, user.sumCart);
    return res.redirect("/cart");
  } else {
    return res.redirect("/login");
  }
};

export {
  getPageDetailProduct,
  addProductToCart,
  deleteProductInCart,
  addProductToCartFromDetailProduct,
};
