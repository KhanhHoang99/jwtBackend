import mysql from 'mysql2/promise';
import bcrypt from "bcryptjs";

const bluebird = require('bluebird');


// To hash a password:
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


// Load hash from your password DB.
// bcrypt.compareSync(password, hashPassword); // true



const createNewUser = async (email, userName, password) => {
    
    let hashPass = hashPassword(password);
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',  [email, hashPass, userName]); 
    } catch (error) {
        console.log("Error when create user: ", error);
    }finally {
        // Close the connection
        await connection.end();
    }

}

const getUserList = async () => {

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM `users`'); 
        return rows; 
    } catch (error) {
        console.log("Error when get user: ", error);
        throw error;
    }finally {
         // Close the connection
         await connection.end();
    }
    

}

const deleteUser = async (id) => {
    
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    
    try {
        const [rows, fields] = await connection.execute('DELETE FROM `users` WHERE `id` = ?',  [id]);
    } catch (error) {
        console.log("Error when delete user: ", error);
    }finally {
        // Close the connection
        await connection.end();
    }

}

const getUserById = async (id) => {
    
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `id` = ?',  [id]);
        return rows[0];
    } catch (error) {
        console.log("Error when get user: ", error);
    }finally {
        // Close the connection
        await connection.end();
    }
    
}


const updateUserInfo  = async (userId, newEmail, newUsername) => {
    
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [newEmail, newUsername, userId]);
        console.log('User updated successfully!');
    } catch (error) {
         console.error('Error:', error);
    } finally {
        // Close the connection
        await connection.end();
    }

}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    updateUserInfo ,
    getUserById
}