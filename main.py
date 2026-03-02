from games import rock_paper_scissors
import query_functions

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

player_Id = query_functions.add_player(player_name)

if player_Id:
    query_functions.initial_player_progress(player_Id)


game_score = 0
carbon_footprint = 0
current_airport = "Helsinki Vantaa Airport, Finland"
current_level = 1

print(f"Welcome! To the Quest of a Treasure Island.")
print(f" Adventurer: {player_name}\n Current location: {current_airport}\n Game level: {current_level}\n Game score: {game_score}\n Carbon footprints: {carbon_footprint}\n ")


rock_paper_scissors.rock_paper_scissors_game(player_name)

