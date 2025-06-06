import { Request, Response } from "express";
import {
  getListProductService,
  getPageDetailProductService,
  handleCreateProductService,
  handleDeleteProductService,
  handleUpdateProductService,
} from "services/admin/productService";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";
// import { handleCreateProductSv } from "services/admin/productService";

const getPageManageProducts = async (req: Request, res: Response) => {
  const products = await getListProductService();
  return res.render("admin/product/manageProduct.ejs", {
    products: products,
  });
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
  } else {
    const image = req?.file?.filename ?? null;
    await handleCreateProductService(
      name,
      +price,
      detailDesc,
      shortDesc,
      factory,
      +quantity,
      target,
      image
    );
    return res.redirect("/admin/product");
  }
};

const getPageDetailProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getPageDetailProductService(id);

  const factoryOptions = [
    { name: "Apple (MacBook)", value: "APPLE" },
    { name: "Asus", value: "ASUS" },
    { name: "Lenovo", value: "LENOVO" },
    { name: "Dell", value: "DELL" },
    { name: "LG", value: "LG" },
    { name: "Acer", value: "ACER" },
  ];

  const targetOptions = [
    { name: "Gaming", value: "GAMING" },
    { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
    { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
    { name: "Mỏng nhẹ", value: "MONG-NHE" },
    { name: "Doanh nhân", value: "DOANH-NHAN" },
  ];

  return res.render("admin/product/detailProduct.ejs", {
    product: product,
    factoryOptions: factoryOptions,
    targetOptions: targetOptions,
  });
};

const handleUpdateProduct = async (req: Request, res: Response) => {
  const { id, name, price, detailDesc, shortDesc, factory, quantity, target } =
    req.body;

  const image = req?.file?.filename ?? null;

  await handleUpdateProductService(
    id,
    name,
    +price,
    detailDesc,
    shortDesc,
    factory,
    +quantity,
    target,
    image
  );
  return res.redirect("/admin/product");
};

const handleDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteProductService(id);
  return res.redirect("/admin/product");
};

export {
  getPageManageProducts,
  getPageCreateProduct,
  handleCreateProduct,
  getPageDetailProducts,
  handleUpdateProduct,
  handleDeleteProduct
};
