from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker

import sqlalchemy.dialects.postgresql.pg8000

def main(global_config, **settings):
    # Setup Database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession = sessionmaker(bind=engine)

    config = Configurator(settings=settings)
    config.include('pyramid_debugtoolbar')

    # Injeksi dbsession ke setiap request
    def get_db(request):
        return DBSession()

    config.add_request_method(get_db, 'dbsession', reify=True)

    # Daftarkan routes & views
    config.include('.routes')
    config.scan()

    return config.make_wsgi_app()