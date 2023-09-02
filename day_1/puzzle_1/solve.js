"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_1/input.txt", { encoding: "utf-8" });
    const elves = file.split("\n\n");
    const calories = elves
        .map((elf) => elf.split("\n").reduce((sum, cal) => (sum += +cal), 0))
        .sort((a, b) => b - a)
        .at(0);
    return calories ?? -1;
}, "day_1_puzzle_1");
