import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BOOK_STATUSES, STATUS_LABELS } from '../../constants';
import { bookShape } from '../../propTypes';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

export function validateBookForm(values) {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'Judul buku wajib diisi.';
  } else if (values.title.trim().length < 2) {
    errors.title = 'Judul buku minimal 2 karakter.';
  }

  if (!values.author || !values.author.trim()) {
    errors.author = 'Nama penulis wajib diisi.';
  }

  if (!BOOK_STATUSES.includes(values.status)) {
    errors.status = 'Pilih salah satu status buku.';
  }

  return errors;
}

export default function BookForm({ initialBook, onSubmit, onCancel }) {
  const isEditing = Boolean(initialBook);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialBook) {
      setValues({
        title: initialBook.title,
        author: initialBook.author,
        status: initialBook.status,
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setErrors({});
  }, [initialBook]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // hapus pesan error pada field yang sedang diperbaiki
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateBookForm(values);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      status: values.status,
    });

    if (!isEditing) {
      setValues(EMPTY_FORM);
      setErrors({});
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="book-form__title">
        {isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h2>

      <div className={`form-field${errors.title ? ' form-field--error' : ''}`}>
        <label htmlFor="book-title">
          Judul Buku <span className="required">*</span>
        </label>
        <input
          id="book-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          placeholder="Contoh: Bumi Manusia"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'book-title-error' : undefined}
        />
        {errors.title && (
          <p className="form-error" id="book-title-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className={`form-field${errors.author ? ' form-field--error' : ''}`}>
        <label htmlFor="book-author">
          Nama Penulis <span className="required">*</span>
        </label>
        <input
          id="book-author"
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange}
          placeholder="Contoh: Pramoedya Ananta Toer"
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'book-author-error' : undefined}
        />
        {errors.author && (
          <p className="form-error" id="book-author-error" role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div className={`form-field${errors.status ? ' form-field--error' : ''}`}>
        <label htmlFor="book-status">
          Status Buku <span className="required">*</span>
        </label>
        <select
          id="book-status"
          name="status"
          value={values.status}
          onChange={handleChange}
          aria-invalid={Boolean(errors.status)}
          aria-describedby={errors.status ? 'book-status-error' : undefined}
        >
          {BOOK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="form-error" id="book-status-error" role="alert">
            {errors.status}
          </p>
        )}
      </div>

      <div className="book-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialBook: bookShape,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

BookForm.defaultProps = {
  initialBook: null,
  onCancel: () => {},
};