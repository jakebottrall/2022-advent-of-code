import os
import re
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_4/input.txt", "r") as file:
        pairs = file.read().splitlines()

        count = 0

        for pair in pairs:
            start_a, end_a, start_b, end_b = map(int, re.split(r"[, -]", pair))

            if start_a <= end_b and end_a >= start_b:
                count += 1

        return count


if __name__ == "__main__":
    benchmark(main, "day_4_puzzle_2")
