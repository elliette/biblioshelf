const express = require('express');
const router = express.Router();

const Book = require('../db').Book;
const User = require('../db').User;
const MonthRead = require('../db').MonthRead;

router.post('/books', function(req, res, next) {
    User.findOne({
        where: {
            id: req.session.userId
        }
    })
    .then(function(user){
        if (!user){
            //make a new error;
        } else {
            var date = req.body.date ? new Date(req.body.date) : new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var monthRead = MonthRead.findOrCreate({
                where: {
                    time: new Date(year, month)
                }
            });
        }
        return Promise.all([user, monthRead[0]]);
    })
    .spread(function(user, monthRead){
        var date = req.body.date ? new Date(req.body.date) : new Date(); // figure out how to consolidate this
        var book = Book.create({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            notes: req.body.notes,
            starred: req.body.starred,
            date: date,
        });
        return Promise.all([user, monthRead, book]);
    })
    .spread(function(user, monthRead, book){
        var bookWithMonth = book.setMonthRead(monthRead);
        return Promise.all([user, bookWithMonth]);
    })
    .spread(function(user, bookWithMonth){
        return bookWithMonth.setUser(user);
    })
    .then(function(bookWithUser){
        res.send(bookWithUser);
    });
});

router.put('/books', function(req, res, next) {
    var date = new Date(req.body.date);
    var year = date.getFullYear();
    var month = date.getMonth();
    MonthRead.findOrCreate({
        where: {
            time: new Date(year, month)
        }
    })
    .spread(function(monthRead){
        var book = Book.findOne({
            where: {
            id: req.body.id
            }
        });
        return Promise.all([monthRead, book]);
    })
    .spread(function(monthRead, book){
        var editedBook = book.update(req.body);
        return Promise.all([monthRead, editedBook]);
    })
    .spread(function(monthRead, editedBook){
        return editedBook.setMonthRead(monthRead);
    })
    .then(function(editedBook){
        res.send(editedBook);
    });
});

router.get('/books/:id', function(req, res){
    var id = req.params.id;
    Book.findOne({
        where: {
            id: id
        }
    })
    .then(function(book){
        res.send(book);
    });
});

router.delete('/books/:id', function(req, res){
    var id = req.params.id;
    Book.findOne({
        where: {
            id: id
        }
    })
    .then(function(book){
        book.destroy();
    })
    .then(function(){
        res.send(id);
    });
});

router.get('/books', function(req, res){
    Book.findAll({
        where: {
            userId: req.session.userId
        }
    })
    .then(function(books){
        res.send(books);
    });
});

router.get('/months', function(req, res){
    MonthRead.findAll({
        include: [{ all: true }]
    })
    .then(function(months){
        res.send(months);
    });
});

module.exports = router;