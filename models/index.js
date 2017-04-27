var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/bookshelf');

/*
================================================
			UTILITY FUNCTION
================================================
*/

var updateAndCreateChecks = function(book){
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

var MonthRead = db.define('monthRead', {
	time: {
		type: Sequelize.DATE
	},
});

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

MonthRead.hasMany(Book, {onDelete: 'CASCADE'});
Book.belongsTo(MonthRead);

module.exports = {
	db: db,
	Book: Book,
	MonthRead: MonthRead,
};
