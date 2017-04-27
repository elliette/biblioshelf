var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./models');

var Book = models.Book;
var MonthRead = models.MonthRead;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.post('/api/books', function(req, res, next) {
    if (req.body.date){
        var date = new Date(req.body.date);
    } else {
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth();
    MonthRead.findOrCreate({
        where: {
            time: new Date(year, month)
        }
    })
    .spread(function(monthRead){
        var book = Book.create({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            notes: req.body.notes,
            starred: req.body.starred,
            date: date,
        });
        return Promise.all([monthRead, book]);
    })
    .spread(function(monthRead, book){
        return book.setMonthRead(monthRead);
    })
    .then(function(book){
        res.send(book);
    });
});

app.put('/api/books', function(req, res, next) {
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

app.get('/api/books/:id', function(req, res){
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

app.delete('/api/books/:id', function(req, res){
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

app.get('/api/books', function(req, res){
    Book.findAll()
    .then(function(books){
        res.send(books);
    });
});

app.get('/api/months', function(req, res){
    MonthRead.findAll({
        include: [{ all: true }]
    })
    .then(function(months){
        res.send(months);
    });
});

app.get('/add', function(req, res){
    res.render('addPage');
});

models.db.sync({force: false})
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
});
