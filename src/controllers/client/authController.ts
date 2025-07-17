import { NextFunction, Request, Response } from "express";
import { registerNewUser } from "services/client/authService";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

const getLoignPage = async (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  session.messages = null;
  return res.render("client/auth/login.ejs", {
    errors: messages,
  });
};

const getRegisterPage = async (req: Request, res: Response) => {
  return res.render("client/auth/register.ejs", {
    oldData: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: [],
  });
};

const handleRegister = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } =
    req.body as TRegisterSchema;

  const validate = await RegisterSchema.safeParseAsync(req.body);
  // Error
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );
    const oldData = {
      fullName,
      email,
      password,
      confirmPassword,
    };
    return res.render("client/auth/register.ejs", {
      errors,
      oldData,
    });
  } else {
    // Success
    await registerNewUser(fullName, email, password);
    return res.redirect("/login");
  }
};

const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const authorizeByRole = (req: Request, res: Response) => {
  const user = req.user as any;
  if (user?.role?.name === "ADMIN") {
    res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
};

export {
  getLoignPage,
  getRegisterPage,
  handleRegister,
  handleLogout,
  authorizeByRole,
};
