const Sequelize = require('sequelize');
const db = require('../index');
const Book = require('./books');

var MonthRead = db.define('monthRead', {
	time: {
		type: Sequelize.DATE
	},
});

//MonthRead.hasMany(Book, {onDelete: 'CASCADE'});

module.exports.associations = (MonthRead, {Book}) => {
  // Create a static association between the OAuth and User models.
  // This lets us refer to OAuth.User above, when we need to create
  // a user.
	MonthRead.hasMany(Book, {onDelete: 'CASCADE'});
}

module.exports = MonthRead;
