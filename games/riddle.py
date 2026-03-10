import random
import query_functions

def play_game(name):
    print(f"""Game name: Riddles
           {name}! You will have three opportunities to win the game and go to your next airport destination.
           Please answer the give riddle correctly.""")

    questions = query_functions.fetch_riddle_query()

    print(questions)
    attempt = 0
    player_won = False
    already_asked = []

    while not  player_won and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}")

        riddle = []

        enter_pressed = input("Press enter to display riddle: ")

        if enter_pressed == "":
            riddle = random.choice(questions)

        if riddle[0] in already_asked:
           break
        else:
            already_asked.append(riddle[0])
            print(f"{riddle[1]}")

        user_answer = input("Please type answer: ").upper()

        if user_answer == riddle[2].upper():
            print("It is a correct answer")
            player_won = True
        elif user_answer != riddle[2]:
            print("It is a wrong answer")

    if player_won:
        print("\nCongratulations! You won the game!")
        return player_won
    else:
        print("\nSorry, you lost the game!")
        return player_won





