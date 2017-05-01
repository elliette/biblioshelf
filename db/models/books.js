const Sequelize = require('sequelize');
const db = require('../index');
const User = require('./users');
const MonthRead = require('./months');

/*
================================================
			UTILITY FUNCTION
================================================
*/

const updateAndCreateChecks = function(book){
		if (!book.url) {
		var randomNum = Math.floor(Math.random() * 4) + 1;
		book.url = `https://www.mobileread.com/forums/attachment.php?attachmentid=11128${randomNum}&d=1378756884`;
	}
	if (!book.notes) {
		book.notes = 'There are no notes for this book yet.';
	}

	let date = new Date(book.date);
	let month = date.getMonth();
	let months = [
	    'January',
	    'February',
	    'March',
	    'April',
	    'May',
	    'June',
	    'July',
	    'August',
	    'September',
	    'October',
	    'November',
	    'December'
	];
	let monthStr = months[month];
	let year = date.getFullYear();
	let monthYear = `${monthStr} ${year}`;
	book.monthYear = monthYear;
};

/*
================================================
			MODEL DEFINITONS
================================================
*/

const Book = db.define('book', {
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
	date: {
		type: Sequelize.DATE
	},
	monthYear: {
		type: Sequelize.STRING
	}
}, {
	hooks: {
		beforeCreate: (book) => updateAndCreateChecks(book),
		beforeUpdate: (book) => updateAndCreateChecks(book)
	}
});

Book.belongsTo(User);
Book.belongsTo(MonthRead);

module.exports.associations = (Book, {User, MonthRead}) => {
  // Create a static association between the OAuth and User models.
  // This lets us refer to OAuth.User above, when we need to create
  // a user.
  Book.belongsTo(User);
  Book.belongsTo(MonthRead)
}

module.exports = Book;
