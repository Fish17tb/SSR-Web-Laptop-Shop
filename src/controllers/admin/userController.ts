import { Request, Response } from "express";
import {
  countTotalUserPage,
  getAllRoleService,
  getListUserService,
  getPageDetailUserService,
  handleCreateUserService,
  handleDeleteUserService,
  handleUpdateUserService,
} from "services/admin/userService";

const getPageManageUsers = async (req: Request, res: Response) => {
  const { page } = req.query;

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const listuser = await getListUserService(currentPage);
  const totalPages = await countTotalUserPage();
  return res.render("admin/user/manageUser.ejs", {
    listuser: listuser,
    totalPages: +totalPages,
    page: +currentPage,
  });
};

const getPageCreateUser = async (req: Request, res: Response) => {
  const roles = await getAllRoleService();
  return res.render("admin/user/createUser.ejs", { roles: roles });
};

const handleCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address, role, phone } = req.body;

  // get avatar (library multer)
  const file = req.file; // file: null <=> User doesn't transmit images
  const avatar = file?.filename ?? "";

  // console.log("check-data", fullName, email, phone, role, address);
  await handleCreateUserService(fullName, email, address, phone, avatar, role);
  return res.redirect("/admin/user");
};

const getAdminProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/manageProduct.ejs");
};

const handleDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUserService(id);
  return res.redirect("/admin/user");
};

const getPageDetailUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getPageDetailUserService(id);
  const roles = await getAllRoleService();
  // console.log("data-user", user)
  // console.log("data-role", roles)
  return res.render("admin/user/detailUser.ejs", { user: user, roles: roles });
};

const handleUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, address, phone, role } = req.body;

  // get avatar (library multer)
  const file = req.file; // file: null <=> User doesn't transmit images
  const avatar = file?.filename ?? undefined;

  await handleUpdateUserService(id, fullName, address, phone, avatar, role);
  return res.redirect("/admin/user");
};

export {
  getPageManageUsers,
  getAdminProductPage,
  getPageCreateUser,
  handleCreateUser,
  handleDeleteUser,
  getPageDetailUser,
  handleUpdateUser,
};
