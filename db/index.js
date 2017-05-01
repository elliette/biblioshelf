const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/bookshelf');
const bcrypt = require('bcryptjs');

/*
================================================
			UTILITY FUNCTIONS
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

const MonthRead = db.define('monthRead', {
	time: {
		type: Sequelize.DATE
	},
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
Book.belongsTo(MonthRead);
MonthRead.hasMany(Book, {onDelete: 'CASCADE'});
User.hasMany(Book);

module.exports = {db, Book, MonthRead, User};





// // 'use strict';
// // const db = require('./db');
// // const chalk = require('chalk');

// // // Require our models. Running each module registers the model into sequelize
// // // so any other part of the application can simply call sequelize.model('User')
// // // to get access to the User model.
// // require('./models');

// // // Syncing all the models at once. This promise is used by main.js.
// // var syncedDbPromise = db.sync();

// // syncedDbPromise.then(function () {
// //   console.log(chalk.green('Sequelize models synced to PostgreSQL'));
// // });

// // module.exports = syncedDbPromise;

// 'use strict'

// const app = {isTesting: false}; // should go back and change this
// const Sequelize = require('sequelize');
// const chalk = require('chalk');
// const debug = require('debug')('bookshelf:db');

// // const app = require('APP')
// //     , debug = require('debug')(`${app.name}:db`) // DEBUG=your_app_name:db
// //     , chalk = require('chalk')
// //     , Sequelize = require('sequelize')

// //     , name = (app.env.DATABASE_NAME || app.name) +
// //              (app.isTesting ? '_test' : '')
// //     , url = app.env.DATABASE_URL || `postgres://localhost:5432/${name}`

// // debug(chalk.yellow(`Opening database connection to ${url}`))

// const db = module.exports = new Sequelize('postgres://localhost:5432/bookshelf');
// //   logging: require('debug')('sql'),  // export DEBUG=sql in the environment to
// //                                      // get SQL queries
// //   define: {
// //     underscored: true,       // use snake_case rather than camelCase column names.
// //                              // these are easier to work with in psql.
// //     freezeTableName: true,   // don't change table names from the one specified
// //     timestamps: true,        // automatically include timestamp columns
// //   }
// // })

// // Initialize all our models and assign them as properties
// // on the database object.
// //
// // This lets us use destructuring to get at them like so:
// //
// //   const {User, Product} = require('APP/db')
// //
// Object.assign(db, require('./models')(db),
//   // We'll also make createAndSync available. It's sometimes useful in tests.
//   {createAndSync})

// // After defining all the models, sync the database.
// // Notice that didSync *is* a Promise, rather than being a function that returns
// // a Promise. It holds the state of this initial sync.
// db.didSync = db.createAndSync()

// // sync the db, creating it if necessary
// function createAndSync(force=app.isTesting, retries=0, maxRetries=5) {
//   return db.sync({force})
//     .then(() => debug(`Synced models to db ${url}`))
//     .catch(fail => {
//       // Don't do this auto-create nonsense in prod, or
//       // if we've retried too many times.
//       if (app.isProduction || retries > maxRetries) {
//         console.error(chalk.red(`********** database error ***********`))
//         console.error(chalk.red(`    Couldn't connect to ${url}`))
//         console.error()
//         console.error(chalk.red(fail))
//         console.error(chalk.red(`*************************************`))
//         return
//       }
//       // Otherwise, do this autocreate nonsense
//       debug(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
//       return new Promise(resolve =>
//         // 'child_process.exec' docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
//         require('child_process').exec(`createdb "${name}"`, resolve)
//       ).then(() => createAndSync(true, retries + 1))
//     })
// }