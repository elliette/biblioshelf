const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');
const models = require('../db');
const db = models.db;
const User = models.User;

const ada = {
    name: 'Ada Lovelace',
    email: 'ada.lovelace@testing.org',
    password: '12345678'
};

describe('~~~~AUTH TESTS ~~~~', () => {
    beforeEach('Synchronize and clear database', () => db.sync({force: true}));
    after('Synchronize and clear database', () => db.sync({force: true}));

    beforeEach('create a user', () => User.create(ada));

    describe('POST /api/auth/login (email, password)', () => {
        it('succeeds with a valid username and password', () =>
            request(app)
            .post('/api/auth/login')
            .send({
                email: ada.email,
                password: ada.password
            })
            .expect(200)
            .then(res => {
                return User.findById(res.body.id);
            })
            .then(user => {
                expect(user.name === 'Ada Lovelace');
            })
        );
    });
});

    //"test": "mocha --compilers js:babel-register --watch-extensions js,jsx browser/**/*.test.js routes/**/*.test.js db/**/*.test.js",