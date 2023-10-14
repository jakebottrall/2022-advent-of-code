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
    const crt = new Array(6).fill("");
    const cycle = () => {
        cycleCount++;
        const row = Math.floor((cycleCount - 1) / 40);
        if (Math.abs(((cycleCount - 1) % 40) - x) <= 1) {
            crt[row] += "#";
        }
        else {
            crt[row] += ".";
        }
    };
    file.split("\n").forEach((instruction) => {
        cycle();
        if (instruction.startsWith("addx")) {
            cycle();
            x += +instruction.split(" ")[1];
        }
    });
    return `\n${crt.join("\n")}`;
}, "day_10_puzzle_1");
