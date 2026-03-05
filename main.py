from games import rock_paper_scissors, sequence_memory
from query_functions import (add_player, player_progress_id, fetch_player_progress,
                             fetch_game_airport_icao, fetch_airport_info, fetch_airport_country, update_progress)


def airport_data(level):
    airport_destination = []

    icao_code = fetch_game_airport_icao(level)

    airport_details = fetch_airport_info(icao_code)
    airport_destination.extend(airport_details)

    airport_in_country = fetch_airport_country(airport_details[0])
    airport_destination.append(airport_in_country)
    print(airport_destination)
    # [iso_country, ident, name(airport), latitude_deg, longitude_deg, name(country)]

    return airport_destination

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

# Adds player in player table return newly formed id (PK)
player_Id =add_player(player_name)

# if new player id is formed, adds the player_Id to progress and return player's progress table id.
if player_Id:
    player_progress_id(player_Id)

#progress table (0:id, 1:player_id, 2:current_level 3:game_score 4:carbon_footprint)
player_progress_data = fetch_player_progress(player_Id)

current_level = player_progress_data[2]
game_score = player_progress_data[3]
carbon_footprint = player_progress_data[4]

airport_and_country = airport_data(player_progress_data[2])

current_airport = f"{airport_and_country[2]}, {airport_and_country[5]}"


print(f"Welcome! To the Quest for a Treasure Island.")
print(f"""
Adventurer: {player_name} 
Level: {current_level}
Game points: {game_score} 
Carbon footprints: {carbon_footprint}
Location: {current_airport}\n""")


if current_level == 1:
    result = rock_paper_scissors.rock_paper_scissors_game(player_name)

    if result:

        current_level = 2
        game_score += 1000
        carbon_footprint += 1000

        airport_data(current_level)
        current_airport = f"{airport_data[2]}, {airport_data[5]}"

        update_progress(current_level,game_score,carbon_footprint, current_airport)

        print(f"Your next airport destination is {current_airport}")


elif current_level == 2:
    result = sequence_memory.sequence_memory_game(player_name)

    if result:
        print("Your next airport destination is" )






#clear the player and its progress. if player quits or loose
