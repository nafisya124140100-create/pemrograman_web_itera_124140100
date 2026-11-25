import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

const books = [
  { id: '1', title: 'A', author: 'Fadilla', status: 'milik' },
  { id: '2', title: 'B', author: 'Fadilla', status: 'milik' },
  { id: '3', title: 'C', author: 'Niken', status: 'baca' },
  { id: '4', title: 'D', author: 'Olivia', status: 'beli' },
];

describe('useBookStats', () => {
  it('menghitung total, jumlah per status, dan penulis unik', () => {
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current.total).toBe(4);
    expect(result.current.byStatus).toEqual({ milik: 2, baca: 1, beli: 1 });
    expect(result.current.totalAuthors).toBe(3);
    expect(result.current.percent('milik')).toBe(50);
  });

  it('mengembalikan nol saat daftar buku kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.byStatus.milik).toBe(0);
    expect(result.current.percent('baca')).toBe(0);
  });
});