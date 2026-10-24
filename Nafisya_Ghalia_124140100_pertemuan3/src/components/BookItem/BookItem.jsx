import { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../constants';
import { bookShape } from '../../propTypes';
import './BookItem.css';

export default function BookItem({ book, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <li className="book-item">
      <div className="book-item__info">
        <h3 className="book-item__title">{book.title}</h3>
        <p className="book-item__author">{book.author}</p>
        <span className={`badge badge--${book.status}`}>
          {STATUS_LABELS[book.status] ?? book.status}
        </span>
      </div>

      {confirming ? (
        <div className="book-item__actions">
          <span className="book-item__confirm-text">Hapus buku ini?</span>
          <button
            type="button"
            className="btn btn--danger"
            aria-label={`Konfirmasi hapus ${book.title}`}
            onClick={() => onDelete(book)}
          >
            Ya
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setConfirming(false)}
          >
            Batal
          </button>
        </div>
      ) : (
        <div className="book-item__actions">
          <button
            type="button"
            className="btn btn--ghost"
            aria-label={`Edit buku ${book.title}`}
            onClick={() => onEdit(book)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn--danger-outline"
            aria-label={`Hapus buku ${book.title}`}
            onClick={() => setConfirming(true)}
          >
            Hapus
          </button>
        </div>
      )}
    </li>
  );
}

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};