import string
import random

# All letters and numbers from which the random combination will be generated.
letters_and_numbers = string.ascii_uppercase + string.digits
# print(letters_and_numbers)

sequence_size = 10
print("".join(random.choices(letters_and_numbers, k = sequence_size)))