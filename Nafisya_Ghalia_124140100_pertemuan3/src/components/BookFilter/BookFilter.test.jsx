import { fireEvent, render, screen } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('BookFilter', () => {
  it('memanggil onSearchChange saat pengguna mengetik', () => {
    const onSearchChange = vi.fn();
    render(
      <BookFilter
        search=""
        onSearchChange={onSearchChange}
        status="semua"
        onStatusChange={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/cari buku/i), {
      target: { value: 'fadilla' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('fadilla');
  });
});