import os
import sys
from typing import List

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    with open("./day_6/input.txt", "r") as file:
        packet_stream = file.read()

        start_of_packet_marker = -1

        for i in range(len(packet_stream)):
            packet = packet_stream[i : i + 14]
            checked: List[str] = []

            for value in packet:
                if value in checked:
                    break
                checked.append(value)

            if len(checked) == 14:
                start_of_packet_marker = i + 14
                break

        return start_of_packet_marker


if __name__ == "__main__":
    benchmark(main, "day_6_puzzle_2")
