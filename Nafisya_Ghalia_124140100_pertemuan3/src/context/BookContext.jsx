import { createContext, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../constants';

const BookContext = createContext(null);

export const createBookId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `book-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalize = (list) => (Array.isArray(list) ? list : []);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, []);
  const bookList = normalize(books);

  const addBook = useCallback(
    (data) => {
      const newBook = {
        id: createBookId(),
        title: data.title.trim(),
        author: data.author.trim(),
        status: data.status,
        createdAt: new Date().toISOString(),
      };
      setBooks((prev) => [newBook, ...normalize(prev)]);
      return newBook;
    },
    [setBooks],
  );

  const updateBook = useCallback(
    (id, data) => {
      setBooks((prev) =>
        normalize(prev).map((book) =>
          book.id === id
            ? {
                ...book,
                title: data.title.trim(),
                author: data.author.trim(),
                status: data.status,
                updatedAt: new Date().toISOString(),
              }
            : book,
        ),
      );
    },
    [setBooks],
  );

  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => normalize(prev).filter((book) => book.id !== id));
    },
    [setBooks],
  );

  const value = useMemo(
    () => ({ books: bookList, addBook, updateBook, deleteBook }),
    [bookList, addBook, updateBook, deleteBook],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam <BookProvider>');
  }
  return context;
}