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
import { getPageDetailProduct } from "controllers/client/productController";
import {
  getPageCreateProduct,
  getPageDetailProducts,
  getPageManageProducts,
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "controllers/admin/productController";

const router = express.Router();

const webRoute = (app: Express) => {
  //   router.get("/", getHomePage);

  //   router.get("/create-user", getPageCreateUser);
  //   router.post("/handle-create-user", handleCreateUser);
  //   router.post("/handle-delete-user/:id", handleDeleteUser);
  //   router.get("/handle-view-user/:id", getPageDetailUser);
  //   router.post("/handle-update-user/:id", handleUpdateUser);

  // Admin-Routes
  router.get("/admin", getDashboardPage);

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
  router.get("/", getHomePage);
  router.get("/detail-product/:id", getPageDetailProduct);

  app.use("/", router);
};

export default webRoute;
