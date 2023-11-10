import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";

import JWTAction from "./middleware/JWTAction";


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;


configCors(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


//config view engine
configViewEngine(app);

//init routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})