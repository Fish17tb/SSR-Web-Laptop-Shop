import express, { Express } from "express";
import {
  // getPageCreateUser,
  getHomePage,
  // handleCreateUser,
  handleDeleteUser,
  getPageDetailUser,
  handleUpdateUser,
} from "controllers/userController";
import {
  getPageCreateUser,
  getAdminOrderPage,
  getAdminProductPage,
  getDashboardPage,
  getPageManageUsers,
  handleCreateUser,
} from "controllers/admin/adminController";
import uploadSingleFile from "src/middleware/fileUpload";

const router = express.Router();

const webRoute = (app: Express) => {
  //   router.get("/", getHomePage);

  //   router.get("/create-user", getPageCreateUser);
  //   router.post("/handle-create-user", handleCreateUser);
  //   router.post("/handle-delete-user/:id", handleDeleteUser);
  //   router.get("/handle-view-user/:id", getPageDetailUser);
  //   router.post("/handle-update-user/:id", handleUpdateUser);

  // admin routes
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getPageManageUsers);
  router.get("/admin/create-user", getPageCreateUser);
  router.post(
    "/admin/handle-create-user",
    uploadSingleFile("avatar"),
    handleCreateUser
  );
  // router.post(
  //   "/admin/handle-create-user",
  //   upload.single("avatar"),
  //   (req, res) => {
  //     res.send("File uploaded successfully");
  //   }
  // );
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/order", getAdminOrderPage);

  app.use("/", router);
};

export default webRoute;
