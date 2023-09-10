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

        visible_trees = set()

        for i in range(max_length):
            row = rows[i]
            col = cols[i]

            tallest_tree_a = -1
            tallest_tree_b = -1
            tallest_tree_c = -1
            tallest_tree_d = -1

            for j in range(max_length):
                if (
                    tallest_tree_a == 9
                    and tallest_tree_b == 9
                    and tallest_tree_c == 9
                    and tallest_tree_d == 9
                ):
                    break

                tree_a = row[j]
                tree_b = row[-1 - j]
                tree_c = col[j]
                tree_d = col[-1 - j]

                if tree_a > tallest_tree_a:
                    tallest_tree_a = tree_a
                    visible_trees.add(f"{i}-{j}")

                if tree_b > tallest_tree_b:
                    tallest_tree_b = tree_b
                    visible_trees.add(f"{i}-{len(row) - 1 - j}")

                if tree_c > tallest_tree_c:
                    tallest_tree_c = tree_c
                    visible_trees.add(f"{j}-{i}")

                if tree_d > tallest_tree_d:
                    tallest_tree_d = tree_d
                    visible_trees.add(f"{len(col) - 1 - j}-{i}")

        return len(visible_trees)


if __name__ == "__main__":
    benchmark(main, "day_8_puzzle_1")
