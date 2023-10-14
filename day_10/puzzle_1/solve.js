"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_10/input.txt", { encoding: "utf-8" });
    let x = 1;
    let cycleCount = 0;
    let totalSignalStrength = 0;
    const cycle = () => {
        cycleCount++;
        if ((cycleCount - 20) % 40 === 0) {
            totalSignalStrength += x * cycleCount;
        }
    };
    file.split("\n").forEach((instruction) => {
        cycle();
        if (instruction.startsWith("addx")) {
            cycle();
            x += +instruction.split(" ")[1];
        }
    });
    return totalSignalStrength;
}, "day_10_puzzle_1");
