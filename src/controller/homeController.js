import userService from "../service/userService";



const handleUserPage = async (req, res) => {

    let userList = await userService.getUserList();
    res.render('user', {userList});
};

const handleCreateNewUser = (req, res) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    userService.createNewUser(email, username, password);
    return res.redirect('/user');
    
};

const deleteUser = async (req, res) => {

    let id = req.params.id;
    await userService.deleteUser(id);
    return res.redirect('/user');
    
};

module.exports = {
    handleUserPage,
    handleCreateNewUser,
    deleteUser
}