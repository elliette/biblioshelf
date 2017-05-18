const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
var Promise = require('bluebird');

const Book = require('../db').Book;
const User = require('../db').User;

function findBookPromise(userId, bookId){
    return User.findOne({
        where: {
            id: userId
        }
    })
    .then(function(user){
        return Book.findOne({
            where: {
                id: bookId,
                userId: user.id
            },
            include: [{all: true}]
        });
    });
}

router.post('/books', function(req, res, next) {
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var date = req.body.date ? new Date(req.body.date) : new Date();
    Promise.all([
        User.findOne({
            where: {
                id: userId
            }
        }),
        Book.create({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            notes: req.body.notes,
            starred: req.body.starred,
            toRead: req.body.toRead,
            date: date,
        })
    ])
    .spread(function(foundUser, createdBook){
        return createdBook.setUser(foundUser);
    })
    .then(function(bookWithUser){
        res.send(bookWithUser);
    })
    .catch(next);
});

router.put('/books/:id', function(req, res, next){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var bookId = req.params.id;
    findBookPromise(userId, bookId)
    .then(function(book){
        book.update(req.body);
    })
    .then(function(editedBook){
        res.send(editedBook);
    })
    .catch(next);
});

router.get('/books/search/:query', function(req, res, next){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var query = req.params.query.toLowerCase();
    User.findOne({
        where: {
            id: userId
        }
    })
    .then(function(user){
        return Book.findAll({
            where: {
                userId: user.id,
                $or: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')),
                        {
                            $like: `%${query}%`
                        }
                    ),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col('author')),
                        {
                            $like: `%${query}%`
                        }
                    ),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col('notes')),
                        {
                            $like: `%${query}%`
                        }
                    )
                ]
            },
            include: [{all: true}]
        });
    })
    .then(books => res.json(books))
    .catch(next);
});

router.get('/books/:id', function(req, res, next){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var bookId = req.params.id;
    findBookPromise(userId, bookId)
    .then(function(book){
        res.send(book);
    })
    .catch(next);
});

router.delete('/books/:id', function(req, res, next){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var bookId = req.params.id;
    findBookPromise(userId, bookId)
    .then(function(book){
        book.destroy();
    })
    .then(function(){
        res.send(bookId);
    })
    .catch(next);
});

router.get('/books', function(req, res, next){
    if (!req.session.userId) return;
    User.findOne({
        where: {
            id: req.session.userId
        }
    })
    .then(function(user){
        Book.findAll({
            where: {
                userId: user.id
            },
            include: [{all: true}]
        })
        .then(function(books){
            res.send(books);
        });
    })
    .catch(next);
});

module.exports = router;
