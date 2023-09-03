import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_6/input.txt", { encoding: "utf-8" });

  let startOfMessageMarker = -1;

  for (let i = 0; i < file.length; i++) {
    const packet = file.slice(i, i + 14);
    const checked: string[] = [];

    for (const value of packet) {
      if (checked.includes(value)) {
        break;
      } else {
        checked.push(value);
      }
    }

    if (checked.length === 14) {
      startOfMessageMarker = i + 14;
      break;
    }
  }

  return startOfMessageMarker;
}, "day_6_puzzle_2");
