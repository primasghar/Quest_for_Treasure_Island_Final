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
    # if cursor.rowcount > 0:
    #     for row in result:
    return result

all_airports = fetch_game_airports()
# print(all_airports)


def add_player(player):
    sql = f"INSERT INTO player (name) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player,))
    resultant_id = cursor.lastrowid
    print(resultant_id)
    return resultant_id


def initial_player_progress(player_id):
    sql = f"INSERT INTO progress (player_id) VALUES (%s);"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql, (player_id,))
    resultant_id = cursor.lastrowid
    print(resultant_id)
    return resultant_id

def fetch_quiz_questions(level):
    sql = f"SELECT * FROM quizlet WHERE difficulty_level = {level};"
    # print(sql)
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    return result


