from typing import Tuple
from library_item import LibraryItem


class Member:
    def __init__(self, id_anggota: str, nama: str):
        self.__id_anggota = id_anggota
        self.__nama = nama
        self.__items_dipinjam = []

    @property
    def id_anggota(self) -> str:
        return self.__id_anggota

    @property
    def nama(self) -> str:
        return self.__nama

    @property
    def items_dipinjam(self) -> Tuple[LibraryItem, ...]:
        return tuple(self.__items_dipinjam)

    def pinjam_item(self, item: LibraryItem) -> None:
        item.pinjam()
        self.__items_dipinjam.append(item)

    def kembalikan_item(self, item: LibraryItem) -> None:
        if item not in self.__items_dipinjam:
            raise ValueError(f"{self.__nama} tidak meminjam '{item.judul}'.")
        item.kembalikan()
        self.__items_dipinjam.remove(item)