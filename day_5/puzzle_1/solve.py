import os
import re
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_5/input.txt", "r") as file:
        stacks, instructions = file.read().split("\n\n")

        stack_lines = reversed(stacks.splitlines())

        stack_grid = [[] for _ in range(9)]

        for i, row in enumerate(stack_lines):
            if i == 0:
                continue

            for j, char in enumerate(row):
                if char == " ":
                    continue
                if (j - 1) % 4 != 0:
                    continue

                position = (j - 1) // 4

                stack_grid[position].append(char)

        processed_instructions = re.sub(
            r"\b(move |from |to )\b", "", instructions
        ).splitlines()

        for instruction in processed_instructions:
            move, fromm, to = map(int, instruction.split(" "))

            for _ in range(move):
                crate = stack_grid[fromm - 1].pop()
                stack_grid[to - 1].append(crate)

        top_crates = "".join(col[-1] for col in stack_grid)

        return top_crates


if __name__ == "__main__":
    benchmark(main, "day_5_puzzle_1")
