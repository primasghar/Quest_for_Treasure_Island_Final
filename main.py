from games import rock_paper_scissors
import query_functions

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

#clear the player and its progress. if player quits or loose

# Adds player in player table return newly formed id (PK)
player_Id = query_functions.add_player(player_name)

# With new player id add initial/default values and return the progress table id (PK)
if player_Id:
    query_functions.initial_player_progress(player_Id)

#progress table (0:id, 1:player_id, 2:current_level 3:game_score 4:carbon_footprint)
player_progress_data = query_functions.fetch_player_progress(player_Id)

# current level = id (PK) of game_airports, fetch the airport_id (ICAO = ident (PK) in airport table)
airport_icao = query_functions.fetch_game_airport_icao(player_progress_data[2])

# By using the airport icao we fetch (iso_country, ident, name, latitude_deg, longitude_deg) from airport tables
airport_info = query_functions.fetch_airport_info(airport_icao[0])

# Use iso_country from airport_info we fetch country name
airport_country = query_functions.fetch_airport_country(airport_info[0])


current_level = player_progress_data[2]
game_score = player_progress_data[3]
carbon_footprint = player_progress_data[4]
current_airport = f"{airport_info[2]}, {airport_country[0]}"

print(f"Welcome! To the Quest of a Treasure Island.")
print(f" Adventurer: {player_name}\n Current location: {current_airport}\n Game level: {current_level}\n Game score: {game_score}\n Carbon footprints: {carbon_footprint}\n ")


rock_paper_scissors.rock_paper_scissors_game(player_name)

