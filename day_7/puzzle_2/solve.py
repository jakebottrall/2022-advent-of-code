import os
import sys
from collections import defaultdict
from typing import List

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from benchmark.benchmark import benchmark


def main():
    directories = defaultdict(int)
    cwd: List[str] = []

    def handle_cd(command: str):
        next_dir = command.replace("cd ", "")

        if next_dir == "..":
            cwd.pop()
        else:
            cwd.append(next_dir)

    def handle_ls(output: List[str]):
        for dir_or_file in output:
            if not dir_or_file:
                continue

            value, *rest = dir_or_file.split(" ")

            if value == "dir":
                continue

            path = ""

            for dir in cwd:
                path += dir
                directories[path] += int(value)

    with open("./day_7/input.txt", "r") as file:
        for prompt in file.read().split("$ "):
            if len(prompt) == 0:
                continue

            command, *output = prompt.splitlines()

            if command.startswith("cd"):
                handle_cd(command)
            elif command.startswith("ls"):
                handle_ls(output)

        root_dir_size = directories.get("/")
        required_space = 30_000_000 - (70_000_000 - root_dir_size)

        directory_to_be_removed_size = root_dir_size

        for size in directories.values():
            if size > required_space and size < directory_to_be_removed_size:
                directory_to_be_removed_size = size

        return directory_to_be_removed_size


if __name__ == "__main__":
    benchmark(main, "day_7_puzzle_2")
