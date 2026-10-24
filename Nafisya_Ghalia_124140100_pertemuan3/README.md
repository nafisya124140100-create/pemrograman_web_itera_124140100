# 📚 Aplikasi Manajemen Buku Pribadi

- **Aplikasi Manajemen Buku Pribadi** adalah aplikasi berbasis web yang dibangun menggunakan **React JS** dan **Vite**. Aplikasi ini dirancang untuk membantu pengguna mencatat, mengelola, dan memantau koleksi buku pribadi mereka. 
- **Tujuan Pembuatan**: Mengimplementasikan konsep *State Management* (Context API), *Custom Hooks*, *Routing*, dan *Unit Testing* dalam sebuah studi kasus nyata yang berguna.
- **Studi Kasus**: Pengelolaan perpustakaan pribadi untuk membedakan buku yang sudah dimiliki (Milik), sedang dibaca (Baca), dan daftar keinginan (Beli).

---

## Identitas
- **Nama Lengkap**: Nafisya Ghalia
- **NIM**: 124140100
- **Kelas Praktikum**: RB

---


## Fitur Utama
- [x] **CRUD Buku (Create, Read, Update, Delete)**: Menambah, mengedit, dan menghapus data buku (Judul, Penulis, Status).
- [x] **Filter & Pencarian**: Menyaring buku berdasarkan status, serta mencari buku secara *real-time* berdasarkan judul atau nama penulis.
- [x] **Penyimpanan Persisten (LocalStorage)**: Data buku tidak akan hilang meskipun halaman di-refresh.
- [x] **Halaman Statistik**: Menampilkan ringkasan (Dashboard) total buku, penulis unik, dan persentase buku per status.
- [x] **Validasi Form Input**: Error handling dengan feedback visual (border merah & pesan error) jika kolom wajib tidak diisi.
- [x] **Konfirmasi Hapus**: Mencegah penghapusan buku secara tidak sengaja.

---

## Panduan Menjalankan Aplikasi
Pastikan **Node.js** sudah terinstal di komputer Anda.

1. **Buka Terminal** di dalam folder proyek (`Nafisya_Ghalia_124140100_pertemuan3`).
2. **Install Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses **`http://localhost:5173/`**.

**Menjalankan Unit Test (Vitest):**
```bash
npm test
```

---

## Tangkapan Layar (Screenshot)
1. **Tampilan Utama (Form & Daftar Buku)**  
   ![Tampilan Halaman Utama](<img width="1277" height="662" alt="image" src="https://github.com/user-attachments/assets/fa5166f9-5daa-47d1-aa98-69d8923d8c1e" />)

2. **Tampilan Statistik Buku**  
   ![Tampilan Statistik](<img width="897" height="702" alt="image" src="https://github.com/user-attachments/assets/143de6fd-5e00-4fea-aa13-2d141633ea43" />
)

3. **Tampilan Validasi Error**  
   ![Tampilan Validasi Error](<img width="902" height="672" alt="image" src="https://github.com/user-attachments/assets/235b1e7f-9cad-4891-94f2-935d08855e9e" />)

4. **Hasil Unit Testing (Vitest & RTL)**  
   ![Hasil Test](<img width="793" height="426" alt="image" src="https://github.com/user-attachments/assets/f8de891c-3d6f-44fd-aea9-6956fcbbb9fc" />)

---

## Penjelasan Teknis Singkat

### 1. Penerapan Konsep React (Hooks & Context)
- **Context API**: Digunakan pada `context/BookContext.jsx` untuk mengelola *state* `books` secara global, sehingga komponen seperti `Home` dan `Stats` dapat mengakses data yang sama tanpa *props drilling*.
- **Custom Hooks**: 
  - `useLocalStorage`: Mengotomatisasi sinkronisasi state React dengan `localStorage` browser.
  - `useBookStats`: Mengekstrak logika perhitungan statistik (persentase & total) agar komponen `Stats` lebih bersih.
- **React Router**: Diimplementasikan pada `App.jsx` untuk navigasi antar halaman (`/` untuk Daftar Buku dan `/statistik` untuk Dashboard Statistik).

### 2. Penanganan Validasi Input (Error Handling)
Validasi dilakukan di komponen `BookForm.jsx` melalui fungsi `validateBookForm()`. Saat form disubmit, sistem akan mengecek apakah Judul dan Penulis kosong. Jika kosong, state `errors` akan diperbarui, memicu munculnya teks peringatan merah (`role="alert"`) dan atribut `aria-invalid` pada input.

### 3. Unit Testing (Vitest & RTL)
Aplikasi ini dilengkapi dengan **8 unit test** menggunakan Vitest dan React Testing Library (RTL) untuk memastikan keandalan aplikasi, mencakup:
- Pengujian Custom Hooks (`useLocalStorage` & `useBookStats`).
- Pengujian komponen form (validasi input kosong dan submit data).
- Pengujian komponen list (render data dan fungsi hapus).
- Pengujian integrasi aplikasi (simulasi tambah buku dan cek `localStorage`).

### 4. Mekanisme Serialisasi LocalStorage
Penyimpanan memanfaatkan API `localStorage` melalui Custom Hook. Data array JavaScript diubah menjadi teks JSON (`JSON.stringify`) sebelum disimpan, dan diubah kembali menjadi array objek (`JSON.parse`) saat aplikasi dimuat. Proses ini dibungkus dengan blok `try-catch` untuk mencegah *crash* jika data lokal korup atau gagal diakses.
```

---
