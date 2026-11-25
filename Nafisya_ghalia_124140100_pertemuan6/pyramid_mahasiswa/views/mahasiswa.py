from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models.mahasiswa import Mahasiswa

# 1. GET /api/mahasiswa (Ambil semua data)
@view_config(route_name='mahasiswa_list', request_method='GET', renderer='json')
def get_all_mahasiswa(request):
    mhs_list = request.dbsession.query(Mahasiswa).all()
    return [mhs.to_dict() for mhs in mhs_list]

# 2. GET /api/mahasiswa/{id} (Ambil detail 1 data)
@view_config(route_name='mahasiswa_detail', request_method='GET', renderer='json')
def get_mahasiswa(request):
    mhs_id = request.matchdict['id']
    mhs = request.dbsession.query(Mahasiswa).filter_by(id=mhs_id).first()
    
    if not mhs:
        raise HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})
    return mhs.to_dict()

# 3. POST /api/mahasiswa (Tambah data baru)
@view_config(route_name='mahasiswa_list', request_method='POST', renderer='json')
def create_mahasiswa(request):
    try:
        data = request.json_body
    except ValueError:
        raise HTTPBadRequest(json_body={'error': 'Format JSON tidak valid'})

    # Validasi field wajib
    required_fields = ['nim', 'nama']
    for field in required_fields:
        if field not in data:
            raise HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

    # Simpan ke database
    new_mhs = Mahasiswa(
        nim=data['nim'],
        nama=data['nama']
    )
    request.dbsession.add(new_mhs)
    request.dbsession.flush()
    request.dbsession.commit()

    return {'message': 'Data berhasil ditambahkan', 'data': new_mhs.to_dict()}

# 4. PUT /api/mahasiswa/{id} (Update data)
@view_config(route_name='mahasiswa_detail', request_method='PUT', renderer='json')
def update_mahasiswa(request):
    mhs_id = request.matchdict['id']
    mhs = request.dbsession.query(Mahasiswa).filter_by(id=mhs_id).first()
    
    if not mhs:
        raise HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})

    data = request.json_body

    if 'nim' in data: mhs.nim = data['nim']
    if 'nama' in data: mhs.nama = data['nama']

    request.dbsession.commit()

    return {'message': 'Data berhasil diupdate', 'data': mhs.to_dict()}

# 5. DELETE /api/mahasiswa/{id} (Hapus data)
@view_config(route_name='mahasiswa_detail', request_method='DELETE', renderer='json')
def delete_mahasiswa(request):
    mhs_id = request.matchdict['id']
    mhs = request.dbsession.query(Mahasiswa).filter_by(id=mhs_id).first()
    
    if not mhs:
        raise HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})

    request.dbsession.delete(mhs)
    request.dbsession.commit()

    return {'message': 'Data berhasil dihapus'}