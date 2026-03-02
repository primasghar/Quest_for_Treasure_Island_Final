import string
import random
import time

def sequence_memory_game():

    letters_and_numbers = string.ascii_uppercase
    # print(letters_and_numbers)

    sequence_size = 8
    delimiter = ""
    random_sequence = delimiter.join((random.choices(letters_and_numbers, k=sequence_size)))

    print(random_sequence, end='')
    time.sleep(8)
    print(8 * '\b' + "Please enter the sequence")

    trial = 0
    user_entered_sequence = ""

    while user_entered_sequence != random_sequence and trial < 3:
        trial += 1
        user_entered_sequence = input("Enter sequence: ")
        # print(f"trial: {trial}")


    if user_entered_sequence == random_sequence:
        print("Congratulations! You did it")
        print(f"Your sequence: {user_entered_sequence} matched {random_sequence}")
    else:
        print(f"Sorry! Your sequence: {user_entered_sequence} does not match {random_sequence}. You have lost")


sequence_memory_game()