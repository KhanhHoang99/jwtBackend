import userService from "../service/userService";

const handleUserPage = (req, res) => {
    res.render('user');
};

const handleCreateNewUser = (req, res) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    userService.createNewUser(email, username, password);

    return res.send('handleCreateNewUser');
    
    
};

module.exports = {
    handleUserPage,
    handleCreateNewUser
}