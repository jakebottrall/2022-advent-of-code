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
        top_three = sorted_calories[:3]
        top_three_total = sum(top_three)

        return top_three_total


if __name__ == "__main__":
    benchmark(main)
