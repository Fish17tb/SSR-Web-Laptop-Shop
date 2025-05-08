import express, { Express } from "express";
import { getPageCreateUser, getHomePage, handleCreateUser } from "../controllers/userController";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomePage)

    router.get("/create-user", getPageCreateUser)
    router.post("/handle-create-user", handleCreateUser)
    

    app.use("/", router)
}



export default webRoute;