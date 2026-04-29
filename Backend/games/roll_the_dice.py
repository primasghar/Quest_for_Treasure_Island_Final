import random
from colorama import Fore, Style

def play_game(name):
    print("Game name: " + Fore.MAGENTA + "ROLL THE DICE")
    print(Style.RESET_ALL)
    print(f"{name}! You will have three opportunities to win the game and go to your next airport destination.")
    print("In each attempt you will roll the dice three times by pressing 'Enter' button. The sum of three rolls")
    print("will be added. If the sum is equal to 12. You will win. ")
    print("So! what are you waiting for, let's keep it rolling.\n")

    win = False
    target = 12
    attempt = 0

    while win != True and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}\n")
        total_of_rolls = 0

        for i in range(1,4):
            input(f"Press Enter: ")

            roll = random.randint(1, 6)

            print(f"You rolled: {roll}\n")
            total_of_rolls = total_of_rolls + roll

        if total_of_rolls >= target:
            print(f"You sum of your rolls is {total_of_rolls} which is equal to 12. You won!")
            win = True
        else:
            print(f"You sum of your rolls is {total_of_rolls} which is not equal to 12. You lost!")
            print("Please try again!")

    if win:
        print("\nCongratulations! You won the game!")
        return win
    else:
        print("\nSorry, You lost the game!")
        return win