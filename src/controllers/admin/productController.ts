import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";
// import { handleCreateProductSv } from "services/admin/productService";

const getPageManageProducts = async (req: Request, res: Response) => {
  return res.render("admin/product/manageProduct.ejs");
};

const getPageCreateProduct = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };

  return res.render("admin/product/createProduct.ejs", {
    errors: errors,
    oldData: oldData,
  });
};

const handleCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, factory, quantity, target } =
    req.body as TProductSchema;

  const validate = ProductSchema.safeParse(req.body);

  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      factory,
      quantity,
      target,
    };
    return res.render("admin/product/createProduct.ejs", {
      errors: errors,
      oldData: oldData,
    });
  }

  return res.redirect("/admin/product");
};

export { getPageManageProducts, getPageCreateProduct, handleCreateProduct };
