from sqlalchemy import Column, Integer, Text
from .meta import Base

class Mahasiswa(Base):
    __tablename__ = 'mahasiswa'
    id = Column(Integer, primary_key=True)
    nim = Column(Text, unique=True, nullable=False)
    nama = Column(Text, nullable=False)

    def to_dict(self):
        return {'id': self.id, 'nim': self.nim, 'nama': self.nama}