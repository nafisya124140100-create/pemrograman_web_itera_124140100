import PropTypes from 'prop-types';
import { ALL_STATUS, BOOK_STATUSES, STATUS_LABELS } from '../../constants';
import './BookFilter.css';

export default function BookFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  counts,
}) {
  return (
    <div className="book-filter">
      <div className="book-filter__search">
        <label htmlFor="book-search">Cari buku</label>
        <input
          id="book-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau nama penulis..."
        />
      </div>

      <div
        className="book-filter__status"
        role="group"
        aria-label="Filter status buku"
      >
        <button
          type="button"
          className={`chip${status === ALL_STATUS ? ' chip--active' : ''}`}
          aria-pressed={status === ALL_STATUS}
          onClick={() => onStatusChange(ALL_STATUS)}
        >
          Semua{counts ? ` (${counts[ALL_STATUS] ?? 0})` : ''}
        </button>

        {BOOK_STATUSES.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip${status === item ? ' chip--active' : ''}`}
            aria-pressed={status === item}
            onClick={() => onStatusChange(item)}
          >
            {STATUS_LABELS[item]}
            {counts ? ` (${counts[item] ?? 0})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  counts: PropTypes.objectOf(PropTypes.number),
};

BookFilter.defaultProps = {
  counts: null,
};