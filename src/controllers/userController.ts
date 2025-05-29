// import { Request, Response } from "express";
// import {
//   handleCreateUserService,
//   getListUserService,
//   handleDeleteUserService,
//   getPageDetailUserService,
//   handleUpdateUserService,
// } from "services/userService";

// const getHomePage = async (req: Request, res: Response) => {
//   const listuser = await getListUserService();
//   // console.log("ck-listUser", listuser);
//   return res.render("home.ejs", { listuser: listuser });
// };

// const getPageCreateUser = (req: Request, res: Response) => {
//   return res.render("createUser.ejs");
// };

// const handleCreateUser = async (req: Request, res: Response) => {
//   const { name, email, address } = req.body;
//   // console.log("check-data", req.body);
//   await handleCreateUserService(name, email, address);
//   return res.redirect("/");
// };

// const handleDeleteUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   await handleDeleteUserService(id);
//   return res.redirect("/");
// };

// const getPageDetailUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = await getPageDetailUserService(id);
//   // console.log("hnv-user", user);
//   return res.render("detailUser.ejs", { user: user });
// };

// const handleUpdateUser = async (req: Request, res: Response) => {
//   const { id, name, email, address } = req.body;
//   // console.log("ck-data", req.body);
//   await handleUpdateUserService(id, name, email, address);
//   return res.redirect("/");
// };

// export {
//   getPageCreateUser,
//   handleCreateUser,
//   getHomePage,
//   handleDeleteUser,
//   getPageDetailUser,
//   handleUpdateUser,
// };
