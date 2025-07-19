import { Request, Response } from "express";
import { getOrderHistory } from "services/client/historyService";

const getPageOrderHistory = async (req: Request, res: Response) => {
  const user = req.user;
  const orders = await getOrderHistory(user.id);

  return res.render("client/history/history.ejs", { orders });
};

export { getPageOrderHistory };
