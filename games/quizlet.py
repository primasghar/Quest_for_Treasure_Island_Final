import query_functions

def play_game(name):
    print(f"""Game name: QUIZ
           {name}! You will have three opportunities to win the game and go to your next airport destination.
           Please answer the give question correctly.""")

    questions = query_functions.fetch_quiz_questions_query(1)

    attempt = 0
    player_won = False
    question_no = 0

    while not player_won and attempt < 3:
        attempt += 1
        print(f"\nAttempt no: {attempt}\n")

        question = ""

        enter_pressed = input("Press enter to display question: ")

        if enter_pressed == "":
            question_no +=1
            question = questions[question_no]
            print(f"{question[1]}")

        user_answer = input("Please type answer: ").upper()

        if user_answer == question[2].upper():
            print("It is a correct answer")
            player_won = True
        elif user_answer != question[2]:
            print("It is a wrong answer")

    if player_won:
        print("\nCongratulations! You won the game!")
        return player_won
    else:
        print("\nSorry, you lost the game!")
        return player_won

play_game("Prim")









