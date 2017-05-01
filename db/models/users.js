'use strict';

const Sequelize = require('sequelize');
const db = require('../index');
const Book = require('./books');

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs');

const User = db.define('users', {
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

module.exports.associations = (User, {Book}) => {
  User.hasMany(Book)
  //User.belongsToMany(Thing, {as: 'favorites', through: Favorite})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash));
}


module.exports = User;
