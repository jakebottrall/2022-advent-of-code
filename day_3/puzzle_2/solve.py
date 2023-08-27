import os
import time
from functools import reduce
from typing import List


def get_file_path():
    directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(directory, "input.txt")


def group_ruck_sacks(ruck_sacks: List[List[str]], size: int):
    return [ruck_sacks[i : i + size] for i in range(0, len(ruck_sacks), size)]


def letter_to_priority(letter: str):
    char_code = ord(letter)
    return char_code - 96 if char_code >= 97 else char_code - 38


def assess_group(sum: int, ruck_sacks: List[str]):
    for char in ruck_sacks[0]:
        if char in ruck_sacks[1] and char in ruck_sacks[2]:
            sum += letter_to_priority(char)
            break

    return sum


def main():
    start_at = time.time()
    file_path = get_file_path()

    with open(file_path, "r") as file:
        ruck_sack_groups = group_ruck_sacks(file.read().splitlines(), 3)

        priority = reduce(assess_group, ruck_sack_groups, 0)

        end_at = time.time()

        print(f"Answer: {priority}")
        print(f"Solved in: {(end_at - start_at) * 1000}ms")


if __name__ == "__main__":
    main()
