def includeme(config):
    config.add_route('home', '/')
    config.add_route('matakuliah_list', '/api/matakuliah')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}')
    config.add_route('mahasiswa_list', '/api/mahasiswa') 
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}')