"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_9/input.txt", { encoding: "utf-8" });
    let headPosition = [0, 0];
    let tailPosition = [0, 0];
    const tailPositionHistory = new Set([0]);
    function cantorPairing(x, y) {
        const X = x >= 0 ? 2 * x : -2 * x - 1;
        const Y = y >= 0 ? 2 * y : -2 * y - 1;
        return ((X + Y) * (X + Y + 1)) / 2 + Y;
    }
    file.split("\n").forEach((instruction) => {
        const [direction, steps] = instruction.split(" ");
        for (let i = 0; i < +steps; i++) {
            const prevHeadPosition = [...headPosition];
            let shouldMove = false;
            switch (direction) {
                case "L":
                    headPosition[0] -= 1;
                    shouldMove = tailPosition[0] - headPosition[0] > 1;
                    break;
                case "U":
                    headPosition[1] += 1;
                    shouldMove = headPosition[1] - tailPosition[1] > 1;
                    break;
                case "R":
                    headPosition[0] += 1;
                    shouldMove = headPosition[0] - tailPosition[0] > 1;
                    break;
                case "D":
                    headPosition[1] -= 1;
                    shouldMove = tailPosition[1] - headPosition[1] > 1;
                    break;
            }
            if (shouldMove) {
                tailPosition = prevHeadPosition;
                tailPositionHistory.add(cantorPairing(tailPosition[0], tailPosition[1]));
            }
        }
    });
    return tailPositionHistory.size;
}, "day_9_puzzle_1");
