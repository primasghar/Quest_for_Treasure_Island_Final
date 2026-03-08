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


def player_progress_id(player_id):
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
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (icao,))
    result = cursor.fetchone()
    return result

def fetch_airport_country(iso_country):
    sql = f"SELECT name FROM country WHERE iso_country = %s"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (iso_country,))
    result = cursor.fetchone()
    return result

def update_progress(level, score, carbon_fp, player_id):
    sql = f"UPDATE progress SET current_level = %s, game_score = %s, carbon_footprint = %s WHERE player_id = %s"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (level, score, carbon_fp, player_id,))
    # if cursor.rowcount==1:
    #     print("Player progress updated")

def delete_player_and_progress():
    sql = "DELETE FROM progress"
    cursor = connection.cursor()
    cursor.execute(sql,)

    sql = "DELETE FROM player"
    cursor = connection.cursor()
    cursor.execute(sql, )


