// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});




const handleUserPage = (req, res) => {
    res.render('user');
};

const handleCreateNewUser = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // simple query
    connection.query(
        
        'INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',
        [email, password, username],
        function(err, results, fields) {
            if (err) {
                console.log('An error occurred: ' + err.message);
                res.send('An error occurred!');

            } else {
                console.log('Insert operation was successful!');
                res.send('Insert operation was successful!');
            }
        }
  );
    
};

module.exports = {
    handleUserPage,
    handleCreateNewUser
}