const React = require('react');
const chai = require('chai');
const expect = chai.expect;
const chaiEnzyme = require('chai-enzyme');
const chaiThings = require('chai-things');
const chaiProperties = require('chai-properties');
chai.use(chaiThings);
chai.use(chaiProperties);
chai.use(chaiEnzyme());
const enzyme = require('enzyme');
const shallow = enzyme.shallow;
//const sinon = require('sinon');
//const spy = sinon.spy;
//const faker = require('faker');
const AddBookForm = require('../browser/components/AddBookForm');

describe('~~~~REACT TESTS~~~', () => {

	describe('AddBookForm Component', () => {

		var AddBookFormWrapper;
        beforeEach('Create <AddBookForm /> wrapper', () => {
            AddBookFormWrapper = shallow(<AddBookForm />);
            console.log(AddBookFormWrapper);
        });

        it('has props ', () => {
        	console.log('PROPS ARE', AddBookFormWrapper.props);
				expect(AddBookFormWrapper);
			});
    });
});
