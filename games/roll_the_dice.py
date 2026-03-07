import random

def roll_the_dice_game(name):
    print(f"""Game name: ROLL THE DICE
           {name}! You will have three opportunities to win the game and go to your next airport destination.
           In each attempt you will roll the dice three times by pressing "Enter" button. The sum of three rolls 
           will be added. If the sum is equal to 12. You will win.  
           So! what are you waiting for, let's keep it rolling.\n""")

    win = False
    lucky_number = 12
    attempt = 0

    while win != True and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}\n")
        roll_list = []


        for i in range(1,4):
            input(f"Press Enter: ")

            roll = random.randint(1, 10)

            print(f"You rolled: {roll}\n")
            roll_list.append(roll)

        total_of_rolls = sum(roll_list)

        if total_of_rolls == lucky_number:
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