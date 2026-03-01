import random

# Winning conditions
# Rock smashes Scissors
# Paper covers Rock
# Scissors cuts Paper

def rock_paper_scissors_game(player_name):
    print(f"""Game: Rock Paper Scissors
        {player_name} you will have three opportunities to win the game and go to your next airport destination.
        Please select one option: `R´ for Rock, `P´ for Paper and `S´ for Scissor\n""")

    options_list = ["ROCK", "PAPER", "SCISSORS"]

    computer_choice = random.choice(options_list)

    print(f"computer_choice: {computer_choice}")

    trial = 0
    player_won = False

    while player_won == False and trial < 3:
        trial += 1
        print(f"trial: {trial}")

        player_picked = input("Enter your choice: ").upper()

        player_choice = player_picked

        if player_picked == "R":
            player_choice = "ROCK"
        elif player_picked == "P":
            player_choice = "PAPER"
        elif player_picked == "S":
            player_choice = "SCISSORS"
        else:
            print("Please enter a valid input")

        print(f"player_choice: {player_choice}")

        if player_choice == "ROCK" or player_choice == "PAPER" or player_choice == "SCISSORS":

            if player_choice == "ROCK" and computer_choice == "SCISSORS":
                player_won = True

            elif player_choice == "PAPER" and computer_choice == "ROCK":
                player_won = True

            elif player_choice == "SCISSORS" and computer_choice == "PAPER":
                player_won = True

            elif computer_choice == "ROCK" and player_choice == "SCISSORS":
                player_won = False
                if trial < 2:
                    print("Please try again")

            elif computer_choice == "PAPER" and player_choice == "ROCK":
                player_won = False
                if trial <= 2:
                    print("Please try again")

            elif computer_choice == "SCISSORS" and player_choice == "PAPER":
                player_won = False
                if trial <= 2:
                    print("Please try again")
            elif computer_choice == player_choice:
                player_won = False
                print("Its a draw")
                if trial <= 2:
                    print("Please try again")


    if player_won:
        print("Congratulations! You won.")
    else:
        print("You lost.")


