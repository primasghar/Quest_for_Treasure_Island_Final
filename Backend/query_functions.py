import mariadb

# from geopy import distance

connection = mariadb.connect(
    host='127.0.0.1',
    port=3306,
    database='treasure_island',
    user='root',
    password='Database@26',
    autocommit=True
)


def fetch_game_airports_query():
    sql = f"SELECT * FROM game_airports ORDER BY id;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    return result


all_airports = fetch_game_airports_query()


# print(all_airports)


def add_player_query(player):
    sql = f"INSERT INTO player (name) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player,))
    resultant_id = cursor.lastrowid
    # print(resultant_id)
    return resultant_id


def player_progress_id_query(player_id):
    sql = f"INSERT INTO progress (player_id) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player_id,))
    resultant_id = cursor.lastrowid
    # print(resultant_id)
    return resultant_id


def fetch_player_progress_query(gamerid):
    sql = f"SELECT * FROM progress WHERE player_id = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (gamerid,))
    result = cursor.fetchone()
    # print(result)
    return result

def fetch_player_collectibles_query(gamerid):
    sql = f"SELECT * FROM player_collectables WHERE player_id = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (gamerid,))
    result = cursor.fetchone()
    # print(result)
    return result


def fetch_game_airport_icao_query(current_level):
    sql = f"SELECT airport_id FROM game_airports WHERE id = %s;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (current_level,))
    result = cursor.fetchone()
    return result


def fetch_airport_info_query(icao):
    sql = f"SELECT iso_country, ident, name, latitude_deg, longitude_deg FROM airport WHERE ident = %s"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (icao,))
    result = cursor.fetchone()
    return result


def fetch_airport_country_query(iso_country):
    sql = f"SELECT name FROM country WHERE iso_country = %s"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (iso_country,))
    result = cursor.fetchone()
    return result


def update_progress_query(level, score, carbon_fp, player_id):
    sql = f"UPDATE progress SET current_level = %s, game_score = %s, carbon_footprint = %s WHERE player_id = %s"
    # print(sql)
    print(player_id)
    cursor = connection.cursor()
    cursor.execute(sql, (level, score, carbon_fp, player_id,))
    if cursor.rowcount==1:
        print("Player progress updated")
        return "Player progress updated"

def insert_collectibles_query(player_id, collectable):
    sql = "INSERT INTO player_collectables (player_id, collectable) VALUES (%s, %s);"
    cursor = connection.cursor()
    cursor.execute(sql, (player_id, collectable,))
    connection.commit()
    if cursor.rowcount == 1:
        print("Player collectable inserted")
        return "Player collectable updated"

def fetch_collectibles_query(playerId):
    sql = f"SELECT collectable FROM player_collectables WHERE player_id = %s"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (playerId,))
    rows = cursor.fetchall()
    collectibles = [row[0] for row in rows]

    return collectibles

def delete_player_and_progress_query():
    sql = "DELETE FROM progress"
    cursor = connection.cursor()
    cursor.execute(sql,)

    sql = "DELETE FROM player"
    cursor = connection.cursor()
    cursor.execute(sql, )
    return f"Player and their progress were deleted successfully."


def fetch_quiz_questions_query():
    sql = f"SELECT * FROM quizlet ORDER BY id;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, )
    result = cursor.fetchall()
    return result


def fetch_riddle_query():
    sql = f"SELECT * FROM riddle ORDER BY id;"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, )
    result = cursor.fetchall()
    return result
