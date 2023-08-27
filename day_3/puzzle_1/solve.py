import os
import time
from functools import reduce


def get_file_path():
    directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(directory, "input.txt")


def letter_to_priority(letter: str):
    char_code = ord(letter)
    return char_code - 96 if char_code >= 97 else char_code - 38


def assess_ruck_sack(sum: int, ruck_sack: str):
    compartment_size = len(ruck_sack) // 2

    compartment_one = ruck_sack[:compartment_size]
    compartment_two = ruck_sack[compartment_size : len(ruck_sack)]

    for char in compartment_one:
        if char in compartment_two:
            sum += letter_to_priority(char)
            break

    return sum


def main():
    start_at = time.time()
    file_path = get_file_path()

    with open(file_path, "r") as file:
        ruck_sacks = file.read().splitlines()

        priority = reduce(assess_ruck_sack, ruck_sacks, 0)

        print(f"Answer: {priority}")
        print(f"Solved in: {(time.time() - start_at) * 1000}ms")


if __name__ == "__main__":
    main()
