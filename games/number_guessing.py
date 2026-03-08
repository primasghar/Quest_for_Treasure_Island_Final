import random

def play_game(name):

    print(f"""Game name: GUESS THE NUMBER
                       {name}! You will have three opportunities to win the game and go to your next airport destination.
                       Please select number from 1-10 """)

    attempt = 1
    player_won = False

    while not player_won and attempt <= 3:

        print(f"\nAttempt no: {attempt}\n")

        user_choice = int(input("Enter your choice: "))

        if 0 < user_choice <= 10:
            computer_choice = random.randint(0, 10)
            # print(f"computer choice is {computer_choice}")

            if user_choice == computer_choice:
                print(f"Your chosen number{user_choice} matches the computer's choice {computer_choice}. You won!")
                player_won = True
            else:
                player_won = False
                attempt += 1
                print(f"Your chosen number {user_choice} does not match the computer's choice {computer_choice}. You lost!")
        else:
            player_won = False
            print("Please enter number from 1-10.")

    if player_won:
        print("Congratulations! You won the game!")
        return player_won
    else:
        print("Sorry, you lost the game!")
        return player_won


