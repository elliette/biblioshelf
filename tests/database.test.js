const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
const chaiProperties = require('chai-properties');
chai.use(chaiThings);
chai.use(chaiProperties);
const models = require('../db');
const db = models.db;
const User = models.User;
const Book = models.Book;

describe('~~~~MODEL TESTS~~~~', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));
    after('Synchronize and clear database', () => db.sync({force: true}));

    describe('The user model', () => {

		describe(' has an authenticate instance method', () => {

			it('that returns true if the password matches', () => {
				User.create({ password: 'ok' })
				.then(user => user.authenticate('ok'))
				.then(result => expect(result).to.be.true);
			});

			it('that returns false if the password does not match', () => {
				User.create({ password: 'ok' })
				.then(user => user.authenticate('not ok'))
				.then(result => expect(result).to.be.false);
			});
		});
	});

	describe('The book model', () => {

        it('has the expected schema', () => {

            expect(Book.attributes.title).to.be.an('object');
            expect(Book.attributes.author).to.be.an('object');
            expect(Book.attributes.url).to.be.an('object');
            expect(Book.attributes.notes).to.be.an('object');
            expect(Book.attributes.starred).to.be.an('object');
            expect(Book.attributes.toRead).to.be.an('object');
            expect(Book.attributes.date).to.be.an('object');
        });
	});
});
