const express = require('express');
const auth = express.Router();
const User = require('../db').User;

auth.get('/whoami', (req, res) => {
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
    .then( user => res.send(user))
    .catch(next);
});

auth.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
        attributes: {include: ['password_digest']}
    })
    .then(user => {
        if (!user) throw new Error('Email not found.');
        const isCorrectPW = user.authenticate(req.body.password);
        return [user, isCorrectPW];
    })
    .spread( (user, isCorrectPW) => {
        if (isCorrectPW) {
            req.session.userId = user.id;
            res.send({id: user.id});
        } else {
            throw new Error('Incorrect password.');
        }
    })
    .catch(next);
});

auth.post('/signup', (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => res.send(user))
    .catch(next);
});

auth.post('/logout', (req, res, next) => {
  req.session.destroy()
  .then( () => res.redirect('/api/auth/whoami'))
  .catch(next);
});

module.exports = auth;
