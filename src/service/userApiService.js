
import bcrypt from "bcryptjs";
import db from "../models"

const bluebird = require('bluebird');


// To hash a password:
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkEmailExist = async (userEmail) => {

    let user = await db.User.findOne({
        where: {email: userEmail}
    })

    if(user){
        console.log("user: ", user);
        return true;
    }

    return false;
}

const checkPhoneExist = async (userPhone) => {
    
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })

    if(user){
        return true;
    }

    return false;

}


const createNewUser = async (userData) => {

    // check email/phone number are exist

    let isEmailExist = await checkEmailExist(userData.email);
    if(isEmailExist) {
        return {
            message: "Email is already exist", //Error message
            errorCode: '1', // Error code
        }
    }

    let isPhoneExist = await checkPhoneExist(userData.phone);
    if(isPhoneExist) {
        return {
            message: "phone is already exist", //Error message
            errorCode: '1', // Error code
        };
    }

    // hash user password
    let hashPass = hashPassword(userData.password);

    // create a new user
    try {
        await db.User.create({
            email: userData.email,
            username: userData.userName,
            phone: userData.phone,
            password: hashPass,
        });
        
        console.log('User created successfully:');

        return {
            message: "User created successfully", //Error message
            errorCode: '0', // Error code
        }
    } catch (error) {

        console.error('Error creating user:', error);
        return {
            message: "Error from server maybe database", //Error message
            errorCode: '-2', // Error code
        }
    }


}

module.exports = {
    createNewUser
}