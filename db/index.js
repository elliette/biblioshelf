const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/bookshelf');
const bcrypt = require('bcryptjs');

/*
================================================
			UTILITY FUNCTIONS
================================================
*/

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash));
}

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
    toRead: {
        type: Sequelize.ENUM('yes', 'no')
    },
	date: {
		type: Sequelize.DATE
	}
});

const User = db.define('user', {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
    password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
    indexes: [{fields: ['email'], unique: true}],
    hooks: {
        beforeCreate: setEmailAndPassword,
        beforeUpdate: setEmailAndPassword,
    },
    defaultScope: {
        attributes: {exclude: ['password_digest']}
    },
    instanceMethods: {
        // This method is a Promisified bcrypt.compare
        authenticate(plaintext) {
            return bcrypt.compare(plaintext, this.password_digest);
        }
    }
});

/*
================================================
			ASSOCIATIONS
================================================
*/

Book.belongsTo(User);
User.hasMany(Book, {onDelete: 'CASCADE'});

module.exports = {db, Book, User};
