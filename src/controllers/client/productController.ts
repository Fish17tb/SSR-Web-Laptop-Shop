import { Request, Response } from "express";
import {
  addProductToCartService,
  handleDeleteProductInCart,
  getProductById,
  getListProducts,
  countTotalProductPage,
  filterProduct,
  getProductWithFilter,
} from "services/client/productService";

const getProductPage = async (req: Request, res: Response) => {
  const {
    page,
    factory = "",
    target = "",
    price = "",
    sort = "",
  } = req.query as {
    page?: string;
    factory: string;
    target: string;
    price: string;
    sort: string;
  };

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  // const products = await getListProducts(currentPage);
  // const totalPages = await countTotalProductPage();

  const data = await getProductWithFilter(
    currentPage,
    factory,
    target,
    price,
    sort
  );

  return res.render("client/product/product.ejs", {
    products: data.products,
    totalPages: +data.totalPages,
    page: +currentPage,
  });

  // const products = await filterProduct(minPrice as string, maxPrice as string);
  // res.status(200).json({
  //   data: products,
  // });
};

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
  getProductPage,
  getPageDetailProduct,
  addProductToCart,
  deleteProductInCart,
  addProductToCartFromDetailProduct,
};
