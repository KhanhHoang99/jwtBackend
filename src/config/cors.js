require("dotenv").config();
var cors = require('cors')



const configCors = (app) => {

    let corsOptions = {
        origin: process.env.REACTURL,
        optionsSuccessStatus: 200
    }



    app.use(cors(corsOptions));
}

export default configCors;