import { Request, Response } from "express";
import { countTotalHomePage, getAllProduct } from "services/client/homeService";

const getHomePage = async (req: Request, res: Response) => {
  const user = req.user;
  // console.log("ck-user", user)

  const { page } = req.query;

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const products = await getAllProduct(currentPage);
  const totalPages = await countTotalHomePage();
  return res.render("client/home/home.ejs", {
    products,
    page: +currentPage,
    totalPages: +totalPages,
  });
};

export { getHomePage };
