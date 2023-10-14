import math
import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_10/input.txt", "r") as file:
        x = 1
        cycle_count = 0
        crt = [""] * 6

        def cycle(x, cycle_count, crt):
            cycle_count += 1

            row = math.floor((cycle_count - 1) / 40)

            if abs(((cycle_count - 1) % 40) - x) <= 1:
                crt[row] += "#"
            else:
                crt[row] += "."

            return [cycle_count, crt]

        for instruction in file.readlines():
            cycle_count, crt = cycle(x, cycle_count, crt)

            if instruction.startswith("addx"):
                cycle_count, crt = cycle(x, cycle_count, crt)
                x += int(instruction.split(" ")[1])

        return "\n".join(crt)


if __name__ == "__main__":
    benchmark(main, "day_10_puzzle_2")
