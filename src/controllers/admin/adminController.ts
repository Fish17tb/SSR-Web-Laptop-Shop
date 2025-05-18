import { Request, Response } from "express";
import { getListUserService, handleCreateUserService } from "services/userService";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/dashboard.ejs");
};
const getAdminUserPage = async (req: Request, res: Response) => {
  const listuser = await getListUserService();
  return res.render("admin/user/manageUser.ejs", {
    listuser: listuser,
  });
};

const getAdminCreateUser = async (req: Request, res: Response) => {
  return res.render("admin/user/createUser.ejs");
};

const handleAdminCreateUser = async (req: Request, res: Response) => {
  //  const { name, email, address } = req.body;
  // console.log("check-data", req.body);
  // await handleCreateUserService(name, email, address);
  return res.render("admin/user/createUser.ejs");

};

const getAdminProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/manageProduct.ejs");
};
const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/mangeOrder.ejs");
};
export {
  getDashboardPage,
  getAdminUserPage,
  getAdminProductPage,
  getAdminOrderPage,
  getAdminCreateUser,
  handleAdminCreateUser,
};
