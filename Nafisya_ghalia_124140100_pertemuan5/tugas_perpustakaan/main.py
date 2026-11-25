
from library_item import Book, Magazine
from library import Library
from member import Member


def input_angka(prompt: str) -> int:
    """Meminta input angka; mengulang sampai pengguna memasukkan angka."""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("[!] Masukkan angka yang valid.")


def input_teks(prompt: str) -> str:
    """Meminta input teks non-kosong; mengulang sampai valid."""
    while True:
        teks = input(prompt).strip()
        if teks:
            return teks
        print("[!] Input tidak boleh kosong.")


def tambah_item(perpustakaan: Library) -> None:
    """Menu 1: menambah buku atau majalah baru sesuai input pengguna."""
    print("\nJenis item: 1) Buku  2) Majalah")
    jenis = input("Pilih jenis (1/2): ").strip()
    if jenis not in ("1", "2"):
        print("[!] Pilihan tidak dikenal.")
        return

    item_id = input_teks("ID item (mis. B001): ")
    judul = input_teks("Judul: ")
    tahun = input_angka("Tahun terbit: ")

    if jenis == "1":
        penulis = input_teks("Penulis: ")
        halaman = input_angka("Jumlah halaman: ")
        item = Book(item_id, judul, tahun, penulis, halaman)
    else:
        edisi = input_angka("Nomor edisi: ")
        penerbit = input_teks("Penerbit: ")
        item = Magazine(item_id, judul, tahun, edisi, penerbit)

    try:
        perpustakaan.tambah_item(item)  # validasi ID duplikat di dalam Library
    except (ValueError, TypeError) as e:
        print(f"[!] Gagal menambahkan: {e}")


def cari_item(perpustakaan: Library) -> None:
    """Menu 3: mencari item berdasarkan ID (persis) atau judul (partial)."""
    print("\nCari berdasarkan: 1) ID  2) Judul")
    mode = input("Pilih (1/2): ").strip()

    if mode == "1":
        item_id = input_teks("Masukkan ID: ")
        item = perpustakaan.cari_berdasarkan_id(item_id)
        if item is None:
            print(f"[!] Item dengan ID '{item_id}' tidak ditemukan.")
        else:
            print(f"Ditemukan: {item.get_detail()}")
    elif mode == "2":
        kunci = input_teks("Masukkan kata kunci judul: ")
        hasil = perpustakaan.cari_berdasarkan_judul(kunci)
        if not hasil:
            print(f"[!] Tidak ada item dengan kata kunci '{kunci}'.")
        else:
            print(f"Ditemukan {len(hasil)} item:")
            for item in hasil:
                print(f"  - {item.get_detail()}")
    else:
        print("[!] Pilihan tidak dikenal.")


def pinjam_item(perpustakaan: Library, anggota: Member) -> None:
    """Menu 4: anggota meminjam item berdasarkan ID."""
    item_id = input_teks("ID item yang dipinjam: ")
    item = perpustakaan.cari_berdasarkan_id(item_id)
    if item is None:
        print("[!] Item tidak ditemukan.")
        return
    try:
        anggota.pinjam_item(item)
        print(f"[+] '{item.judul}' berhasil dipinjam oleh {anggota.nama}.")
    except ValueError as e:
        print(f"[!] {e}")


def kembalikan_item(perpustakaan: Library, anggota: Member) -> None:
    """Menu 5: anggota mengembalikan item berdasarkan ID."""
    item_id = input_teks("ID item yang dikembalikan: ")
    item = perpustakaan.cari_berdasarkan_id(item_id)
    if item is None:
        print("[!] Item tidak ditemukan.")
        return
    try:
        anggota.kembalikan_item(item)
        print(f"[+] '{item.judul}' berhasil dikembalikan.")
    except ValueError as e:
        print(f"[!] {e}")


def hitung_denda(perpustakaan: Library) -> None:
    """Menu 6: menghitung denda (polymorphism: tarif beda per jenis item)."""
    item_id = input_teks("ID item: ")
    item = perpustakaan.cari_berdasarkan_id(item_id)
    if item is None:
        print("[!] Item tidak ditemukan.")
        return
    hari = input_angka("Jumlah hari terlambat: ")
    try:
        denda = item.hitung_denda(hari)
    except ValueError as e:
        print(f"[!] {e}")
        return
    rupiah = f"Rp{denda:,}".replace(",", ".")
    print(f"Denda '{item.judul}' ({hari} hari) = {rupiah}")


def main() -> None:
    """Loop utama: menampilkan menu dan menjalankan pilihan pengguna."""
    print("=" * 60)
    print("SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA")
    print("=" * 60)

    perpustakaan = Library("Perpustakaan ITERA")
    nama = input("Nama anggota: ").strip() or "Umum"
    anggota = Member("A001", nama)

    while True:
        print("\n" + "-" * 40)
        print("MENU:")
        print("1. Tambah item (buku/majalah)")
        print("2. Tampilkan katalog")
        print("3. Cari item (ID/judul)")
        print("4. Pinjam item")
        print("5. Kembalikan item")
        print("6. Hitung denda keterlambatan")
        print("0. Keluar")
        pilihan = input("Pilih menu: ").strip()

        if pilihan == "1":
            tambah_item(perpustakaan)
        elif pilihan == "2":
            hanya = input("Hanya item tersedia? (y/n): ").strip().lower() == "y"
            perpustakaan.tampilkan_katalog(hanya_tersedia=hanya)
        elif pilihan == "3":
            cari_item(perpustakaan)
        elif pilihan == "4":
            pinjam_item(perpustakaan, anggota)
        elif pilihan == "5":
            kembalikan_item(perpustakaan, anggota)
        elif pilihan == "6":
            hitung_denda(perpustakaan)
        elif pilihan == "0":
            print("Terima kasih! Program selesai.")
            break
        else:
            print("[!] Menu tidak tersedia.")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nProgram dihentikan.")