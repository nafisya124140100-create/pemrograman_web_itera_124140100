from typing import List, Optional
from library_item import LibraryItem


class Library:
    def __init__(self, nama: str):
        self.__nama = nama
        self.__koleksi: List[LibraryItem] = []

    @property
    def nama(self) -> str:
        return self.__nama

    @property
    def jumlah_item(self) -> int:
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem) -> None:
        if not isinstance(item, LibraryItem):
            raise TypeError("Hanya objek turunan LibraryItem yang dapat ditambahkan.")
        if self.cari_berdasarkan_id(item.item_id) is not None:
            raise ValueError(f"Item dengan ID '{item.item_id}' sudah terdaftar.")
        self.__koleksi.append(item)
        print(f"[+] Ditambahkan: {item}")

    def tampilkan_katalog(self, hanya_tersedia: bool = False) -> None:
        daftar = [i for i in self.__koleksi
                  if not (hanya_tersedia and i.is_dipinjam)]
        label = "Item Tersedia" if hanya_tersedia else "Katalog"
        print(f"\n=== {label} {self.__nama} ({len(daftar)} item) ===")
        if not daftar:
            print("(tidak ada item)")
            return
        for nomor, item in enumerate(daftar, start=1):
            print(f"{nomor}. {item.get_detail()}")

    def cari_berdasarkan_id(self, item_id: str) -> Optional[LibraryItem]:
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_berdasarkan_judul(self, kata_kunci: str) -> List[LibraryItem]:
        kunci = kata_kunci.lower().strip()
        return [item for item in self.__koleksi if kunci in item.judul.lower()]