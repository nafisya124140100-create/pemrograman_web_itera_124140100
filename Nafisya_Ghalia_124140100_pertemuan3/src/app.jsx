import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Stats from './pages/Stats/Stats';
import './app.css';

const navClass = ({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`;

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__brand"> Buku Pribadi</h1>
        <nav className="app__nav">
          <NavLink to="/" end className={navClass}>
            Daftar Buku
          </NavLink>
          <NavLink to="/statistik" className={navClass}>
            Statistik
          </NavLink>
        </nav>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="app__footer">
        Tugas Pertemuan 3 — Aplikasi Manajemen Buku Pribadi
      </footer>
    </div>
  );
}