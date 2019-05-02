const errors = [];
const form = document.getElementById('registeration');
//const mysql = require('mysql');
//const db = require('utils/database');
const mysql = require('mysql2');
require('dotenv').config();

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};
const connection = connect();


const validateForm = (event) => {
  let password = document.getElementById('password').value;
  let confirm_password = document.getElementById('confpwd').value;
  const validPasswordString = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
 // const connection = db.connect();


  //TODO QUERY SQL IF USER NAME EXISTS
  const userQuery = (connection) => {
    connection.query(
        `SELECT Username FROM Users WHERE ${username} = Username`,
        (err, results, fields) => {
          console.log(results);
          if (results === null) {
            console.log('User available');
            return true
          } else {
            console.log('Username taken');
            return false
          }
        },
    );
  };
  if (userQuery(connection)===true){
    console.log("Good so far")
  } else if(userQuery(connection)===false){
    errors.push('Username is taken')
  }

  //TODO QUERY SQL IF EMAIL TAKEN
  const emailQuery = () => {

  };

  //Checking if password is over 8 char, has 1 digit, 1 capital letter in it
  if (password.match(validPasswordString)) {
  } else {
    errors.push(
        'Password needs to be 9 characters long, has to have 1 digit and 1 capital letter');
  }
  //Checking if both password fields match
  if (password !== confirm_password) {
    errors.push('Passwords dont match');

  }
  if (errors.length !== 0) {
    const error = errors.join('\r\n');
    event.preventDefault();
    alert(error);
    errors.length = 0;

  } else if (errors.length === 0) {
    alert('Form sent');
  }

};

form.addEventListener('submit', validateForm);
