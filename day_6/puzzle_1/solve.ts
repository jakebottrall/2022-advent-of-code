import fs from "fs";
import path from "path";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const filePath = path.resolve(__dirname, "input.txt");
  const file = fs.readFileSync(filePath, { encoding: "utf-8" });

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
});
