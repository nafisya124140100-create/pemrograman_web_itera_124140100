from setuptools import setup

setup(
    name='pyramid_mahasiswa',
    version='0.0',
    packages=['pyramid_mahasiswa'],
    entry_points="""\
    [paste.app_factory]
    main = pyramid_mahasiswa:main
    """,
)