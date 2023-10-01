import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_9/input.txt", "r") as file:
        head_position = (0, 0)
        tail_position = (0, 0)

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
                prev_head_position = head_position
                head_position = (head_position[0] + dx, head_position[1] + dy)

                should_move = False

                if direction in ["L", "R"]:
                    should_move = abs(tail_position[0] - head_position[0]) > 1
                elif direction in ["U", "D"]:
                    should_move = abs(tail_position[1] - head_position[1]) > 1

                if should_move:
                    tail_position = prev_head_position
                    tail_position_history.add(cantor_pairing(*tail_position))

        return len(tail_position_history)


if __name__ == "__main__":
    benchmark(main, "day_9_puzzle_1")
