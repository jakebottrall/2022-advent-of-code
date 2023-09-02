"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const scoreMap = new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
    ]);
    const file = fs_1.default.readFileSync("./day_2/input.txt", { encoding: "utf-8" });
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
    return score;
}, "day_2_puzzle_2");
