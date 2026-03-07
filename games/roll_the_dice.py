import random

def roll_the_dice_game(name):
    print(f"""Game name: ROLL THE DICE
           {name}! You will have three opportunities to win the game and go to your next airport destination.
           Please press enter key to roll the dice and try your luck to get a 6.\n""")
    win = False

    for i in range(3):

        input(f"Press Enter: ")
        print(f"Attempt no: {i+1}")

        roll = random.randint(1, 6)
        print(f"You rolled: {roll}\n")

        if roll == 6:
            win = True

    if win:
        print("\nCongratulations! You won the game!")
    else:
        print("\nSorry, you lost the game!")

roll_the_dice_game("Prim")