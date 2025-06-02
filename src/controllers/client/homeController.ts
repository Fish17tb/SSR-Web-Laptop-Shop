import { Request, Response } from "express";

const getHomePage = async (req: Request, res: Response) => {
  return res.render("client/home/home.ejs");
};

export { getHomePage };
