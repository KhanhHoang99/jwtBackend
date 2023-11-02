import userApiService from "../service/userApiService";


const handleRegister = async (req, res) => {

    try {

        let { email, phone, userName, password } = req.body;

        if (!email || !phone || !userName || !password) {
            return res.status(200).json({
                message: "Missing required parameters", //Error message
                errorCode: '1', // Error code
            });
        }


        // createUser
        let data = await userApiService.createNewUser(req.body);

        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
        });

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: '-1', // Error code
        })
    }

}


module.exports = {
    handleRegister
}