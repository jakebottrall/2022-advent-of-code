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
    const pairs = file.split("\n");
    const count = pairs.reduce((sum, pair) => {
        const [startA, endA, startB, endB] = pair.split(/[, -]/).map(Number);
        if (startA <= startB && endA >= endB) {
            sum += 1;
        }
        else if (startB <= startA && endB >= endA) {
            sum += 1;
        }
        return sum;
    }, 0);
    return count;
});
