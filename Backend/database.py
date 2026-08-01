import mariadb

class Database:
    def __init__(self):
        self.connection = mariadb.connect(
            host='127.0.0.1',
            port=3306,
            database='treasure_island',
            user='root',
            password='Database@26',
            autocommit=True
        )

    def get_conn(self):
        return self.connection