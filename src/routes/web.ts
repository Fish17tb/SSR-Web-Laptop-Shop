import express, { Express } from "express";
import { getPageCreateUser, getHomePage, handleCreateUser, handleDeleteUser, getPageDetailUser, handleUpdateUser } from "controllers/userController";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomePage)

    router.get("/create-user", getPageCreateUser)
    router.post("/handle-create-user", handleCreateUser)
    router.post("/handle-delete-user/:id", handleDeleteUser)
    router.get("/handle-view-user/:id", getPageDetailUser)
    router.post("/handle-update-user/:id", handleUpdateUser)
    
    app.use("/", router)
}

export default webRoute;