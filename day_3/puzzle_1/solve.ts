import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  function letterToPriority(letter: string) {
    const charCode = letter.charCodeAt(0);
    return charCode >= 97 ? charCode - 96 : charCode - 38;
  }

  const file = fs.readFileSync("./day_3/input.txt", { encoding: "utf-8" });

  const ruckSacks = file.split("\n");

  const priority = ruckSacks.reduce((sum, ruckSack) => {
    const compartmentSize = ruckSack.length / 2;

    const compartmentOne = ruckSack.slice(0, compartmentSize);
    const compartmentTwo = ruckSack.slice(compartmentSize, ruckSack.length);

    for (const char of compartmentOne) {
      if (compartmentTwo.includes(char)) {
        sum += letterToPriority(char);
        break;
      }
    }

    return sum;
  }, 0);

  return priority;
}, "day_3_puzzle_1");
