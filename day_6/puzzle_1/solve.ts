import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_6/input.txt", { encoding: "utf-8" });

  let startOfPacketMarker = -1;

  for (let i = 0; i < file.length; i++) {
    const packet = file.slice(i, i + 4);
    const checked: string[] = [];

    for (const value of packet) {
      if (checked.includes(value)) {
        break;
      } else {
        checked.push(value);
      }
    }

    if (checked.length === 4) {
      startOfPacketMarker = i + 4;
      break;
    }
  }

  return startOfPacketMarker;
}, "day_6_puzzle_1");
