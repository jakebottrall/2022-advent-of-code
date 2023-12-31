import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  type PlayKey = "A" | "B" | "C" | "X" | "Y" | "Z";
  type PlayName = "rock" | "paper" | "scissors";
  type Play = { choice: PlayName; beats: PlayName; score: number };

  const playMap: Map<PlayKey, Play> = new Map([
    ["A", { choice: "rock", beats: "scissors", score: 1 }],
    ["B", { choice: "paper", beats: "rock", score: 2 }],
    ["C", { choice: "scissors", beats: "paper", score: 3 }],
    ["X", { choice: "rock", beats: "scissors", score: 1 }],
    ["Y", { choice: "paper", beats: "rock", score: 2 }],
    ["Z", { choice: "scissors", beats: "paper", score: 3 }],
  ]);

  const file = fs.readFileSync("./day_2/input.txt", { encoding: "utf-8" });

  const games = file.split("\n");

  const score = games.reduce((sum, game) => {
    const opponentPlay = playMap.get(game.at(0) as PlayKey);
    const myPlay = playMap.get(game.at(-1) as PlayKey);

    if (!opponentPlay || !myPlay) {
      throw new Error("🤔");
    }

    sum += myPlay.score;

    if (myPlay.choice === opponentPlay.choice) {
      sum += 3;
    } else if (myPlay.beats === opponentPlay.choice) {
      sum += 6;
    }

    return sum;
  }, 0);

  return score;
}, "day_2_puzzle_1");
