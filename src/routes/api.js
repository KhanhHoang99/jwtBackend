import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";
import groupController from "../controller/groupController";
import {checkUserJWT, checkUserPermission} from "../middleware/JWTAction"


const router = express.Router();


// const checkUserLogin = (req, res, next) => {

//     const nonSecurePaths = ['/', '/register', '/login'];
//     if(nonSecurePaths.includes(req.path)){
//         return next();
//     }

//     next();
// }

/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", checkUserJWT, checkUserPermission, userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.put("/user/update", userApiController.updateFunc);
    router.delete("/user/delete", userApiController.deleteFunc);


    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);

}

export default initApiRoutes