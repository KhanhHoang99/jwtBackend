import express from "express";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    
    router.get('/', (req, res) => {
        res.send('Hello World');
    })

    router.get('/about', (req, res) => {
        res.send('Hello about');
    })

    return app.use("/", router);

}

export default initWebRoutes