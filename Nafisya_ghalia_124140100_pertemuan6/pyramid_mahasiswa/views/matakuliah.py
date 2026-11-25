from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from pyramid.response import Response
import json

from ..models.matakuliah import Matakuliah

# 1. GET /api/matakuliah (Ambil semua data)
@view_config(route_name='matakuliah_list', request_method='GET', renderer='json')
def get_all_matakuliah(request):
    matakuliah_list = request.dbsession.query(Matakuliah).all()
    return [mk.to_dict() for mk in matakuliah_list]

# 2. GET /api/matakuliah/{id} (Ambil detail 1 data)
@view_config(route_name='matakuliah_detail', request_method='GET', renderer='json')
def get_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    return mk.to_dict()

# 3. POST /api/matakuliah (Tambah data baru)
@view_config(route_name='matakuliah_list', request_method='POST', renderer='json')
def create_matakuliah(request):
    try:
        data = request.json_body
    except ValueError:
        raise HTTPBadRequest(json_body={'error': 'Format JSON tidak valid'})

    # Validasi field wajib
    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in data:
            raise HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

    # Validasi nilai sks dan semester tidak boleh <= 0
    if int(data['sks']) <= 0 or int(data['semester']) <= 0:
        raise HTTPBadRequest(json_body={'error': 'SKS dan Semester harus lebih besar dari 0'})

    # Simpan ke database
    new_mk = Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=int(data['sks']),
        semester=int(data['semester'])
    )
    request.dbsession.add(new_mk)
    request.dbsession.flush() # Agar ID langsung didapatkan
    request.dbsession.commit() 


    return {'message': 'Data berhasil ditambahkan', 'data': new_mk.to_dict()}

# 4. PUT /api/matakuliah/{id} (Update data)
@view_config(route_name='matakuliah_detail', request_method='PUT', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})

    data = request.json_body

    if 'kode_mk' in data: mk.kode_mk = data['kode_mk']
    if 'nama_mk' in data: mk.nama_mk = data['nama_mk']
    if 'sks' in data: mk.sks = int(data['sks'])
    if 'semester' in data: mk.semester = int(data['semester'])

    request.dbsession.commit() 

    return {'message': 'Data berhasil diupdate', 'data': mk.to_dict()}

# 5. DELETE /api/matakuliah/{id} (Hapus data)
@view_config(route_name='matakuliah_detail', request_method='DELETE', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})

    request.dbsession.delete(mk)
    request.dbsession.commit() 


    return {'message': 'Data berhasil dihapus'}