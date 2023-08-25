import fs from "fs";
import path from "path";

const startAt = performance.now();
const filePath = path.resolve(__dirname, "input.txt");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (err) {
    throw err;
  }

  const elves = data.split("\n\n");

  const calories = elves
    .map((elf) => elf.split("\n").reduce((sum, cal) => (sum += +cal), 0))
    .sort((a, b) => b - a);

  console.log(`Answer: ${calories.at(0)}`);
  console.log(`Solved in: ${performance.now() - startAt}ms`);
});
