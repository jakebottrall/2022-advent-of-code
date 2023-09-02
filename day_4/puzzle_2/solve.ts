import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_4/input.txt", { encoding: "utf-8" });

  const pairs = file.split("\n");

  const count = pairs.reduce((sum, pair) => {
    const [startA, endA, startB, endB] = pair.split(/[, -]/).map(Number);

    if (startA <= endB && endA >= startB) {
      sum += 1;
    }

    return sum;
  }, 0);

  return count;
}, "day_4_puzzle_2");
