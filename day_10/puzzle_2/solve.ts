import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_10/input.txt", { encoding: "utf-8" });

  let x = 1;
  let cycleCount = 0;

  const crt: string[] = new Array(6).fill("");

  const cycle = () => {
    cycleCount++;

    const row = Math.floor((cycleCount - 1) / 40);

    if (Math.abs(((cycleCount - 1) % 40) - x) <= 1) {
      crt[row] += "#";
    } else {
      crt[row] += ".";
    }
  };

  file.split("\n").forEach((instruction) => {
    cycle();

    if (instruction.startsWith("addx")) {
      cycle();
      x += +instruction.split(" ")[1];
    }
  });

  return `\n${crt.join("\n")}`;
}, "day_10_puzzle_2");
