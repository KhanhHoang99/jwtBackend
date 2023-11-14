import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";
import groupController from "../controller/groupController";
import {checkUserJWT, checkUserPermission} from "../middleware/JWTAction"


const router = express.Router();


/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission);
    
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/account", userApiController.getUserAccount);

    router.get("/user/read", userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.put("/user/update", userApiController.updateFunc);
    router.delete("/user/delete", userApiController.deleteFunc);


    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);

}

export default initApiRoutes