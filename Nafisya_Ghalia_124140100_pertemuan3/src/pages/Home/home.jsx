import { useEffect, useMemo, useState } from 'react';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import { ALL_STATUS } from '../../constants';
import './Home.css';

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(ALL_STATUS);
  const [editingBook, setEditingBook] = useState(null);
  const [feedback, setFeedback] = useState('');

  const counts = useMemo(() => {
    const result = { semua: books.length, milik: 0, baca: 0, beli: 0 };
    books.forEach((book) => {
      if (result[book.status] !== undefined) result[book.status] += 1;
    });
    return result;
  }, [books]);

  const visibleBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return books.filter((book) => {
      const matchStatus =
        statusFilter === ALL_STATUS || book.status === statusFilter;
      const matchKeyword =
        keyword === '' ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);
      return matchStatus && matchKeyword;
    });
  }, [books, search, statusFilter]);

  // Feedback otomatis hilang setelah 3 detik
  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(''), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
      setFeedback(`Buku "${data.title}" berhasil diperbarui.`);
      return;
    }
    addBook(data);
    setFeedback(`Buku "${data.title}" berhasil ditambahkan.`);
  };

  const handleDelete = (book) => {
    deleteBook(book.id);
    if (editingBook && editingBook.id === book.id) setEditingBook(null);
    setFeedback(`Buku "${book.title}" telah dihapus.`);
  };

  const emptyMessage =
    books.length === 0
      ? 'Belum ada buku. Tambahkan buku pertamamu lewat formulir di samping.'
      : 'Tidak ada buku yang cocok dengan pencarian / filter yang dipilih.';

  return (
    <div className="home">
      {feedback && (
        <p className="home__feedback" role="status">
          {feedback}
        </p>
      )}

      <div className="home__layout">
        <aside className="home__aside">
          <BookForm
            initialBook={editingBook}
            onSubmit={handleSubmit}
            onCancel={() => setEditingBook(null)}
          />
        </aside>

        <section className="home__content">
          <BookFilter
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            counts={counts}
          />
          <BookList
            books={visibleBooks}
            onEdit={setEditingBook}
            onDelete={handleDelete}
            emptyMessage={emptyMessage}
          />
        </section>
      </div>
    </div>
  );
}