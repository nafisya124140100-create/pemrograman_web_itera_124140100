# Tugas Praktikum Pemrograman Web (Pertemuan 6) - RESTful API

## Identitas
- **Nama Lengkap:** Nafisya Ghalia
- **NIM:** 124140100
- **Kelas Praktikum:** RB
- **Mata Kuliah:** Pemrograman Aplikasi Web (PAW)

## Deskripsi Aplikasi
Aplikasi ini adalah RESTful API sederhana untuk manajemen data **Matakuliah** dan **Mahasiswa**. Aplikasi dibangun menggunakan framework **Pyramid** (Python) dengan database **PostgreSQL**. Fitur ini mencakup operasi CRUD (Create, Read, Update, Delete) dan dilengkapi dengan validasi input (mengembalikan status 400 Bad Request jika data tidak lengkap) serta penanganan error 404 Not Found.

## Teknologi yang Digunakan
- **Bahasa:** Python 3.12
- **Framework:** Pyramid
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migrasi:** Alembic
- **Driver DB:** pg8000 (karena *environment constraint* pada Windows)

## Daftar Endpoint API

### Matakuliah
- `GET /api/matakuliah` : Menampilkan seluruh data matakuliah
  ![Uploading Screenshot 2026-11-25 224544.png…]()

- `GET /api/matakuliah/{id}` : Menampilkan detail matakuliah berdasarkan ID
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1db40823-a702-4929-a647-817e2ee5a008" />

- `POST /api/matakuliah` : Menambahkan data matakuliah baru
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/09673246-53ef-4cce-8eca-c9ba84d3c7ff" />
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0bd4d782-75bd-4bfc-8590-a574ba6587e3" />

- `PUT /api/matakuliah/{id}` : Memperbarui data matakuliah
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/b7f3b3f0-abae-4af7-98e4-cd2a8731d526" />
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/fe72063e-7a39-4ba3-b063-d918de11b747" />

- `DELETE /api/matakuliah/{id}` : Menghapus data matakuliah
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/5cc79808-61dc-48e2-8670-185fdf9e21b5" />
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0bb5c02e-d6db-443b-bbe9-738e5f031e57" />

### Mahasiswa (Referensi)
- `GET /api/mahasiswa` : Menampilkan seluruh data mahasiswa
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9d6e773c-53d7-4556-bda0-b5fc7bbbdbc0" />
- `POST /api/mahasiswa` : Menambahkan data mahasiswa baru
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3ee70413-7950-4e5f-b62d-d124eca9e4e9" />
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9fab9da1-7cf8-412c-9091-8c586f46ef6c" />

## Cara Menjalankan
1. Aktifkan venv: `venv\Scripts\activate`
2. Install dependensi: `pip install -e .`
3. Migrasi DB: `python -m alembic upgrade head`
4. Jalankan server: `python -m pyramid.scripts.pserve development.ini --reload`
5. Akses di: `http://127.0.0.1:6543`
