"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const filePath = path_1.default.resolve(__dirname, "input.txt");
    const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    const [stacks, instructions] = file.split("\n\n");
    const stackGrid = stacks
        .split("\n")
        .reverse()
        .reduce((grid, row, i) => {
        if (i === 0) {
            return grid;
        }
        row.split("").forEach((char, j) => {
            if (char === " ") {
                return;
            }
            if ((j - 1) % 4 !== 0) {
                return;
            }
            const position = (j - 1) / 4;
            grid[position].push(char);
        });
        return grid;
    }, [[], [], [], [], [], [], [], [], []]);
    instructions
        .replaceAll(/\b(move |from |to )\b/g, "")
        .split("\n")
        .forEach((instruction) => {
        const [move, from, to] = instruction.split(" ").map(Number);
        const crates = stackGrid[from - 1].splice(stackGrid[from - 1].length - move, move);
        stackGrid[to - 1] = stackGrid[to - 1].concat(crates);
    });
    const topCrates = stackGrid.reduce((string, col) => `${string}${col.at(-1)}`, "");
    return topCrates;
});
