import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  function letterToPriority(letter: string) {
    const charCode = letter.charCodeAt(0);
    return charCode >= 97 ? charCode - 96 : charCode - 38;
  }

  const file = fs.readFileSync("./day_3/input.txt", { encoding: "utf-8" });

  const ruckSackGroups = file.split("\n").reduce((groups, ruckSack, i) => {
    if (i % 3 === 0) {
      groups.push([]);
    }

    groups.at(-1)?.push(ruckSack);

    return groups;
  }, [] as string[][]);

  const priority = ruckSackGroups.reduce((sum, group) => {
    for (const char of group[0]) {
      if (group[1].includes(char) && group[2].includes(char)) {
        sum += letterToPriority(char);
        break;
      }
    }

    return sum;
  }, 0);

  return priority;
}, "day_3_puzzle_2");
