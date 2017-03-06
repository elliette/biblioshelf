var express = require('express');
var bodyParser = require('body-parser');
// var nunjucks = require('nunjucks');
var path = require('path');
var models = require('./models');
var Book = models.Book;
var MonthRead = models.MonthRead; 

var app = express(); 

// var env = nunjucks.configure('views', {noCache: true});
// app.set('view engine', 'html');
// app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './node_modules')));


app.get('/api/books/:id', function(req, res){
  console.log("HITTING THIS ROUTE!!!!!!!!!!!!!!!")
  var id = req.params.id; 
  Book.findOne({
    where: {
      id: id
    }
  })
  .then(function(book){
    res.json(book); 
  })
});

app.delete('/delete/:id', function(req, res){
  console.log("hit the delete route!")
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
    res.send("Book has been deleted!")
  })
});


app.get('/api/books', function(req, res){
  console.log("hitting the books route!")
  Book.findAll() 
  .then(function(books){ 
    res.json(books); 
  })
}); 



app.get('/api/months', function(req, res){
  console.log("hitting the months route!")
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

app.post('/addbook', function(req, res, next) {

  if (req.body.date){
    var date = new Date(req.body.date)
    console.log("IF A DATE WAS SELECTED THEN DATE IS:", date); 
  } else {
    date = new Date(); 
    console.log("IF NO DATE WAS SELECTED THEN DATE IS", date); 
  }
  let month = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var monthStr = months[month];
  var year = date.getFullYear(); 
  console.log("type of year is", typeof year); 
  var monthYear = monthStr+" "+year; 

   var book = Book.create({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        notes: req.body.notes, 
        starred: req.body.starred,
        date: date, 
        monthYear: monthYear
      })
   .then(function(book){ 
    res.send(book);
  })
})

//   MonthRead.findOrCreate({
//     where: {
//       month: monthStr, 
//       year: year, 
//       time: new Date(year, month)
//     }
//   })
//   .spread(function(monthRead, created){ 
//     var book = Book.create({
//       title: req.body.title,
//       author: req.body.author,
//       url: req.body.url,
//       notes: req.body.notes, 
//       starred: req.body.starred,
//       date: date
//     })
//     return Promise.all([monthRead, book])
//   }) 
//   .spread(function(monthRead, book){
//     return book.setMonthRead(monthRead)
//   })
//   .then(function(book){ 
//     res.send(book);
//   })
// }); 

app.put('/editbook', function(req, res, next) {
  console.log("in edit!")
  var date = new Date(req.body.date)

  let month = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var monthStr = months[month];
  var year = date.getFullYear(); 

  MonthRead.findOrCreate({
    where: {
      month: monthStr, 
      year: year, 
      time: new Date(year, month)
    }
  })
  .spread(function(monthRead, created){ 
    var book = Book.findOne({
      where: {
        id: req.body.id
      }
    })
    return Promise.all([monthRead, book])
  }) 
  .spread(function(monthRead, book){
    var book = book.update(req.body); 
    return Promise.all([monthRead, book])
  }) 
  .spread(function(monthRead, book){
    return book.setMonthRead(monthRead)
  })
  .then(function(book){
    res.send(book); 
  })
}); 


models.db.sync({force : false})
  .then(function() {
    app.listen(3000, function() {
      console.log("Server is listening on port 3000!")
  });
}) 


