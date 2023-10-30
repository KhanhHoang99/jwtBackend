import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

// connection();

//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})