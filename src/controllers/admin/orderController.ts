import { Request, Response } from "express";
import {
  countTotalOrderPage,
  getListDetailOrders,
  getListOrders,
} from "services/admin/orderService";

const getPageManageOrders = async (req: Request, res: Response) => {
  const { page } = req.query;

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const orders = await getListOrders(currentPage);
  const totalPages = await countTotalOrderPage();
  return res.render("admin/order/mangeOrder.ejs", {
    orders,
    page: +currentPage,
    totalPages: +totalPages,
  });
};

const getPageDetailOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderDetails = await getListDetailOrders(+id);

  return res.render("admin/order/detailOrder.ejs", { orderDetails, id });
};

export { getPageManageOrders, getPageDetailOrders };
