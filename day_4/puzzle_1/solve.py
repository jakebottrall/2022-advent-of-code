import os

from benchmark import benchmark
import re


def main():
    def get_file_path():
        directory = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(directory, "input.txt")

    file_path = get_file_path()

    with open(file_path, "r") as file:
        pairs = file.read().splitlines()

        count = 0

        for pair in pairs:
            start_a, end_a, start_b, end_b = map(int, re.split(r"[, -]", pair))

            if start_a <= start_b and end_a >= end_b:
                count += 1
            elif start_b <= start_a and end_b >= end_a:
                count += 1

        return count


if __name__ == "__main__":
    benchmark(main)
