from games import flip_the_coin,rock_paper_scissors, roll_the_dice, odds_evens, number_guessing,sequence_memory
from query_functions import (add_player, player_progress_id, fetch_player_progress,
                             fetch_game_airport_icao, fetch_airport_info, fetch_airport_country, update_progress, delete_player_and_progress)

def airport_data(level):
    icao_code = fetch_game_airport_icao(level)
    airport_details = fetch_airport_info(icao_code[0])
    # print(airport_details)
    airport_in_country = fetch_airport_country(airport_details[0])
    # print(airport_in_country)
    airport_destination = airport_details + airport_in_country
    # [iso_country, ident, name(airport), latitude_deg, longitude_deg, name(country)]
    return airport_destination

def airport_and_country(level):
    next_destination = airport_data(level)
    name_of_airport_and_country = next_destination[2], next_destination[5]
    return name_of_airport_and_country


def update_board(game_level, game_points, carbon_fp, player_Id):
    print(f"Your next airport destination is {airport_and_country(game_level)}")
    update_progress(game_level, game_points, carbon_fp, player_Id)

def display_board(player_name, current_level, game_score, carbon_footprint ):
    print(f"""
    Adventurer: {player_name}
    Level: {current_level}
    Game points: {game_score}
    Carbon footprints: {carbon_footprint}\n""")


def play_again_or_not(game_score, game, player_name):
    print("\nIf you want to play the game again? It will cost you 200 game points. Please enter Yes [y] to play again.")
    print("If you want to quit. Please enter Quit [q]\n")
    play_again = input("Yes[y] or Quit[q])").upper()

    while play_again == "Y" or play_again == "YES":
        if game_score >= 200:
            game_score = game_score - 200

            update_progress(current_level, game_score, carbon_footprint, player_Id)

            game(player_name)

            display_board(player_name, current_level, game_score, carbon_footprint)
            print(f"\nDo you want to play again or quit")
            play_again = input("Yes[y] or Quit[q])").upper()
        elif game_score < 200:
            print("Sorry, you don't have enough game points to pay for the game")
            print("You can start a new game. Game exiting...!")
            delete_player_and_progress()
            break
    else:
        print("Game exiting...")
        delete_player_and_progress()

# ---------------------------------------------------------------------------------------------------------------------
# GAME START

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

# Adds player in "player" table return newly formed id (PK)
player_Id = add_player(player_name)

# if new player id exists, player_Id is added to "progress" table and return player's progress table id.
if player_Id:
    player_progress_id(player_Id)

player_progress_data = fetch_player_progress(player_Id)

# Global Variables for score board
current_level = player_progress_data[2]
game_score = player_progress_data[3]
carbon_footprint = player_progress_data[4]

current_airport = airport_and_country(current_level)

print(f"Welcome, {player_name}! To the Quest for a Treasure Island!")


if current_level == 1:
    print(f"\nYour starting destination is '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = flip_the_coin.flip_the_coin_game(player_name)

    if result:
        current_level = 2
        game_score += 1000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, flip_the_coin.flip_the_coin_game, player_name)


# ----------------------------------------------------------------------------------------------------------------------

if current_level == 2:
    print(f"\nWelcome to your second destination '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = rock_paper_scissors.rock_paper_scissors_game(player_name)

    if result:
        current_level = 3
        game_score += 2000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, rock_paper_scissors.rock_paper_scissors_game, player_name)
# ----------------------------------------------------------------------------------------------------------------------

if current_level == 3:
    print(f"\nWelcome to your third destination '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = roll_the_dice.roll_the_dice_game(player_name)

    if result:
        current_level = 4
        game_score += 3000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, roll_the_dice.roll_the_dice_game, player_name)
# ----------------------------------------------------------------------------------------------------------------------

if current_level == 4:
    print(f"\nWelcome to your fourth destination '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = odds_evens.odds_and_evens_game(player_name)

    if result:
        current_level = 5
        game_score += 4000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, odds_evens.odds_and_evens_game, player_name)

# ----------------------------------------------------------------------------------------------------------------------
if current_level == 5:
    print(f"\nWelcome to your fifth destination '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = number_guessing.guess_the_number_game(player_name)

    if result:
        current_level = 6
        game_score += 5000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, number_guessing.guess_the_number_game, player_name)
# ----------------------------------------------------------------------------------------------------------------------
if current_level == 6:
    print(f"\nWelcome to your sixth destination '{current_airport}'.")

    display_board(player_name, current_level, game_score, carbon_footprint)

    result = sequence_memory.sequence_memory_game(player_name)

    if result:
        current_level = 7
        game_score += 6000
        carbon_footprint += 1000
        current_airport = airport_and_country(current_level)

        update_progress(current_level, game_score, carbon_footprint, player_Id)

    if not result:
        play_again_or_not(game_score, sequence_memory.sequence_memory_game, player_name)

#clear the player and its progress. if player quits or loose
