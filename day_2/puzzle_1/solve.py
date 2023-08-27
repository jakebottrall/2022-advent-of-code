import os
import time
from functools import reduce
from typing import Dict, Literal, NamedTuple


def get_file_path():
    directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(directory, "input.txt")


PlayKey = Literal["A", "B", "C", "X", "Y", "Z"]
PlayName = Literal["rock", "paper", "scissors"]


class Play(NamedTuple):
    choice: PlayName
    beats: PlayName
    score: int


play_dict: Dict[PlayKey, Play] = {
    "A": Play("rock", "scissors", 1),
    "B": Play("paper", "rock", 2),
    "C": Play("scissors", "paper", 3),
    "X": Play("rock", "scissors", 1),
    "Y": Play("paper", "rock", 2),
    "Z": Play("scissors", "paper", 3),
}


def assess_game(sum: int, game: str):
    opponent_score = play_dict[game[0]]
    my_play = play_dict[game[-1]]

    sum += my_play.score

    if my_play.choice == opponent_score.choice:
        sum += 3
    elif my_play.beats == opponent_score.choice:
        sum += 6

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
