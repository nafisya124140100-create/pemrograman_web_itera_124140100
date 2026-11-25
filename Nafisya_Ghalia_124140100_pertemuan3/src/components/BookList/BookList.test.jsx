import { fireEvent, render, screen } from '@testing-library/react';
import BookList from './BookList';

const book = {
  id: '1',
  title: 'Bumi Manusia',
  author: 'Pramoedya Ananta Toer',
  status: 'milik',
};

describe('BookList', () => {
  it('menampilkan pesan kosong jika tidak ada buku', () => {
    render(
      <BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} emptyMessage="Belum ada buku." />,
    );
    expect(screen.getByText('Belum ada buku.')).toBeInTheDocument();
  });

  it('menampilkan judul, penulis, dan status buku', () => {
    render(<BookList books={[book]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.getByText('Pramoedya Ananta Toer')).toBeInTheDocument();
    expect(screen.getByText('Milik')).toBeInTheDocument();
  });

  it('memanggil onDelete setelah pengguna mengonfirmasi', () => {
    const onDelete = vi.fn();
    render(<BookList books={[book]} onEdit={vi.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole('button', { name: /hapus buku Bumi Manusia/i }));
    fireEvent.click(screen.getByRole('button', { name: /konfirmasi hapus Bumi Manusia/i }));

    expect(onDelete).toHaveBeenCalledWith(book);
  });
});