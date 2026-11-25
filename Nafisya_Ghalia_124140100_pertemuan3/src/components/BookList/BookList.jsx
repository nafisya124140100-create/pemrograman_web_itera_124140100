import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import { bookShape } from '../../propTypes';
import './BookList.css';

export default function BookList({ books, onEdit, onDelete, emptyMessage }) {
  if (books.length === 0) {
    return (
      <p className="book-list__empty" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="book-list" aria-label="Daftar buku">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};

BookList.defaultProps = {
  emptyMessage: 'Belum ada buku yang ditampilkan.',
};