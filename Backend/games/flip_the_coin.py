import random
from colorama import Fore, Style

def play_game(name):
        print("Game name: " + Fore.MAGENTA + "FLIP THE COIN")
        print(Style.RESET_ALL)
        print(f"{name}! You will have three opportunities to win the game and go to your next airport destination.")
        print("Please select one option: (HEADS [h] or TAILS[t]).\n")

        attempt = 0
        player_won = False

        while not player_won and attempt < 3:
            attempt += 1
            print(f"\nAttempt no: {attempt}\n")

            computer_choice = random.choice(["HEADS", "TAILS"])
            print(f"result: {computer_choice}")

            random_adjectives = random.choice(["amazing", "incredible","awesome", "impressive", "accurate" ])

            player_picked = input("Enter your choice: ").capitalize()
            player_choice = ""

            if player_picked == "H" or player_picked == "HEADS":
                player_choice = "HEADS"
            elif player_picked == "T" or player_picked == "TAILS":
                player_choice = "TAILS"
            else:
                print("Please enter a valid input")

            # print(f"player-choice: {player_choice}")

            if player_choice == "HEADS" or player_choice == "TAILS":

                if player_choice == computer_choice:
                    player_won = True
                    print(f"{player_choice}, What an {random_adjectives} guess.")

                elif player_choice != computer_choice :
                    print(f"{player_choice} is not a correct guess.")
                    if attempt <=2:
                        print("Please try again!")


        if player_won:
            print("\nCongratulations! You won the game!")
            return player_won
        else:
            print("\nSorry, you lost the game!")
            return player_won

