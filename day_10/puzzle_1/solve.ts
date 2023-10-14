import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_10/input.txt", { encoding: "utf-8" });

  let x = 1;
  let cycleCount = 0;
  let totalSignalStrength = 0;

  const cycle = () => {
    cycleCount++;
    if ((cycleCount - 20) % 40 === 0) {
      totalSignalStrength += x * cycleCount;
    }
  };

  file.split("\n").forEach((instruction) => {
    cycle();

    if (instruction.startsWith("addx")) {
      cycle();
      x += +instruction.split(" ")[1];
    }
  });

  return totalSignalStrength;
}, "day_10_puzzle_1");
