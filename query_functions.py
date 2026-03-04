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
    sql = f"SELECT * FROM game_airports ORDER BY id;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

all_airports = fetch_game_airports()
# print(all_airports)


def add_player(player):
    sql = f"INSERT INTO player (name) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player,))
    resultant_id = cursor.lastrowid
    # print(resultant_id)
    return resultant_id


def initial_player_progress(player_id):
    sql = f"INSERT INTO progress (player_id) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player_id,))
    resultant_id = cursor.lastrowid
    # print(resultant_id)
    return resultant_id

def fetch_player_progress(gamerid):
    sql = f"SELECT * FROM progress WHERE player_id = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (gamerid,))
    result = cursor.fetchone()
    # print(result)
    return result


def fetch_quiz_questions(level):
    sql = f"SELECT * FROM quizlet WHERE difficulty_level = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql,(level,))
    result = cursor.fetchall()
    return result


def fetch_game_airport_icao(current_level):
    sql = f"SELECT airport_id FROM game_airports WHERE id = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (current_level,))
    result = cursor.fetchone()
    return result

def fetch_airport_info(icao):
    sql = f"SELECT iso_country, ident, name, latitude_deg, longitude_deg FROM airport WHERE ident = %s"
    cursor = connection.cursor()
    cursor.execute(sql, (icao,))
    result = cursor.fetchone()
    return result

def fetch_airport_country(iso_country):
    sql = f"SELECT name FROM country WHERE iso_country = %s"
    cursor = connection.cursor()
    cursor.execute(sql, (iso_country,))
    result = cursor.fetchone()
    return result

