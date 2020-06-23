import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Spinner from '../spinner';
import ErrorIndicatro from '../error-indicator';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks, booksAddedToCart } from '../../actions';
import { compose } from '../../utils';
import './book-list.css';

const BookList = ({ books, onAddedToCart}) => {
    return (
        <ul className="book-list">
           {
               books.map((book) => {
                   return (
                       <li key={book.id}>
                           <BookListItem 
                            book={book}
                            onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                   )
               })
            }
        </ul>
    );
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;

        if (loading) {
            return <Spinner />;
        }

        if (error) {
            return <ErrorIndicatro />;
        }


        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
}

const mapStateToProps = ({ bookList: {books, loading, error} }) => {
    return { books, loading, error };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        /*fetchBooks(bookstoreService, dispatch),*/
        onAddedToCart: booksAddedToCart
    }, dispatch);
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer); 
