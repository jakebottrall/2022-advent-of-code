import os

from benchmark import benchmark


def main():
    def get_file_path():
        directory = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(directory, "input.txt")

    def calculate_total(elf: str):
        return sum(map(int, elf.splitlines()))

    file_path = get_file_path()

    with open(file_path, "r") as file:
        elves = file.read().split("\n\n")
        calories = [calculate_total(elf) for elf in elves]
        sorted_calories = sorted(calories, reverse=True)
        return sorted_calories[0]


if __name__ == "__main__":
    benchmark(main)
