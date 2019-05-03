const express = require('express');
require('dotenv').config();
const mediaTable = require('./utils/media_table');
const multer = require('multer');
const db = require('./utils/database');
const bodyParser = require('body-parser');
const pass = require('./utils/pass');
const session = require('express-session');
const passport = require('passport');
const exif = require('./utils/exif');
const resize = require('./utils/resize');

const app = express();

const upload = multer({dest: 'public/uploads/'});

app.use(session({
  secret: 'keyboard LOL cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// tietokantayhteys
const connection = db.connect();

app.use(express.static('public'));

app.use('/modules', express.static('node_modules'));

app.get('/all', (req, res) => {
  mediaTable.select(connection, res);
  // res.send(200);
});



app.post('/image', upload.single('my-image'), (req, res, next) => {
  // req body comes now from multer
  next();
  const response = {
  message: 'File uploaded',
  file: req.file,
  };
  res.send(response);
  console.log(response)

});

app.use('/image', (req, res, next) => {
  // tee pieni thumbnail
  resize.doResize(req.file.path, 300, './public/thumbs/thumb_' + req.file.filename).
      then(data => {
        next();
      });

});

// get coordinates
app.use('/image', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  }).catch(() => {
    console.log('No coordinates');
    req.coordinates = {};
    next();
  });
});
app.use('/image', (req, res, next) => {
  // lisää kuvan tiedot tietokantaan
  const data = [
    req.file.filename,
    req.body.Description,
    req.body.Title,
    'thumbs/thumb_' + req.file.filename,
    'uploads/' + req.file.filename,
    'uploads/' + req.file.filename,
    1,
    1, // dummy userID
  ];
  mediaTable.insert(data, connection, res);
});
// update image
app.patch('/update', (req, res) => {
  // req body comes now from body-parser
  console.log('body', req.body);
  // add dummy userID to req.body
  req.body.push(1);
  console.log('new body', req.body);
  // use req.body as data
  mediaTable.update(req.body, connection, res);
});


// delete image
app.delete('/del/:FileID', (req, res) => {
  const data = [
    req.params.FileID,
    1, // dummy userID
  ];
  mediaTable.del(data, connection, res);
});


// authentication with custom callback (http://www.passportjs.org/docs/authenticate/)
app.post('/login', pass.login);

// register new user, automatically login
app.post('/register', pass.register, pass.login);

app.listen(3000);