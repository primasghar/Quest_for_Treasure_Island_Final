import string
import random
import time
from colorama import Fore, Style
def play_game(name):
    print("Game name: " + Fore.MAGENTA + "SEQUENCE MEMORY GAME")
    print(Style.RESET_ALL)
    print(f"{name}! You will have three opportunities to win the game and go to your next airport destination.")
    print("A random sequence of 8 capital alphabets will be displayed for 8 seconds, after that you will have to type the sequence.")
    print("Good Luck!!! \n")

    attempt = 0
    user_entered_sequence = ""
    random_sequence = ""

    while (random_sequence == "" or user_entered_sequence != random_sequence) and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}\n")

        letters = string.ascii_uppercase
        sequence_size = 8
        delimiter = ""

        user_permission = input("Press enter to see the sequence. Display time is 8 seconds: ")
        if user_permission == "":

            random_sequence = delimiter.join((random.choices(letters, k=sequence_size)))
            print(random_sequence)
            time.sleep(8)

            print("\033[A", end="\r") # Clear the code
            print(8 * '\b' + "Please enter the sequence")

        user_entered_sequence = input("Enter sequence: ")

    if user_entered_sequence == random_sequence:
        print("\nCongratulations! You did it")
        print(f"Your sequence: {user_entered_sequence} matched {random_sequence}")
        return True
    else:
        print(f"\nSorry! Your sequence: {user_entered_sequence} does not match {random_sequence}. You have lost")
        return False

