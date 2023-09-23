import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_8/input.txt", "r") as file:
        rows = [[int(digit) for digit in row] for row in file.read().splitlines()]
        cols = [[row[i] for row in rows] for i in range(len(rows))]

        max_length = max(len(rows), len(cols))

        def score_direction(tree: int, following_trees: list[int]):
            score = 0

            for following_tree in following_trees:
                score += 1

                if tree <= following_tree:
                    break

            return score

        max_score = 0

        for i in range(max_length):
            if i == 0 or i == len(rows) - 1:
                continue

            row = rows[i]

            for j in range(max_length):
                tree = row[j]

                score = (
                    score_direction(tree, row[j + 1 :])
                    * score_direction(tree, reversed(row[:j]))
                    * score_direction(tree, cols[j][i + 1 :])
                    * score_direction(tree, reversed(cols[j][:i]))
                )

                max_score = max(max_score, score)

        return max_score


if __name__ == "__main__":
    benchmark(main, "day_8_puzzle_2")
