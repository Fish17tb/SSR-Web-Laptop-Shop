import express, { Express } from "express";
// import {
//   // getPageCreateUser,
//   getHomePage,
//   // handleCreateUser,
//   handleDeleteUser,
//   getPageDetailUser,
//   handleUpdateUser,
// } from "controllers/userController";
import {
  getPageCreateUser,
  getAdminOrderPage,
  getAdminProductPage,
  getDashboardPage,
  getPageManageUsers,
  handleCreateUser,
  handleDeleteUser,
  getPageDetailUser,
  handleUpdateUser,
} from "controllers/admin/userController";
import uploadSingleFile from "src/middleware/fileUpload";
import { getHomePage } from "controllers/client/homeController";
import {
  addProductToCart,
  getPageDetailProduct,
  deleteProductInCart,
} from "controllers/client/productController";
import {
  getPageCreateProduct,
  getPageDetailProducts,
  getPageManageProducts,
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "controllers/admin/productController";
import {
  authorizeByRole,
  getLoignPage,
  getRegisterPage,
  handleLogout,
  handleRegister,
} from "controllers/client/authController";
import passport from "passport";
import { blockIfAuthenticated, isAdmin, isLoggedIn } from "src/middleware/auth";
import {
  getCartPage,
  handleCartBeforeToCheckOut,
  handlePlaceOrder,
} from "controllers/client/cartController";
import { getCheckOutpage, getPageThanks } from "controllers/client/checkoutController";

const router = express.Router();

// Middleware validate input trước khi dùng passport
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.messages = ["Vui lòng điền đầy đủ thông tin!"];
    return res.redirect("/login");
  }
  next();
};

const webRoute = (app: Express) => {
  //   router.get("/", getHomePage);

  //   router.get("/create-user", getPageCreateUser);
  //   router.post("/handle-create-user", handleCreateUser);
  //   router.post("/handle-delete-user/:id", handleDeleteUser);
  //   router.get("/handle-view-user/:id", getPageDetailUser);
  //   router.post("/handle-update-user/:id", handleUpdateUser);

  // Admin-Routes
  router.get("/admin", isAdmin, getDashboardPage);

  // Admin-User
  router.get("/admin/user", getPageManageUsers);
  router.get("/admin/create-user", getPageCreateUser);
  router.post(
    "/admin/handle-create-user",
    uploadSingleFile("avatar"),
    handleCreateUser
  );
  router.post("/admin/handle-delete-user/:id", handleDeleteUser);
  router.get("/admin/handle-view-user/:id", getPageDetailUser);
  router.post(
    "/admin/handle-update-user",
    uploadSingleFile("avatar"),
    handleUpdateUser
  );

  // Admin-Product
  router.get("/admin/product", getPageManageProducts);
  router.get("/admin/create-product", getPageCreateProduct);
  router.post(
    "/admin/handle-create-product",
    uploadSingleFile("image", "images/product"),
    handleCreateProduct
  );
  router.post("/admin/handle-delete-product/:id", handleDeleteProduct);
  router.get("/admin/handle-view-product/:id", getPageDetailProducts);
  router.post(
    "/admin/handle-update-product",
    uploadSingleFile("image", "images/product"),
    handleUpdateProduct
  );

  // router.post(
  //   "/admin/handle-create-user",
  //   upload.single("avatar"),
  //   (req, res) => {
  //     res.send("File uploaded successfully");
  //   }
  // );
  router.get("/admin/order", getAdminOrderPage);

  // Client-Routes

  // Middleware
  router.get("/middleware-role", authorizeByRole);

  router.get("/login", isLoggedIn, getLoignPage);
  router.post(
    "/handle-login",
    validateLoginInput,
    passport.authenticate("local", {
      successRedirect: "/middleware-role",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.get("/register", blockIfAuthenticated, getRegisterPage);
  router.post("/handle-register", handleRegister);
  router.post("/logout", handleLogout);
  router.get("/", getHomePage);
  router.get("/detail-product/:id", getPageDetailProduct);

  router.post("/add-product-to-cart/:id", addProductToCart);
  router.get("/cart", getCartPage);
  router.post("/handle-delete-product-in-cart/:id", deleteProductInCart);
  router.post("/handle-cart-before-to-checkout", handleCartBeforeToCheckOut);
  router.get("/checkout", getCheckOutpage);
  router.post("/place-order", handlePlaceOrder);
  router.get("/thanks", getPageThanks)

  app.use("/", isAdmin, router);
};

export default webRoute;
