import random
from colorama import Fore, Style

def play_game(name):
    print("Game name: " + Fore.MAGENTA + "ODDS and EVENS")
    print(Style.RESET_ALL)
    print(f"{name}! You will have three opportunities to win the game and go to your next airport destination.")
    print("At first you will enter your choice 1 for 'EVEN' or 2 for 'ODD'. Then you will enter any number of your choice (1-10).")
    print("Your entered number will be added to the computer's chosen number. If their sum matches your EVEN or ODD choice you will win.\n")


    win = False
    attempt = 1

    while win == False and attempt <= 3:
        print(f"\nAttempt no: {attempt}\n")

        your_choice = int(input("Odd [1] or Even [2]: "))
        choice = your_choice

        if your_choice == 1:
            choice = "ODD"
        elif your_choice == 2:
            choice = "EVEN"
        else:
            print("Please enter a valid input")

        if choice == "EVEN" or choice == "ODD":

            computer_choice = random.randint(1, 10)
            print(f"computer choice: {computer_choice}")

            user_choice =  int(input(f"\nPress Enter any number between 1-10: "))
            print(f"user_choice: {user_choice}")

            if user_choice >= 1 or user_choice <= 10:

                result = computer_choice + user_choice
                print(f"Result: {result}")

                if choice == "EVEN" and result % 2 == 0:
                    print(f"You chose {choice} and the sum of your's and computer's number is {result}, that is an {choice} number. You won!")
                    win = True
                elif choice == "ODD" and result % 2 == 1:
                    print(f"You chose {choice} and the sum of your's and computer's number is {result}, that is an {choice} number. You won!")
                    win = True
                else:
                    attempt += 1
                    print(f"You chose {choice} and the sum of your's and computer's number is {result} and is not an {choice} number. You lost!")
            else:
                attempt += 1
                print("Please enter valid number from 1 to 10")

    if win:
        print("\nCongratulations! You won the game!")
        return win
    else:
        print("\nSorry, You lost the game!")
        return win
