# Tugas Pertemuan 5 — Sistem Manajemen Perpustakaan Sederhana (OOP Python)

## Identitas Mahasiswa

| Keterangan      | Isi                                  |
|-----------------|--------------------------------------|
| Nama Lengkap    | Nafisya Ghalia                       |
| NIM             | 124140100                            |
| Kelas Praktikum | RB                                   |
| Mata Kuliah     | Praktikum Pemrograman Web            |
| Pertemuan       | 5                                    |

## Deskripsi Program

Program ini adalah sistem manajemen perpustakaan sederhana berbasis **OOP Python**
yang berjalan **interaktif melalui menu terminal**. Pengguna dapat menambahkan
buku/majalah, menampilkan katalog, mencari item, meminjam dan mengembalikan item,
serta menghitung denda keterlambatan.

Alur program:
1. Pengguna memasukkan nama anggota, lalu sistem menampilkan menu utama.
2. Setiap pilihan menu memanggil method pada class `Library`, `LibraryItem`
   (subclass `Book`/`Magazine`), atau `Member`.
3. Seluruh data koleksi, status peminjaman, dan daftar pinjaman dilindungi
   dengan encapsulation — perubahan hanya bisa melalui method resmi.
4. Program berulang menampilkan menu sampai pengguna memilih `0` (Keluar).

### Fitur Program

| Menu | Fitur |
|------|-------|
| 1 | Menambah item (buku atau majalah), ID duplikat otomatis ditolak |
| 2 | Menampilkan katalog (semua item / hanya yang tersedia) |
| 3 | Mencari item berdasarkan ID (persis) atau judul (partial, case-insensitive) |
| 4 | Meminjam item — item yang sedang dipinjam tidak bisa dipinjam lagi |
| 5 | Mengembalikan item |
| 6 | Menghitung denda keterlambatan (tarif berbeda per jenis item) |
| 0 | Keluar dari program |

### Penerapan 4 Pilar OOP

| Pilar | Implementasi dalam Kode |
|-------|--------------------------|
| **Class & Abstraction** | `LibraryItem(ABC)` dengan abstract method `get_detail()` dan `hitung_denda()` sehingga tidak dapat diinstansiasi langsung; class konkret `Book`, `Magazine`, `Library`, dan `Member`. |
| **Inheritance** | `Book` dan `Magazine` mewarisi `LibraryItem`, memanggil `super().__init__(...)`, serta menggunakan ulang method `pinjam()`, `kembalikan()`, dan helper protected `_status_teks()`. |
| **Encapsulation** | Atribut private `__koleksi`, `__dipinjam`, `__items_dipinjam`; atribut protected `_item_id`, `_judul`. Akses melalui `@property` (`is_dipinjam`, `judul`, `items_dipinjam` yang mengembalikan tuple salinan). Status peminjaman hanya dapat diubah lewat method resmi `pinjam()`/`kembalikan()`. |
| **Polymorphism** | `get_detail()` dan `hitung_denda()` di-override dengan perilaku berbeda per subclass (denda buku Rp2.000/hari, majalah Rp1.000/hari); `Library.tampilkan_katalog()` memanggil method yang sama pada objek berbeda tanpa memeriksa tipenya; overriding `__str__`. |

## Struktur Berkas

```
Nafisya_ghalia_124140100_pertemuan5/
├── tugas_perpustakaan/
│   ├── library_item.py   # Abstract class LibraryItem + subclass Book & Magazine
│   ├── member.py         # Class Member (anggota peminjam)
│   ├── library.py        # Class Library (pengelola koleksi)
│   └── main.py           # Program utama interaktif (menu terminal)
├── README.md
├── screenshot_output.png
└── .gitignore
```

## Cara Menjalankan Program

Program hanya menggunakan modul standar Python (`abc`, `typing`), tidak perlu
instalasi library tambahan. Pastikan Python 3.8+ terpasang, lalu jalankan:

```bash
cd Nafisya_ghalia_124140100_pertemuan5/tugas_perpustakaan
python main.py
```
atau klik kanan lalu klik run python


## Screenshot Output

Bukti eksekusi program di terminal yang mendemonstrasikan fitur penambahan item,
penampilan katalog, dan pencarian buku:

<img width="770" height="517" alt="Screenshot 2026-11-16 193649" src="https://github.com/user-attachments/assets/365b0f60-021e-4ac6-acb5-534a546b5638" />

<img width="810" height="307" alt="Screenshot 2026-11-16 193705" src="https://github.com/user-attachments/assets/5097033a-44b4-4d7a-b94c-df53a22d79f3" />

<img width="673" height="300" alt="Screenshot 2026-11-16 193858" src="https://github.com/user-attachments/assets/b7ac2215-1e88-4c75-9a3b-54aeb9f37277" />
