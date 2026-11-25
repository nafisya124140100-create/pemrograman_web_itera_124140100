import { useMemo } from 'react';
import { BOOK_STATUSES } from '../constants';

// Hook untuk menghitung ringkasan statistik koleksi buku.
export default function useBookStats(books = []) {
  return useMemo(() => {
    const list = Array.isArray(books) ? books : [];

    const byStatus = BOOK_STATUSES.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    list.forEach((book) => {
      if (book && byStatus[book.status] !== undefined) {
        byStatus[book.status] += 1;
      }
    });

    const authors = new Set(
      list
        .map((book) => (book?.author || '').trim().toLowerCase())
        .filter(Boolean),
    );

    const total = list.length;

    const percent = (status) =>
      total === 0 ? 0 : Math.round((byStatus[status] / total) * 100);

    return { total, byStatus, totalAuthors: authors.size, percent };
  }, [books]);
}