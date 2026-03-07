import random

# Winning conditions
# Rock smashes Scissors
# Paper covers Rock
# Scissors cuts Paper

def rock_paper_scissors_game(name):
    print(f"""Game name: ROCK PAPER SCISSORS
           {name}! You will have three opportunities to win the game and go to your next airport destination.
           'Draw' is not counted as a loss.
           Please select one option: (Rock [R], Paper[P] or Scissor [S]\n""")

    player_won = False
    attempt = 1

    while not player_won and attempt  <= 3:

        options_list = ["ROCK", "PAPER", "SCISSORS"]

        computer_choice = random.choice(options_list)
        # print(f"computer_choice: {computer_choice}")

        player_picked = input("Enter your choice: ").upper()
        player_choice = player_picked

        if player_picked == "R" or player_picked == "ROCK":
            player_choice = "ROCK"
        elif player_picked == "P" or player_picked == "PAPER":
            player_choice = "PAPER"
        elif player_picked == "S" or player_picked == "SCISSORS":
            player_choice = "SCISSORS"
        else:
            print("Please enter a valid input")
            # The game won't start until the user enters a valid input.

        if player_choice == "ROCK" or player_choice == "PAPER" or player_choice == "SCISSORS":
            print(f"Attempt no: {attempt}")

            if player_choice == "ROCK" and computer_choice == "SCISSORS":
                player_won = True
                print(f"You choose {player_choice} and computer choose {computer_choice}. You won!")

            elif player_choice == "PAPER" and computer_choice == "ROCK":
                player_won = True
                print(f"You choose {player_choice} and computer choose {computer_choice}. You won!")

            elif player_choice == "SCISSORS" and computer_choice == "PAPER":
                player_won = True
                print(f"You choose {player_choice} and computer choose {computer_choice}. You won!")

            elif computer_choice == "ROCK" and player_choice == "SCISSORS":
                player_won = False
                attempt  += 1
                print(f"You choose {player_choice} and computer choose {computer_choice}. You lost!")
                if attempt  < 3:
                    print("Please try again!\n")

            elif computer_choice == "PAPER" and player_choice == "ROCK":
                player_won = False
                attempt  += 1
                print(f"You choose {player_choice} and computer choose {computer_choice}. You lost!")
                if attempt  < 3:
                    print("Please try again!\n")

            elif computer_choice == "SCISSORS" and player_choice == "PAPER":
                player_won = False
                attempt  += 1
                print(f"You choose {player_choice} and computer choose {computer_choice}. You lost!")
                if attempt  < 3:
                    print("Please try again!\n")

            if computer_choice == player_choice:
                print(f"You choose {player_choice} and computer choose {computer_choice}. It's a DRAW.")
                print("Please try again!\n")


    if player_won:

        print("\nCongratulations! You have won the game.")
        return player_won
    else:
        print("\nSorry! You have lost the game.")
        return player_won





