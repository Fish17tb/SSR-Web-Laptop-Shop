import { Request, Response } from "express";

const getPageDetailProduct = async (req: Request, res: Response) => {
  return res.render("client/product/detailProduct.ejs");
};

export { getPageDetailProduct };
