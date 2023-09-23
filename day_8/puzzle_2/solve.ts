import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_8/input.txt", { encoding: "utf-8" });

  const rows = file.split("\n").map((row) => row.split("").map(Number));
  const cols = rows[0].map((_, col) => rows.map((row) => row[col]));

  const maxLength = Math.max(rows.length, cols.length);

  let maxScore = 0;

  const scoreDirection = (tree: number, followingTrees: number[]) => {
    let score = 0;

    for (let i = 0; i < followingTrees.length; i++) {
      score++;

      if (tree <= followingTrees[i]) {
        break;
      }
    }

    return score;
  };

  for (let i = 1; i < maxLength - 1; i++) {
    const row = rows[i];

    for (let j = 1; j < maxLength - 1; j++) {
      const tree = row[j];

      const score =
        scoreDirection(tree, row.slice(j + 1)) *
        scoreDirection(tree, row.slice(0, j).reverse()) *
        scoreDirection(tree, cols[j].slice(i + 1)) *
        scoreDirection(tree, cols[j].slice(0, i).reverse());

      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
}, "day_8_puzzle_2");
