# Tugas Pertemuan 4 — Pemrograman Python

## Identitas Mahasiswa

| Field      | Keterangan                        |
|------------|-----------------------------------|
| **Nama**   | Nafisya Ghalia                    |
| **NIM**    | 124140100                         |
| **Kelas**  | Pemrograman Web RB                |

---

##  Deskripsi Tugas

Tugas ini terdiri dari 3 soal yang berfokus pada konsep **fungsi (function)**, **struktur data (list & dictionary)**, **modularisasi**, dan **import modul** dalam Python.

###  Soal 1 — Program Penghitung BMI (`tugas1_bmi.py`)
Program sederhana untuk menghitung **Body Mass Index (BMI)** berdasarkan berat (kg) dan tinggi (m). Alur kerja:
1. Menerima input berat dan tinggi dari pengguna.
2. Menghitung nilai BMI dengan rumus: `BMI = berat / (tinggi * tinggi)`.
3. Menentukan kategori menggunakan percabangan `if-elif-else`:
   - `< 18.5` → Berat badan kurang
   - `18.5 ≤ BMI < 25` → Berat badan normal
   - `25 ≤ BMI < 30` → Berat badan berlebih
   - `≥ 30` → Obesitas
4. Menampilkan hasil dengan format 2 desimal menggunakan f-string.
   <img width="1295" height="590" alt="Screenshot 2026-11-04 213758" src="https://github.com/user-attachments/assets/7048b693-9a99-461f-9fb1-9d29ef922924" />


###  Soal 2 — Sistem Penilaian Mahasiswa (`tugas2_nilai_mahasiswa.py`)
Program untuk mengelola data nilai mahasiswa menggunakan **list of dictionary**. Alur kerja:
1. Menyimpan data 5 mahasiswa dalam list dictionary (nama, NIM, UTS, UAS, Tugas).
2. Menghitung nilai akhir dengan bobot: `30% UTS + 40% UAS + 30% Tugas`.
3. Menentukan grade (A/B/C/D/E) berdasarkan rentang nilai.
4. Menampilkan data dalam bentuk tabel rapi menggunakan f-string alignment.
5. Mencari dan menampilkan mahasiswa dengan nilai tertinggi dan terendah.

<img width="680" height="477" alt="Screenshot 2026-11-04 212300" src="https://github.com/user-attachments/assets/784fa1c4-9227-4378-b3ed-f3e2ad1e05b6" />


###  Soal 3 — Modul Matematika (`math_operations.py` + `main.py`)
Implementasi konsep **modularisasi** dengan memisahkan fungsi ke dalam modul terpisah. Alur kerja:
1. **`math_operations.py`** berisi:
   - Konstanta `PI = 3.14159`
   - Fungsi luas & keliling untuk 3 bangun: persegi, persegi panjang, lingkaran
   - Fungsi konversi suhu: Celsius → Fahrenheit, Celsius → Kelvin
2. **`main.py`** mengimpor modul dengan **2 cara berbeda**:
   - `import math_operations` (akses via prefix)
   - `from math_operations import ...` (akses langsung)
3. Menampilkan hasil kalkulasi dalam format terstruktur.

   
   <img width="546" height="652" alt="Screenshot 2026-11-04 212709" src="https://github.com/user-attachments/assets/2d17fa4d-af2a-45be-9ef5-51e1f903c3b8" />


---

