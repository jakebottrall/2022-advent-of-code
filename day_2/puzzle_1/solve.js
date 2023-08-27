"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const startAt = performance.now();
const filePath = path_1.default.resolve(__dirname, "input.txt");
const playMap = new Map([
    ["A", { choice: "rock", beats: "scissors", score: 1 }],
    ["B", { choice: "paper", beats: "rock", score: 2 }],
    ["C", { choice: "scissors", beats: "paper", score: 3 }],
    ["X", { choice: "rock", beats: "scissors", score: 1 }],
    ["Y", { choice: "paper", beats: "rock", score: 2 }],
    ["Z", { choice: "scissors", beats: "paper", score: 3 }],
]);
const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
const games = file.split("\n");
const score = games.reduce((sum, game) => {
    const opponentPlay = playMap.get(game.at(0));
    const myPlay = playMap.get(game.at(-1));
    if (!opponentPlay || !myPlay) {
        throw new Error("🤔");
    }
    sum += myPlay.score;
    if (myPlay.choice === opponentPlay.choice) {
        sum += 3;
    }
    else if (myPlay.beats === opponentPlay.choice) {
        sum += 6;
    }
    return sum;
}, 0);
const endAt = performance.now();
console.log(`Answer: ${score}`);
console.log(`Solved in: ${endAt - startAt}ms`);
