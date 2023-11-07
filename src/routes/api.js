import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";
import groupController from "../controller/groupController";


const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.put("/user/update", userApiController.updateFunc);
    router.delete("/user/delete", userApiController.deleteFunc);


    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);

}

export default initApiRoutes