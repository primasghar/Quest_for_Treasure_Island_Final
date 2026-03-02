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

def fetch_game_airports():
    sql = f"SELECT * FROM game_airports;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    # if cursor.rowcount > 0:
    #     for row in result:
    return result

# all_airports = fetch_game_airports()
# print(all_airports)


def add_player(player):
    sql = f"INSERT INTO player (name) VALUES (%s);"
    print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player,))
    resultant_id = cursor.lastrowid
    print(resultant_id)
    return resultant_id

