from games import flip_the_coin,rock_paper_scissors, roll_the_dice, odds_evens, number_guessing,sequence_memory
from query_functions import (add_player_query, player_progress_id_query, fetch_player_progress_query,
                             fetch_game_airport_icao_query, fetch_airport_info_query, fetch_airport_country_query, update_progress_query, delete_player_and_progress_query)

def airport_data(level):
    icao_code = fetch_game_airport_icao_query(level)
    airport_details = fetch_airport_info_query(icao_code[0])
    # print(airport_details)
    airport_in_country = fetch_airport_country_query(airport_details[0])
    # print(airport_in_country)
    airport_destination = airport_details + airport_in_country
    # [iso_country, ident, name(airport), latitude_deg, longitude_deg, name(country)]
    return airport_destination

def airport_and_country(level):
    next_destination = airport_data(level)
    name_of_airport_and_country = next_destination[2], next_destination[5]
    return name_of_airport_and_country


def update_board(level, points, cfp, player_Id):
    print(f"You are flying to the next airport")
    score = game_score + points
    carbon_fp = carbon_footprint + cfp

    update_progress_query(level, score, carbon_fp, player_Id)


def display_board():
    print(f"""
    Adventurer: {player_name}
    Level: {current_level}
    Game points: {game_score}
    Carbon footprints: {carbon_footprint}\n""")


def play_again_or_not():
    print("\nIf you want to play the game again? It will cost you 200 game points. Please enter Yes [y] to play again.")
    print("If you want to quit. Please enter Quit [q]\n")
    play_again = input("Yes[y] or Quit[q])").upper()

    if play_again == "Q" or play_again == "QUIT":
        exit_game()
        return True

    return False



def exit_game():
    print("Game exiting...")
    delete_player_and_progress_query()


# ---------------------------------------------------------------------------------------------------------------------

def play_stage():
    current_progress = fetch_player_progress_query(player_Id)
    current_stage = current_progress[2]

    print(f"\nYour current destination is '{airport_and_country(current_stage)}'.")
    display_board()

    game_result = False

    if current_stage == 1:
        game_result = flip_the_coin.play_game(player_name)

    if current_stage == 2:
        game_result = rock_paper_scissors.play_game(player_name)

    if current_stage == 3:
        game_result = roll_the_dice.play_game(player_name)

    if current_stage == 4:
        game_result = odds_evens.play_game(player_name)

    if current_stage == 5:
        game_result = number_guessing.play_game(player_name)

    if current_stage == 6:
        game_result = sequence_memory.play_game(player_name)

    if game_result:
        update_board(current_stage + 1, current_stage * 1000, 0, player_Id)

    if not game_result:
        return play_again_or_not()

    return False



# GAME START

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

# Adds player in "player" table return newly formed id (PK)
player_Id = add_player_query(player_name)

# if new player id exists, player_Id is added to "progress" table and return player's progress table id.
if player_Id:
    player_progress_id_query(player_Id)

player_progress_data = fetch_player_progress_query(player_Id)

# Global Variables
current_level = player_progress_data[2]
game_score = player_progress_data[3]
carbon_footprint = player_progress_data[4]
current_airport = airport_and_country(current_level)



print(f"Welcome, {player_name}! To the Quest for a Treasure Island!")

# ---------------------------------------------------------------------------------------------------------------------
game_over =  False
while not game_over:
    game_over = play_stage()



