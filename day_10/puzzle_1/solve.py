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
        total_signal_strength = 0

        def cycle(x, cycle_count, total_signal_strength):
            cycle_count += 1

            if (cycle_count - 20) % 40 == 0:
                total_signal_strength += x * cycle_count

            return [cycle_count, total_signal_strength]

        for instruction in file.readlines():
            cycle_count, total_signal_strength = cycle(
                x, cycle_count, total_signal_strength
            )

            if instruction.startswith("addx"):
                cycle_count, total_signal_strength = cycle(
                    x, cycle_count, total_signal_strength
                )
                x += int(instruction.split(" ")[1])

        return total_signal_strength


if __name__ == "__main__":
    benchmark(main, "day_10_puzzle_1")
