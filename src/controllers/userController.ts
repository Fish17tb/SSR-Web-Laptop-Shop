import { Request, Response } from "express";
import {
  handleCreateUserService,
  getListUserService,
} from "../services/userService";

const getHomePage = async (req: Request, res: Response) => {
  const listuser = await getListUserService();
  console.log("ck-listUser", listuser);
  return res.render("home.ejs", { listuser: listuser });
};

const getPageCreateUser = (req: Request, res: Response) => {
  return res.render("createUser.ejs");
};

const handleCreateUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  // console.log("check-data", req.body);
  await handleCreateUserService(name, email, address);
  return res.redirect("/");
};

export { getPageCreateUser, handleCreateUser, getHomePage };
