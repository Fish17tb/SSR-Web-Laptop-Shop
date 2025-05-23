import { Request, Response } from "express";
import {
  getAllRoleService,
  getListUserService,
  handleCreateUserService,
} from "services/userService";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/dashboard.ejs");
};

const getPageManageUsers = async (req: Request, res: Response) => {
  const listuser = await getListUserService();
  return res.render("admin/user/manageUser.ejs", {
    listuser: listuser,
  });
};

const getPageCreateUser = async (req: Request, res: Response) => {
  const roles = await getAllRoleService();  
  return res.render("admin/user/createUser.ejs", { roles: roles });
};

const handleCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address, role, phone } = req.body;

  // console.log("check-data", fullName, email, phone, role, address);
  // await handleCreateUserService(name, email, address);
  return res.render("admin/user/manageUser.ejs");
};

const getAdminProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/manageProduct.ejs");
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/mangeOrder.ejs");
};
export {
  getDashboardPage,
  getPageManageUsers,
  getAdminProductPage,
  getAdminOrderPage,
  getPageCreateUser,
  handleCreateUser,
};
