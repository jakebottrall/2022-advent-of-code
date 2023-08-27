import fs from "fs";
import path from "path";

const startAt = performance.now();
const filePath = path.resolve(__dirname, "input.txt");

type ScoreKey = "A" | "B" | "C";
type ResultKey = "X" | "Y" | "Z";

const scoreMap: Map<ScoreKey, number> = new Map([
  ["A", 1],
  ["B", 2],
  ["C", 3],
]);

const file = fs.readFileSync(filePath, { encoding: "utf-8" });

const games = file.split("\n");

const score = games.reduce((sum, game) => {
  const oppenentScore = scoreMap.get(game.at(0) as ScoreKey);

  if (oppenentScore === undefined) {
    throw new Error("🤔");
  }

  switch (game.at(-1) as ResultKey) {
    case "X":
      sum += oppenentScore - 1 || 3;
      break;
    case "Y":
      sum += 3;
      sum += oppenentScore;
      break;
    case "Z":
      sum += 6;
      sum += (oppenentScore + 1) % 4 || 1;
      break;
    default:
      break;
  }

  return sum;
}, 0);

console.log(`Answer: ${score}`);
console.log(`Solved in: ${performance.now() - startAt}ms`);
