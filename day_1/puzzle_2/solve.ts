import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_1/input.txt", { encoding: "utf-8" });

  const elves = file.split("\n\n");

  const calories = elves
    .map((elf) => elf.split("\n").reduce((sum, cal) => (sum += +cal), 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, cal) => (sum += cal), 0);

  return calories;
}, "day_1_puzzle_2");
