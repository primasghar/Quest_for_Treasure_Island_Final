import random

print("You have 3 chances to roll the dice.\n")

win = False

for i in range(3):
    input(f"Press Enter to roll dice ({i+1}/3)... ")

    roll = random.randint(1, 6)
    print(f"You rolled: {roll}\n")

    if roll == 6:
        win = True

if win:
    print("You got a 6! You WIN!")
else:
    print("No 6 this time. Sorry! you lose the game!")