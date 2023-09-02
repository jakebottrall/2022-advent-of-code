import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_5/input.txt", { encoding: "utf-8" });

  const [stacks, instructions] = file.split("\n\n");

  const stackGrid = stacks
    .split("\n")
    .reverse()
    .reduce(
      (grid, row, i) => {
        if (i === 0) {
          return grid;
        }

        row.split("").forEach((char, j) => {
          if (char === " ") {
            return;
          }

          if ((j - 1) % 4 !== 0) {
            return;
          }

          const position = (j - 1) / 4;

          grid[position].push(char);
        });

        return grid;
      },
      [[], [], [], [], [], [], [], [], []] as string[][],
    );

  instructions
    .replaceAll(/\b(move |from |to )\b/g, "")
    .split("\n")
    .forEach((instruction) => {
      const [move, from, to] = instruction.split(" ").map(Number);

      const crates = stackGrid[from - 1].splice(
        stackGrid[from - 1].length - move,
        move,
      );

      stackGrid[to - 1] = stackGrid[to - 1].concat(crates);
    });

  const topCrates = stackGrid.reduce(
    (string, col) => `${string}${col.at(-1)}`,
    "",
  );

  return topCrates;
}, "day_5_puzzle_2");
