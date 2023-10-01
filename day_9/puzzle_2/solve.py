import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_9/input.txt", "r") as file:
        rope_length = 10
        rope = [[0, 0] for _ in range(rope_length)]

        tail_position_history = set([0])

        def cantor_pairing(x: int, y: int):
            x_adj = 2 * x if x >= 0 else -2 * x - 1
            y_adj = 2 * y if y >= 0 else -2 * y - 1
            return (x_adj + y_adj) * (x_adj + y_adj + 1) // 2 + y_adj

        direction_mapping = {
            "L": (-1, 0),
            "U": (0, 1),
            "R": (1, 0),
            "D": (0, -1),
        }

        for instruction in file.readlines():
            direction, steps = instruction.split(" ")

            dx, dy = direction_mapping[direction]

            for _ in range(int(steps)):
                rope[0][0] += dx
                rope[0][1] += dy

                for i in range(1, rope_length):
                    dy_diff = rope[i - 1][0] - rope[i][0]
                    dx_diff = rope[i - 1][1] - rope[i][1]

                    if max(abs(dy_diff), abs(dx_diff)) <= 1:
                        break

                    if dy_diff:
                        rope[i][0] += dy_diff // abs(dy_diff)

                    if dx_diff:
                        rope[i][1] += dx_diff // abs(dx_diff)

                    if i == rope_length - 1:
                        tail_position_history.add(cantor_pairing(*rope[i]))

        return len(tail_position_history)


if __name__ == "__main__":
    benchmark(main, "day_9_puzzle_2")
