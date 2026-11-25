import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { BOOK_STATUSES, STATUS_LABELS } from '../../constants';
import './Stats.css';

export default function Stats() {
  const { books } = useBooks();
  const { total, byStatus, totalAuthors, percent } = useBookStats(books);

  return (
    <section className="stats">
      <h2 className="stats__title">Statistik Koleksi Buku</h2>
      <p className="stats__subtitle">
        Ringkasan otomatis dari seluruh buku yang kamu catat.
      </p>

      <div className="stats__grid">
        <div className="stat-card stat-card--total">
          <span className="stat-card__label">Total Buku</span>
          <span className="stat-card__value">{total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Penulis Unik</span>
          <span className="stat-card__value">{totalAuthors}</span>
        </div>
      </div>

      <div className="stats__breakdown">
        <h3>Rincian per Status</h3>
        {BOOK_STATUSES.map((status) => (
          <div className="stat-row" key={status}>
            <div className="stat-row__head">
              <span>{STATUS_LABELS[status]}</span>
              <span>
                {byStatus[status]} buku ({percent(status)}%)
              </span>
            </div>
            <div
              className="stat-row__bar"
              role="progressbar"
              aria-label={`Persentase ${STATUS_LABELS[status]}`}
              aria-valuenow={percent(status)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                className={`stat-row__fill stat-row__fill--${status}`}
                style={{ width: `${percent(status)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {total === 0 && (
        <p className="stats__empty">
          Belum ada data. <Link to="/">Tambahkan buku pertamamu</Link>.
        </p>
      )}
    </section>
  );
}