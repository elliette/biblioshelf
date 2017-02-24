var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/bookshelf')

/*
================================================
			HELPER FUNCTIONS
================================================
*/ 

var getFullMonth = function(month) {

	switch (month) {
		case "Jan":
			return "January"
			break;
		case "Feb":
			return "February"
			break;
		case "Mar":
			return "March"
			break;
		case "Apr":
			return "April"
			break;
		case "May":
			return "May"
			break;
		case "Jun":
			return "June"
			break;
		case "Jul":
			return "July"
			break;
		case "Aug":
			return "August"
			break;
		case "Sep":
			return "September"
			break;
		case "Oct":
			return "October"
			break;
		case "Nov":
			return "November"
			break;
		case "Dec":
			return "December"
			break;
	}
}

/*
================================================
			MODEL DEFINITONS
================================================
*/ 

var MonthRead = db.define('monthRead', {

	time: {
		type: Sequelize.BIGINT
	},

	month: {
		type: Sequelize.STRING
	},

	year: {
		type: Sequelize.STRING
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
		type: Sequelize.TEXT
	},

	starred: {
		type: Sequelize.ENUM('yes', 'no')
	}, 

	tags: {
		type: Sequelize.TEXT
	}, 

	date: {
		type: Sequelize.STRING
	},

}, {

	hooks: {

		beforeCreate: function(book) {
			// getting generic book image url 
			if (!book.url) {
				book.url = "https://www.mobileread.com/forums/attachment.php?attachmentid=111281&d=1378756884"
			}
		}
	},
})

MonthRead.hasMany(Book); 
Book.belongsTo(MonthRead); 

module.exports = {
	db: db,
	Book: Book, 
	MonthRead: MonthRead, 
	getFullMonth: getFullMonth, 
};