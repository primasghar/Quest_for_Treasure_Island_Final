import os
from colorama import Fore, Style
from geopy import distance
from games import flip_the_coin,rock_paper_scissors, roll_the_dice, odds_evens, number_guessing,sequence_memory, quizlet, riddle
from query_functions import (add_player_query, player_progress_id_query, fetch_player_progress_query,
                             fetch_game_airport_icao_query, fetch_airport_info_query, fetch_airport_country_query,
                             update_progress_query, delete_player_and_progress_query)

# -----------------------------------FUNCTIONS--------------------------------------------------------------------------

def cls():
    os.system('cls' if os.name=='nt' else 'clear')

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
    name_of_airport_and_country = next_destination[2] + " " + next_destination[5]
    return name_of_airport_and_country

def distance_between_airports(prev, current):
    airport_a = airport_data(prev)
    airport_b = airport_data(current)
    return distance.distance((airport_a[3], airport_a[4]),
                             (airport_b[3], airport_b[4])).km

def calc_c_emission_between_airports(prev_level, current_level):
    avg_co2_per_km = 150
    travelled_distance = int(distance_between_airports(prev_level, current_level))
    average_carbon_emission = travelled_distance * avg_co2_per_km
    return average_carbon_emission

def update_board():
    progress = fetch_player_progress_query(player_Id)

    level = progress[2] + 1
    score = progress[3] + (level * 1000)

    carbon_emission = calc_c_emission_between_airports(progress[2], level)
    carbon_fp = progress[4] + carbon_emission

    update_progress_query(level, score, carbon_fp, player_Id)

def deduct_points():
    progress = fetch_player_progress_query(player_Id)

    level = progress[2]
    score = progress[3] - 500
    carbon_fp = progress[4]

    update_progress_query(level, score, carbon_fp, player_Id)

def display_board():
    progress = fetch_player_progress_query(player_Id)

    level = progress[2]
    score = progress[3]
    c_footprint = progress[4]
    print(Fore.BLUE + f"""
    Adventurer: {player_name}
    Level: {level}
    Game points: {score}
    Carbon emissions: {c_footprint}g\n""")
    print(Style.RESET_ALL)

def play_again_or_not(current_points):
    if current_points == 0:
        print(f"Sorry you don't have enough game points to continue")
        print(f"You can start a new game")
    else:
        print("\nIf you want to play the game again? It will cost you 200 game points. Please enter to play again.")
        print("If you want to quit. Please enter Quit [q]\n")
        play_again = input("Press enter or type Quit[q])").upper()

    if current_points == 0 or play_again == "Q" or play_again == "QUIT":
        exit_game()
        return True

    deduct_points()
    return False



def exit_game():
    print("Game exiting...")
    delete_player_and_progress_query()

# -----------------------------------MAIN GAME--------------------------------------------------------------------------

def play_stage():
    progress = fetch_player_progress_query(player_Id)
    level = progress[2]
    current_points = progress[3]
    print(Fore.GREEN +f"===== Welcome to the level {level} =====")
    print(Style.RESET_ALL)
    print(f"\nYour current destination is {Fore.CYAN + airport_and_country(level)}.")
    print(Style.RESET_ALL)
    display_board()

    game_result = False

    if level == 1:
        game_result = flip_the_coin.play_game(player_name)

    if level == 2:
        game_result = rock_paper_scissors.play_game(player_name)

    if level == 3:
        game_result = roll_the_dice.play_game(player_name)

    if level == 4:
        game_result = odds_evens.play_game(player_name)

    if level == 5:
        game_result = number_guessing.play_game(player_name)

    if level == 6:
        game_result = sequence_memory.play_game(player_name)

    if level == 7:
        game_result = quizlet.play_game(player_name)

    if level == 8:
        game_result = riddle.play_game(player_name)

    if game_result:
        update_board()
        cls()

    if game_result and level == 8:
        print(Fore.GREEN)
        print(f"Congratulation you have completed the final level")
        print(f"You have found the person who will guide you to the tressure island")
        print(Style.RESET_ALL)
        exit_game()
        return True

    if not game_result:
        return play_again_or_not(current_points)

    return False

# GAME START

print(Fore.GREEN)
print("""\
  ___                  _      __                                      
 / _ \ _   _  ___  ___| |_   / _| ___  _ __                           
| | | | | | |/ _ \/ __| __| | |_ / _ \| '__|                          
| |_| | |_| |  __/\__ \ |_  |  _| (_) | |                             
 \__\_\\__,_|\___||___/\__| |_|  \___/|_| ___     _                 _ 
|_   _| __ ___  __ _ ___ _   _ _ __ ___  |_ _|___| | __ _ _ __   __| |
  | || '__/ _ \/ _` / __| | | | '__/ _ \  | |/ __| |/ _` | '_ \ / _` |
  | || | |  __/ (_| \__ \ |_| | | |  __/  | |\__ \ | (_| | | | | (_| |
  |_||_|  \___|\__,_|___/\__,_|_|  \___| |___|___/_|\__,_|_| |_|\__,_|
       """)
print(Style.RESET_ALL)
player_name = input("Please enter your game name: ").upper()

# Adds player in "player" table return newly formed id (PK)
player_Id = add_player_query(player_name)

# if new player id exists, player_Id is added to "progress" table and return player's progress table id.
if player_Id:
    player_progress_id_query(player_Id)

player_progress_data = fetch_player_progress_query(player_Id)

print()
print(f"Welcome {player_name}! To the Quest for a Treasure Island!")
print()
# ---------------------------------------------------------------------------------------------------------------------
game_over =  False
while not game_over:
    game_over = play_stage()



