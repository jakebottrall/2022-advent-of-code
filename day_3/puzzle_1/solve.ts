import fs from "fs";
import path from "path";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const filePath = path.resolve(__dirname, "input.txt");

  function letterToPriority(letter: string) {
    const charCode = letter.charCodeAt(0);
    return charCode >= 97 ? charCode - 96 : charCode - 38;
  }

  const file = fs.readFileSync(filePath, { encoding: "utf-8" });

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
});
