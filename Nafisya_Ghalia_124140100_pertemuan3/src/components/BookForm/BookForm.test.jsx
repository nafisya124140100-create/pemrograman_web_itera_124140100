import { fireEvent, render, screen } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm', () => {
  it('menampilkan pesan error saat kolom wajib dikosongkan', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data yang sudah di-trim', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: '  Bumi Manusia  ' },
    });
    fireEvent.change(screen.getByLabelText(/nama penulis/i), {
      target: { value: 'Pramoedya Ananta Toer' },
    });
    fireEvent.change(screen.getByLabelText(/status buku/i), {
      target: { value: 'baca' },
    });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'baca',
    });
  });
});