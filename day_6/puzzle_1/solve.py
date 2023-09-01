import os
from typing import List
from benchmark import benchmark


def main():
    directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(directory, "input.txt")

    with open(file_path, "r") as file:
        packet_stream = file.read()

        start_of_packet_marker = -1

        for i in range(len(packet_stream)):
            packet = packet_stream[i : i + 4]
            checked: List[str] = []

            for value in packet:
                if value in checked:
                    break
                checked.append(value)

            if len(checked) == 4:
                start_of_packet_marker = i + 4
                break

        return start_of_packet_marker


if __name__ == "__main__":
    benchmark(main)
