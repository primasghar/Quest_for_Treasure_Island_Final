import query_functions
import random

# list to save already asked questions
asked_them_already = []

def quiz_question():
    # fetching questions list with difficulty level 1
    questions = query_functions.fetch_quiz_questions_query(1)
    # fetching one random question from list
    question = random.choice(questions)
    # Check: if the questions has been already asked using id
    for ques in asked_them_already:
        if ques[0] == question[0]:
            break
