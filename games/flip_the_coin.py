import random

def flip_the_coin_game():

        print("""Game: Flip The Coin
        You will have 3 opportunities to win the game and go to the your next airport destination.
        Please select one option HEADS OR TAILS.\n""")

        trails = 0

        player_won = False

        while not player_won and trails < 3:
            user_choice = input("Enter your choice: ").capitalize()
            computer_choice = random.choice(["Heads", "Tails"])

            trails += 1

            if user_choice == computer_choice:
                player_won = True

        if player_won:
            print("Congratulations! You won the game!")
        else:
            print("Sorry, you lost the game!")

flip_the_coin_game()
