'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const  SESSION_SECRET = require('./secrets.js');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: SESSION_SECRET || 'an insecure secret key', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//   // Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
  });

var db = require('./db').db;

db.sync({force: false})
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
});
