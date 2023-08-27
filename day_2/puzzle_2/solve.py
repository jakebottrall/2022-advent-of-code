import os
import time
from functools import reduce
from typing import Dict, Literal, NamedTuple


def get_file_path():
    directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(directory, "input.txt")


ScoreKey = Literal["A", "B", "C"]
ResultKey = Literal["X", "Y", "Z"]


SCORE_DICT: Dict[ScoreKey, int] = {
    "A": 1,
    "B": 2,
    "C": 3,
}


def assess_game(sum: int, game: str):
    opponent_score = SCORE_DICT[game[0]]
    result: ResultKey = game[-1]

    if result == "X":
        sum += opponent_score - 1 or 3
    elif result == "Y":
        sum += 3
        sum += opponent_score
    elif result == "Z":
        sum += 6
        sum += (opponent_score + 1) % 4 or 1

    return sum


def main():
    start_at = time.time()
    file_path = get_file_path()

    with open(file_path, "r") as file:
        games = file.read().splitlines()

        score = reduce(assess_game, games, 0)

        end_at = time.time()

        print(f"Answer: {score}")
        print(f"Solved in: {(end_at - start_at) * 1000}ms")


if __name__ == "__main__":
    main()
