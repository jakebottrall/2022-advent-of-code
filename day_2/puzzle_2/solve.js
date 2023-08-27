"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const startAt = performance.now();
const filePath = path_1.default.resolve(__dirname, "input.txt");
const scoreMap = new Map([
    ["A", 1],
    ["B", 2],
    ["C", 3],
]);
const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
const games = file.split("\n");
const score = games.reduce((sum, game) => {
    const oppenentScore = scoreMap.get(game.at(0));
    if (oppenentScore === undefined) {
        throw new Error("🤔");
    }
    switch (game.at(-1)) {
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
const endAt = performance.now();
console.log(`Answer: ${score}`);
console.log(`Solved in: ${endAt - startAt}ms`);
