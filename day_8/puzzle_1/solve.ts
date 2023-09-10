import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_8/input.txt", { encoding: "utf-8" });

  const rows = file.split("\n").map((row) => row.split("").map(Number));
  const cols = rows[0].map((_, col) => rows.map((row) => row[col]));

  const maxLength = Math.max(rows.length, cols.length);

  const visibleTrees = new Set<string>();

  for (let i = 0; i < maxLength; i++) {
    const row = rows[i];
    const col = cols[i];

    let tallestTreeA = -1;
    let tallestTreeB = -1;
    let tallestTreeC = -1;
    let tallestTreeD = -1;

    for (let j = 0; j < maxLength; j++) {
      if (
        tallestTreeA === 9 &&
        tallestTreeB === 9 &&
        tallestTreeC === 9 &&
        tallestTreeD === 9
      ) {
        break;
      }

      const treeA = row.at(j) ?? -1;
      const treeB = row.at(-1 - j) ?? -1;
      const treeC = col.at(j) ?? -1;
      const treeD = col.at(-1 - j) ?? -1;

      if (treeA > tallestTreeA) {
        tallestTreeA = treeA;
        visibleTrees.add(`${i}-${j}`);
      }

      if (treeB > tallestTreeB) {
        tallestTreeB = treeB;
        visibleTrees.add(`${i}-${row.length - 1 - j}`);
      }

      if (treeC > tallestTreeC) {
        tallestTreeC = treeC;
        visibleTrees.add(`${j}-${i}`);
      }

      if (treeD > tallestTreeD) {
        tallestTreeD = treeD;
        visibleTrees.add(`${col.length - 1 - j}-${i}`);
      }
    }
  }

  return visibleTrees.size;
}, "day_8_puzzle_1");
