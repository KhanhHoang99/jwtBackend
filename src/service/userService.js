import mysql from 'mysql2';
import bcrypt from "bcryptjs";

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});


// To hash a password:
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


// Load hash from your password DB.
// bcrypt.compareSync(password, hashPassword); // true

 
const createNewUser = (email, userName, password) => {

    let hashPass = hashPassword(password);

    connection.query(
        
        'INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',
        [email, hashPass, userName],
        function(err, results, fields) {
            if (err) {
                console.log('An error occurred when insert user into database' + err.message);
            } else {
                console.log('Insert was successful!');
            }
        }
    );
}

const getUserList = () => {
    connection.query(
        
        'SELECT * FROM `users`',
        function(err, results, fields) {
            if (err) {
                console.log('An error occurred when insert user into database' + err.message);
            } else {
                console.log('Insert was successful!');
            }
        }
    );
}


module.exports = {
    createNewUser,
    getUserList
}