import { Request, Response } from "express";
// import { handleCreateProductSv } from "services/admin/productService";

const getPageManageProducts = async (req: Request, res: Response) => {
  return res.render("admin/product/manageProduct.ejs");
};

const getPageCreateProduct = async (req: Request, res: Response) => {
  return res.render("admin/product/createProduct.ejs");
};

const handleCreateProduct = async (req: Request, res: Response) => {
  const { name } = req.body;

  // // get avatar (library multer)
  // const file = req.file; // file: null <=> User doesn't transmit images
  // const image = file?.filename ?? "";

  // await handleCreateProductSv(
  //   name,
  //   price,
  //   image,
  //   detailDesc,
  //   shortDesc,
  //   quantity,
  //   factory,
  //   target,
  //   sold: +""
  // );
  return res.redirect("/admin/product");
};

export { getPageManageProducts, getPageCreateProduct, handleCreateProduct };
