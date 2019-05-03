'use strict';
const db = require('./database');

const select = (connection, res) => {
  // simple query
  db.connect().query(
      'SELECT * FROM Uploadable',
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        if (err == null) {
          res.send(results);
        } else {
          console.log(err);
        }
      },
  );
};

const insert = (data, connection, res) => {
  // simple query
  db.connect().execute(
      'INSERT INTO Uploadable (FileID, Description, Title, Thumbnail, Image, Original, UserID, ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(data);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        if (err == null) {
          res.send(results);
        } else {
          console.log(err);
        }
      },
  );
};

const update = (data, connection, res) => {
  // simple query
  db.connect().execute(
      'UPDATE Uploadable SET Description = ?, Title = ?, WHERE FileID = ? AND UserID = ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        if (err == null) {
          res.send(results);
        } else {
          console.log(err);
        }
      },
  );
};

const del = (data, connection, res) => {
  // simple query
  connection.execute(
      'DELETE FROM Uploadable WHERE FileID = ? AND UserID = ?;', // can delete only current user's images
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        if (err == null) {
          res.send(results);
        } else {
          console.log(err);
        }
      },
  );
};

const login = (data, callback) => {
  console.log(data)
  // simple query
  db.connect().execute(
      'SELECT * FROM Users WHERE Username = ?;',
      data,
      (err, results, fields) => {
        console.log('results', results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const register = (data, next) => {
  // simple query
  //console.log(data)
  //TODO Check if user and email are available
  db.connect().execute(
      'INSERT INTO Users (UserID,Username,Email,Password,Admin) VALUES (default,?,?,?,default);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        next();
      },
  );
};

module.exports = {
  select: select,
  insert: insert,
  update: update,
  del: del,
  login: login,
  register: register,
};