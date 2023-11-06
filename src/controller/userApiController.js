import userApiService from "../service/userApiService";


const readFunc = async (req, res) => {

    try {

        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;
            
            // console.log(">>> check data: ", "page = ", page, "limit = ", limit);

            let data = await userApiService.getAllUserWithPagination(+page, +limit);

            return res.status(200).json({
                message: data.message, //Error message
                errorCode: data.errorCode, // Error code
                data: data.data
            });

        }else{
           
            return res.status(500).json({
                message: "Missing parameter", //Error message
                errorCode: -1, // Error code
            });
        }

        

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }

}

const createFunc = async (req, res) => {
    try {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
    
        await userApiService.createNewUser(email, username, password);

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const updateFunc = async (req, res) => {
    try {

        
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const deleteFunc = async (req, res) => {
    try {

        

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

module.exports = {readFunc, createFunc, updateFunc, deleteFunc}