import random

print("Welcome to Odd or Even Game!")
choice = input("Choose Odd or Even: ").lower()

win = False
trial = 0
while win == False and trial < 3:

    trial += 1

    computer_choice = random.randint(1, 5)
    print(f"computer choice: {computer_choice}")
    user_choice =  input(f"\nPress Enter any number between 1-5: ")
    print(f"user_choice: {user_choice}")

    result = computer_choice + int(user_choice)
    print(f"Result: {result}")

    if choice == "even" and result % 2 == 0:
        win = True
    elif choice == "odd" and result % 2 == 1:
        win = True

if win:
    print("\nYou WIN!")
else:
    print("\nYou LOSE! Try again.")