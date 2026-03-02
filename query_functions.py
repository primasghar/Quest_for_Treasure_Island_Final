import mariadb
# from geopy import distance

connection = mariadb.connect(
         host='127.0.0.1',
         port= 3306,
         database='treasure_island',
         user='root',
         password='Database@26',
         autocommit=True
         )



