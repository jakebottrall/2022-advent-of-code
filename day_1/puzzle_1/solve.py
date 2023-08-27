import os
import time


def get_file_path():
    directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(directory, "input.txt")


def calculate_total(elf: str):
    return sum(map(int, elf.splitlines()))


def main():
    start_at = time.time()
    file_path = get_file_path()

    with open(file_path, "r") as file:
        elves = file.read().split("\n\n")
        calories = [calculate_total(elf) for elf in elves]
        sorted_calories = sorted(calories, reverse=True)

        end_at = time.time()

        print(f"Answer: {sorted_calories[0]}")
        print(f"Solved in: {(end_at - start_at) * 1000}ms")


if __name__ == "__main__":
    main()
