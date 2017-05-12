const express = require('express');
const auth = express.Router();
const User = require('../db').User;

auth.get('/whoami', (req, res, next) => {
    if (req.session.id){
      let userId = req.session.userId;
      res.send({id: userId});
    } else {
      res.send(null);
    }
});

auth.get('/user/:email', (req, res, next) => {
  User.findOne({
    where: {
      email: req.params.email
    }
  })
  .then( user => res.send(user));
});

auth.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
    },
    attributes: {include: ['password_digest']}
    })
    .then(user => {
        const isCorrectPW = user.authenticate(req.body.password);
        return [user, isCorrectPW];
    })
    .spread( (user, isCorrectPW) => {
        if (isCorrectPW) {
            req.session.userId = user.id;
            res.send({id: user.id});
        } else {
            res.sendStatus(401);
        }
    })
    .catch(next);
});

auth.post('/signup', (req, res) => {
  User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  })
  .then(user => res.send(user));
});

auth.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/api/auth/whoami');
});

module.exports = auth;
