from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        self._item_id = item_id
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False

    @property
    def item_id(self) -> str:
        return self._item_id

    @property
    def judul(self) -> str:
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        return self.__dipinjam

    def pinjam(self) -> None:
        if self.__dipinjam:
            raise ValueError(f"Item '{self._judul}' sedang dipinjam.")
        self.__dipinjam = True

    def kembalikan(self) -> None:
        if not self.__dipinjam:
            raise ValueError(f"Item '{self._judul}' tidak sedang dipinjam.")
        self.__dipinjam = False

    def _status_teks(self) -> str:
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    @abstractmethod
    def get_detail(self) -> str:
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        pass

    def __str__(self) -> str:
        return (f"[{self._item_id}] {self._judul} "
                f"({self._tahun_terbit}) - {self._status_teks()}")


class Book(LibraryItem):
    TARIF_DENDA_PER_HARI = 2000

    def __init__(self, item_id: str, judul: str, tahun_terbit: int,
                 penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis
        self.__jumlah_halaman = jumlah_halaman

    @property
    def penulis(self) -> str:
        return self._penulis

    def get_detail(self) -> str:
        return (f"BUKU     | {self._item_id} | \"{self._judul}\" | "
                f"Penulis: {self._penulis} | Tahun: {self._tahun_terbit} | "
                f"{self.__jumlah_halaman} hlm | Status: {self._status_teks()}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        if hari_terlambat < 0:
            raise ValueError("Jumlah hari terlambat tidak boleh negatif.")
        return hari_terlambat * self.TARIF_DENDA_PER_HARI


class Magazine(LibraryItem):
    TARIF_DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun_terbit: int,
                 edisi: int, penerbit: str):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    def get_detail(self) -> str:
        return (f"MAJALAH  | {self._item_id} | \"{self._judul}\" | "
                f"Edisi: {self._edisi} | Penerbit: {self._penerbit} | "
                f"Tahun: {self._tahun_terbit} | Status: {self._status_teks()}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        if hari_terlambat < 0:
            raise ValueError("Jumlah hari terlambat tidak boleh negatif.")
        return hari_terlambat * self.TARIF_DENDA_PER_HARI