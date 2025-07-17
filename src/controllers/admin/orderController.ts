import { Request, Response } from "express";
import {
  getListDetailOrders,
  getListOrders,
} from "services/admin/orderService";

const getPageManageOrders = async (req: Request, res: Response) => {
  const orders = await getListOrders();
  return res.render("admin/order/mangeOrder.ejs", { orders });
};

const getPageDetailOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderDetails = await getListDetailOrders();

  return res.render("admin/order/detailOrder.ejs", { orderDetails });
};

export { getPageManageOrders, getPageDetailOrders };
