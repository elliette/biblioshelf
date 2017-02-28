var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/bookshelf'); 

/*
================================================
			MODEL DEFINITONS
================================================
*/ 

var MonthRead = db.define('monthRead', {

	time: {
		type: Sequelize.DATE
	},

	month: {
		type: Sequelize.STRING
	},

	year: {
		type: Sequelize.INTEGER
	}
}) 


var Book = db.define('book', {
	title: {
		type: Sequelize.STRING
	},
	author: {
		type: Sequelize.STRING
	},

	url: {
		type: Sequelize.STRING
	},

	notes: {
		type: Sequelize.TEXT, 
	},

	starred: {
		type: Sequelize.ENUM('yes', 'no')
	}, 

	date: {
		type: Sequelize.DATE
	},

}, {

	hooks: {

		beforeCreate: function(book) {
			// getting a random generic book image url 
			if (!book.url) {
				var randomNum = Math.floor(Math.random() * 4) + 1; 
				book.url = `https://www.mobileread.com/forums/attachment.php?attachmentid=11128${randomNum}&d=1378756884`
			}

			if (!book.notes) {
				book.notes = "There are no notes for this book yet."; 
			}
		}
	}
})

MonthRead.hasMany(Book, {onDelete: 'CASCADE'}); 
Book.belongsTo(MonthRead); 

module.exports = {
	db: db,
	Book: Book, 
	MonthRead: MonthRead, 
};