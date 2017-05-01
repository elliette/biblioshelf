'use strict';

//const database = require('./database');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
// PrettyError docs: https://www.npmjs.com/package/pretty-error
const  SESSION_SECRET = require('./secrets.js');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

  // Session middleware - compared to express-session (which is what's used in the Auther workshop), cookie-session stores sessions in a cookie, rather than some other type of session store.
  // Cookie-session docs: https://www.npmjs.com/package/cookie-session
// app.use(cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
//   }));

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

  // any requests with an extension (.js, .css, etc.) turn into 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

// app.use('/*', function(req, res, next){
//   console.log("REQ.SESSION", req.session); 
// })

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
  });

var startDb = require('./database');

startDb.sync({force: false})
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
});
