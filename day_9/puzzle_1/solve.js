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
    const directionMapping = {
        L: [-1, 0],
        U: [0, 1],
        R: [1, 0],
        D: [0, -1],
    };
    file.split("\n").forEach((instruction) => {
        const [direction, steps] = instruction.split(" ");
        const [dx, dy] = directionMapping[direction];
        for (let i = 0; i < +steps; i++) {
            const prevHeadPosition = [...headPosition];
            headPosition[0] += dx;
            headPosition[1] += dy;
            let shouldMove = false;
            if (direction === "L" || direction === "R") {
                shouldMove = Math.abs(tailPosition[0] - headPosition[0]) > 1;
            }
            else if (direction === "U" || direction === "D") {
                shouldMove = Math.abs(headPosition[1] - tailPosition[1]) > 1;
            }
            if (shouldMove) {
                tailPosition = prevHeadPosition;
                tailPositionHistory.add(cantorPairing(tailPosition[0], tailPosition[1]));
            }
        }
    });
    return tailPositionHistory.size;
}, "day_9_puzzle_1");
