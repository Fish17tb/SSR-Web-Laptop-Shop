import { Request, Response } from "express";
import { getAllProduct } from "services/client/homeService";

const getHomePage = async (req: Request, res: Response) => {
  const products = await getAllProduct();
  const user = req.user;
  // console.log("ck-user", user)
  const { page } = req.query;
  console.log("ck-query", page);
  return res.render("client/home/home.ejs", {
    products,
  });
};

export { getHomePage };
