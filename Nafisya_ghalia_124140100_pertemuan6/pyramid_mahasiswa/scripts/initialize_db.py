from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pyramid.paster import get_appsettings, setup_logging
import sys
import os

# Tambahkan path root agar bisa import model
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from pyramid_mahasiswa.models import Base, Mahasiswa, Matakuliah

# Tambahkan import ini agar SQLAlchemy mengenali driver pg8000
import sqlalchemy.dialects.postgresql.pg8000

def main():
    config_uri = sys.argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    
    # Ambil URL dari development.ini
    url = settings['sqlalchemy.url']
    engine = create_engine(url)
    
    Session = sessionmaker(bind=engine)
    session = Session()

    # Seeding Mahasiswa
    if session.query(Mahasiswa).count() == 0:
        mhs1 = Mahasiswa(nim='124140100', nama='Nafisya Ghalia')
        session.add(mhs1)
        print("Data Mahasiswa berhasil ditambahkan.")

    # Seeding Matakuliah (Minimal 3 data)
    if session.query(Matakuliah).count() == 0:
        mk1 = Matakuliah(kode_mk='IF2110', nama_mk='Pemrograman Web', sks=3, semester=3)
        mk2 = Matakuliah(kode_mk='IF3140', nama_mk='Basis Data', sks=4, semester=5)
        mk3 = Matakuliah(kode_mk='IF3150', nama_mk='Jaringan Komputer', sks=3, semester=5)
        session.add_all([mk1, mk2, mk3])
        print("Data Matakuliah berhasil ditambahkan.")

    session.commit()
    print("Database berhasil diinisialisasi dan di-seeding!")

if __name__ == '__main__':
    main()