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
import AddBookForm from '../browser/components/AddBookForm';
import store from '../browser/store';

describe('~~~~REACT TESTS~~~', () => {

	describe('<AddBookForm />', () => {
        var AddBookFormWrapper;
        var props;
        beforeEach('Create <AddBookForm /> wrapper', () => {
            AddBookFormWrapper = shallow(<AddBookForm store={store} />);
            props = AddBookFormWrapper.props();
        });

        it('the connect function provides <AddBookForm /> with props', () => {
                expect(props).to.be.an('object');
            });

        describe('props', () => {
            it('has the function addBookToDB', () => {
                expect(props.addBookToDB).to.be.a('function');
            });
        });
    });
});
