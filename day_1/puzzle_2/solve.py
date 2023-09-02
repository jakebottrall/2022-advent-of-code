import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    def calculate_total(elf: str):
        return sum(map(int, elf.splitlines()))

    with open("./day_1/input.txt", "r") as file:
        elves = file.read().split("\n\n")
        calories = [calculate_total(elf) for elf in elves]
        sorted_calories = sorted(calories, reverse=True)
        top_three = sorted_calories[:3]
        top_three_total = sum(top_three)

        return top_three_total


if __name__ == "__main__":
    benchmark(main, "day_1_puzzle_2")
