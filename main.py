import random

print("Quest for Treasure Island")

player_name = input("Please enter your game name: ").upper()

game_score = 0
carbon_footprint = 0
current_airport = "Helsinki Vantaa Airport,Finland"
current_level = 1

print(f"Welcome, adventurer! to the Quest of a Treasure Island.")
print(f" Adventurer: {player_name}\n Current location: {current_airport}\n Game level: {current_level}\n Game score: {game_score}\n Carbon footprints: {carbon_footprint}\n ")

# ------------------------------"ROCK", "PAPER", "SCISSORS"-------------------------------------------------------------

def rock_paper_scissors_game():
    print("Game: Rock Paper Scissors \n")

    # Winning conditions
    # Rock smashes Scissors
    # Paper covers Rock
    # Scissors cuts Paper

    print(f"{player_name}, Please type one option: R for Paper, P for Rock and S for Scissor: ")

    options_list = ["ROCK", "PAPER", "SCISSORS"]

    trial = 0
    player_won = False

    while player_won == False and trial < 3:
        trial += 1
        computer_choice = random.choice(options_list)

        player_picked = input("").upper()
        print(f"player_picked: {player_picked}")
        player_choice = player_picked
        print(f"player_choice: {player_choice}")

        if player_picked == "R":
            player_choice = "ROCK"
        elif player_picked == "P":
            player_choice = "PAPER"
        elif player_picked == "S":
            player_choice = "SCISSORS"
        else:
            print("Please enter a valid input")

        if player_choice == "ROCK" and computer_choice == "SCISSORS":
            player_won = True

        elif player_choice == "PAPER" and computer_choice == "ROCK":
            player_won = True

        elif player_choice == "SCISSORS" and computer_choice == "PAPER":
            player_won = True

        elif computer_choice == "ROCK" and player_choice == "SCISSORS":
            player_won = False

        elif computer_choice == "PAPER" and player_choice == "ROCK":
            player_won = False

        elif computer_choice == "SCISSORS" and player_choice == "PAPER":
            player_won = False

        else:
            player_won = False

    if player_won:
        print("Congratulations! You won.")
    else:
        print("You lost")

rock_paper_scissors_game()




# ----------------------------------------------------------------------------------------------------------------------