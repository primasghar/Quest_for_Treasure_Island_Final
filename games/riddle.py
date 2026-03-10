import random
import query_functions
from colorama import Fore, Style

def play_game(name):
    print("Game name: " + Fore.MAGENTA + "Riddles")
    print(Style.RESET_ALL)
    print(f"{name}! You will have three opportunities to win the game and go to your next airport destination.")
    print("Please answer the give riddle correctly.")

    riddles = query_functions.fetch_riddle_query()

    attempt = 0
    player_won = False
    already_asked = []

    while not  player_won and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}\n")

        riddle = []

        enter_pressed = input("Press enter to display riddle: ")

        if enter_pressed == "":
            riddle = random.choice(riddles)

        if riddle[0] in already_asked:
           break
        else:
            already_asked.append(riddle[0])
            print(f"{riddle[1]}")

        user_answer = input("Please type answer: ").upper()

        if user_answer == riddle[2].upper():
            print("It is a correct answer")
            player_won = True
        elif user_answer != riddle[2]:
            print("It is a wrong answer")

    if player_won:
        print("\nCongratulations! You won the game!")
        return player_won
    else:
        print("\nSorry, you lost the game!")
        return player_won





