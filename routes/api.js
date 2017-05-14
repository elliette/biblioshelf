const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
var Promise = require('bluebird');

const Book = require('../db').Book;
const User = require('../db').User;
//const MonthRead = require('../db').MonthRead;

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

// function findUserAndMonth(userId, date){
//     return User.findOne({
//         where: {
//             id: userId
//         }
//     })
//     .then(function(user){
//         var year = date.getFullYear();
//         var month = date.getMonth();
//         var monthRead = MonthRead.findOrCreate({
//             where: {
//                 time: new Date(year, month)
//             }
//         });
//         return Promise.all([user, monthRead[0]]);
//     });
// }

router.post('/books', function(req, res, next) {
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var date = req.body.date ? new Date(req.body.date) : new Date();
    //findUserAndMonth(userId, date)
    // var user = User.findOne({
    //     where: {
    //         id: userId
    //     }
    // });
    // var book = Book.create({
    //         title: req.body.title,
    //         author: req.body.author,
    //         url: req.body.url,
    //         notes: req.body.notes,
    //         starred: req.body.starred,
    //         date: date,
    // });
    
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
            date: date,
        })
    ])
    .spread(function(foundUser, createdBook){
        return createdBook.setUser(foundUser);
    })
    .then(function(bookWithUser){
        res.send(bookWithUser);
    });
});

router.put('/books', function(req, res, next) {
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var date = req.body.date ? new Date(req.body.date) : new Date();
    findUserAndMonth(userId, date)
    .spread(function(user, monthRead){
        var book = Book.findOne({
            where: {
                id: req.body.id,
                userId: user.id
            },
            include: [{all: true}]
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


router.get('/books/search/:query', function(req, res){
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
    .then(books => res.json(books));
});

router.get('/books/:id', function(req, res){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var bookId = req.params.id;
    findBookPromise(userId, bookId)
    .then(function(book){
        res.send(book);
    });
});

router.delete('/books/:id', function(req, res){
    if (!req.session.userId) return;
    var userId = req.session.userId;
    var bookId = req.params.id;
    findBookPromise(userId, bookId)
    .then(function(book){
        book.destroy();
    })
    .then(function(){
        res.send(bookId);
    });
});

router.get('/books', function(req, res){
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
    });
});

// router.get('/months', function(req, res){
//     MonthRead.findAll({
//         include: [{ all: true }]
//     })
//     .then(function(months){
//         res.send(months);
//     });
// });

module.exports = router;
