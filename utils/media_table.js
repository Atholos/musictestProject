'use strict';
const select = (connection, res) => {
  // simple query
  connection.query(
      'SELECT * FROM Uploadable',
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

const insert = (data, connection, res) => {
  // simple query
  connection.execute(
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
const userLogin = (connection, res) => {
  connection.query(
      'SELECT UserID, Password FROM Users;',
      (err, results, fields) => {
        console.log(fields);
        console.log(results);
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
  connection.execute(
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

module.exports = {
  select: select,
  insert: insert,
  update: update,
  del: del,
  userLogin: userLogin
};
