"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_9/input.txt", { encoding: "utf-8" });
    const ropeLength = 10;
    const rope = Array.from({ length: ropeLength }, () => [0, 0]);
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
            rope[0][0] += dx;
            rope[0][1] += dy;
            for (let j = 1; j < ropeLength; j++) {
                const dyDiff = rope[j - 1][0] - rope[j][0];
                const dxDiff = rope[j - 1][1] - rope[j][1];
                if (Math.max(Math.abs(dyDiff), Math.abs(dxDiff)) <= 1) {
                    break;
                }
                if (dyDiff) {
                    rope[j][0] += Math.sign(dyDiff);
                }
                if (dxDiff) {
                    rope[j][1] += Math.sign(dxDiff);
                }
                if (j === ropeLength - 1) {
                    tailPositionHistory.add(cantorPairing(...rope[j]));
                }
            }
        }
    });
    return tailPositionHistory.size;
}, "day_9_puzzle_2");
