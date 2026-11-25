data_mahasiswa = [
    {"nama": "Nafisya Ghalia", "nim": "12024001", "nilai_uts": 85, "nilai_uas": 80, "nilai_tugas": 88},
    {"nama": "Fadilla Andia Putri", "nim": "12024002", "nilai_uts": 72, "nilai_uas": 75, "nilai_tugas": 70},
    {"nama": "Frichintia Niken", "nim": "12024003", "nilai_uts": 90, "nilai_uas": 92, "nilai_tugas": 85},
    {"nama": "Olivia", "nim": "12024004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Hania Syakira", "nim": "12024005", "nilai_uts": 68, "nilai_uas": 70, "nilai_tugas": 72},
]

def hitung_nilai_akhir(uts, uas, tugas):
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

for mhs in data_mahasiswa:
    nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
    grade = tentukan_grade(nilai_akhir)
    mhs["nilai_akhir"] = nilai_akhir
    mhs["grade"] = grade

print("=" * 80)
print("DAFTAR NILAI MAHASISWA")
print("=" * 80)
print(f"{'NO':<4} {'NAMA':<20} {'NIM':<12} {'NILAI AKHIR':<15} {'GRADE':<8}")
print("-" * 80)

for i, mhs in enumerate(data_mahasiswa, start=1):
    print(f"{i:<4} {mhs['nama']:<20} {mhs['nim']:<12} {mhs['nilai_akhir']:<15.2f} {mhs['grade']:<8}")

print("=" * 80)

tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMAHASISWA DENGAN NILAI TERTINGGI:")
print(f"Nama        : {tertinggi['nama']}")
print(f"NIM         : {tertinggi['nim']}")
print(f"Nilai Akhir : {tertinggi['nilai_akhir']:.2f}")
print(f"Grade       : {tertinggi['grade']}")

print("\nMAHASISWA DENGAN NILAI TERENDAH:")
print(f"Nama        : {terendah['nama']}")
print(f"NIM         : {terendah['nim']}")
print(f"Nilai Akhir : {terendah['nilai_akhir']:.2f}")
print(f"Grade       : {terendah['grade']}")