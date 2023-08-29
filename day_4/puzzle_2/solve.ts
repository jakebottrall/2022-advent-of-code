import fs from "fs";
import path from "path";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const filePath = path.resolve(__dirname, "input.txt");
  const file = fs.readFileSync(filePath, { encoding: "utf-8" });

  const pairs = file.split("\n");

  const count = pairs.reduce((sum, pair) => {
    const [startA, endA, startB, endB] = pair.split(/[, -]/).map(Number);

    if (startA <= endB && endA >= startB) {
      sum += 1;
    }

    return sum;
  }, 0);

  return count;
});
