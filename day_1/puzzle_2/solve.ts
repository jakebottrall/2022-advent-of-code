import fs from "fs";
import path from "path";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const filePath = path.resolve(__dirname, "input.txt");

  const file = fs.readFileSync(filePath, { encoding: "utf-8" });

  const elves = file.split("\n\n");

  const calories = elves
    .map((elf) => elf.split("\n").reduce((sum, cal) => (sum += +cal), 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, cal) => (sum += cal), 0);

  return calories;
});
