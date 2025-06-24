import { NextFunction, Request, Response } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    return res.redirect("/");
  } else {
    next();
  }
};

const blockIfAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect("/"); // hoặc res.status(403).send("Already logged in")
  }
  next();
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/admin")) {
    const user = req.user;
    if (user?.role?.name === "ADMIN") {
      next();
    } else {
      return res.render("status/403.ejs");
    }
    return;
  }
  // client routes
  next();
};

export { isLoggedIn, isAdmin, blockIfAuthenticated };
