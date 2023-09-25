import os
import sys

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_9/input.txt", "r") as file:
        head_position = [0, 0]
        tail_position = [0, 0]

        tail_position_history = set([0])

        def cantor_pairing(x: int, y: int):
            x_adj = 2 * x if x >= 0 else -2 * x - 1
            y_adj = 2 * y if y >= 0 else -2 * y - 1
            return (x_adj + y_adj) * (x_adj + y_adj + 1) // 2 + y_adj

        for instruction in file.readlines():
            direction, steps = instruction.split(" ")

            for _ in range(int(steps)):
                prev_head_position = head_position.copy()

                should_move = False

                match direction:
                    case "L":
                        head_position[0] -= 1
                        should_move = tail_position[0] - head_position[0] > 1
                    case "U":
                        head_position[1] += 1
                        should_move = head_position[1] - tail_position[1] > 1
                    case "R":
                        head_position[0] += 1
                        should_move = head_position[0] - tail_position[0] > 1
                    case "D":
                        head_position[1] -= 1
                        should_move = tail_position[1] - head_position[1] > 1

                if should_move:
                    tail_position = prev_head_position
                    tail_position_history.add(cantor_pairing(*tail_position))

        return len(tail_position_history)


if __name__ == "__main__":
    benchmark(main, "day_9_puzzle_1")
