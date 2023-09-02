import os
import sys
from functools import reduce
from typing import Dict, Literal

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
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

    with open("./day_2/input.txt", "r") as file:
        games = file.read().splitlines()
        score = reduce(assess_game, games, 0)
        return score


if __name__ == "__main__":
    benchmark(main, "day_2_puzzle_2")
