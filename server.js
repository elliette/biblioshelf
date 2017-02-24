var express = require('express');
var bodyParser = require('body-parser');
// var nunjucks = require('nunjucks');
var path = require('path');
var models = require('./models');
var Book = models.Book;
var MonthRead = models.MonthRead; 
var getFullMonth = models.getFullMonth; 

var app = express(); 

// var env = nunjucks.configure('views', {noCache: true});
// app.set('view engine', 'html');
// app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.get('/api/books', function(req, res){
  MonthRead.findAll({
    include: [{ all: true }]
  }) 
  .then(function(months){ 
    res.json(months); 
  })
}); 

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './views', 'index.html'));
});

app.get('/add', function(req, res){
  res.render('addPage')
}); 

app.post('/', function(req, res, next) {
  var month; 
  var year; 
  var date; 
  if (req.body.month != "N/A" && req.body.year !== "N/A" && req.body.day !== "N/A"){
    month = req.body.month; 
    year = req.body.year; 
    date = `${req.body.month} ${req.body.day}, ${req.body.year}`
  } else {
    date = new Date(); 
    month = getFullMonth(date.toString().slice(4, 7)); 
    year = date.getFullYear().toString();
    date = date.toString(); 
  }
  MonthRead.findOrCreate({
    where: {
      month: month, 
      year: year, 
      time: Date.parse(month+year)
    }
  })
  .spread(function(monthRead, created){ 
    var book = Book.create({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      notes: req.body.notes, 
      tags: req.body.tags, 
      starred: req.body.starred,
      date: date
    })
    return Promise.all([monthRead, book])
  }) 
  .spread(function(monthRead, book){
    return book.setMonthRead(monthRead)
  })
  .then(function(book){ 
    res.redirect('/');
  })
}); 
    
app.get('/book:id', function(req, res, next){
  var id = req.params.id; 
  Book.findOne({
    where: {
      id: id
    }
  })
  .then(function(book){
    res.render('book', {
        'book': book, 
      })
  })
}); 

models.db.sync({force : false})
  .then(function() {
    app.listen(3000, function() {
      console.log("Server is listening on port 3000!")
  });
}) 


