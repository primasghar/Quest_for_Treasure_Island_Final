import mariadb
import os

class Database:
    schema_path = './database/treasure_island_schema.sql'
    schema_path_values = './database/queries.sql'

    def __init__(self):
        self.connection = mariadb.connect(
            host='127.0.0.1',
            port=3306,
            database='treasure_island',
            user='root',
            password='Database@26',
            autocommit=True
        )

        if self.schema_path:
            self._execute_queries(self.schema_path)
            """Insert values"""
            self._execute_queries(self.schema_path_values)

    def get_conn(self):
        return self.connection

    def _execute_queries(self, schema_path):
        """Execute a .sql schema file to create tables on load."""
        if not os.path.exists(schema_path):
            raise FileNotFoundError(f"Schema file not found: {schema_path}")

        with open(schema_path, 'r') as f:
            schema_sql = f.read()

        cursor = self.connection.cursor()
        try:
            for statement in self._split_statements(schema_sql):
                cursor.execute(statement)
        finally:
            cursor.close()

    @staticmethod
    def _split_statements(sql_text):
        statements = []
        for raw_statement in sql_text.split(';'):
            statement = raw_statement.strip()
            if statement and not statement.startswith('--'):
                statements.append(statement)
        return statements