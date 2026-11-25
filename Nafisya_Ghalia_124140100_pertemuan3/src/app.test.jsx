import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';
import { BookProvider } from './context/BookContext';

function renderApp(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <BookProvider>
        <App />
      </BookProvider>
    </MemoryRouter>,
  );
}

describe('Aplikasi', () => {
  it('menambahkan buku baru dan menyimpannya ke localStorage', async () => {
    renderApp();

    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: 'Laskar Pelangi' },
    });
    fireEvent.change(screen.getByLabelText(/nama penulis/i), {
      target: { value: 'Andrea Hirata' },
    });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('buku-pribadi'));
      expect(stored).toHaveLength(1);
      expect(stored[0]).toMatchObject({
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        status: 'milik',
      });
    });
  });

  it('menampilkan halaman statistik saat menu Statistik diklik', () => {
    renderApp();

    fireEvent.click(screen.getByRole('link', { name: /statistik/i }));

    expect(
      screen.getByRole('heading', { name: /statistik koleksi buku/i }),
    ).toBeInTheDocument();
  });
});