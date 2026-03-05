import random

def guess_the_number_game():

        print("""Game: Guess the Number
        You will have 3 opportunities to win the game and go to the your next airport destination.
        Please select one number 0 to 10\n""")

        trails = 0

        player_won = False

        while not player_won and trails < 3:
            user_choice = input("Enter your choice: ").capitalize()
            computer_choice = random.randint(0, 10)

            print(f"computer choice is {computer_choice}")
            trails += 1

            if user_choice == computer_choice:
                player_won = True

        if player_won:
            print("Congratulations! You won the game!")
        else:
            print("Sorry, you lost the game!")

guess_the_number_game()

