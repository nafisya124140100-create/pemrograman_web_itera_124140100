import math_operations
from math_operations import (
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)


def cetak_judul(judul):
    print("=" * 60)
    print(judul.center(60))
    print("=" * 60)


def cetak_hasil(nama_bangun, luas, keliling):
    print(f"  {nama_bangun}")
    print(f"    Luas     : {luas:.2f}")
    print(f"    Keliling : {keliling:.2f}")


def main():
    cetak_judul("PROGRAM DEMONSTRASI MODUL MATH_OPERATIONS")

    print("\n[1] KONSTANTA PI")
    print(f"    Nilai PI = {math_operations.PI}")

    print("\n[2] PERSEGI (sisi = 5)")
    sisi = 5
    luas = math_operations.luas_persegi(sisi)
    keliling = math_operations.keliling_persegi(sisi)
    cetak_hasil("Persegi", luas, keliling)

    print("\n[3] PERSEGI PANJANG (panjang = 8, lebar = 4)")
    panjang, lebar = 8, 4
    luas = math_operations.luas_persegi_panjang(panjang, lebar)
    keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
    cetak_hasil("Persegi Panjang", luas, keliling)

    print("\n[4] LINGKARAN (jari-jari = 7)  [import: from ... import ...]")
    jari_jari = 7
    luas = luas_lingkaran(jari_jari)
    keliling = keliling_lingkaran(jari_jari)
    cetak_hasil("Lingkaran", luas, keliling)

    print("\n[5] KONVERSI TEMPERATUR (Celsius = 30)")
    celsius = 30
    fahrenheit = celsius_ke_fahrenheit(celsius)
    kelvin = celsius_ke_kelvin(celsius)
    print(f"  {celsius}°C = {fahrenheit:.2f}°F")
    print(f"  {celsius}°C = {kelvin:.2f} K")

    print("\n[6] CONTOH PEMANGGILAN LAIN (import math_operations)")
    print(f"  Luas persegi (sisi=10)      = {math_operations.luas_persegi(10)}")
    print(f"  Keliling lingkaran (r=3.5)  = {math_operations.keliling_lingkaran(3.5):.2f}")
    print(f"  100°C ke Fahrenheit         = {math_operations.celsius_ke_fahrenheit(100):.2f}°F")

    print("\n" + "=" * 60)
    print("Program selesai.")
    print("=" * 60)


if __name__ == "__main__":
    main()