"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const startAt = performance.now();
const filePath = path_1.default.resolve(__dirname, "input.txt");
const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
const elves = file.split("\n\n");
const calories = elves
    .map((elf) => elf.split("\n").reduce((sum, cal) => (sum += +cal), 0))
    .sort((a, b) => b - a)
    .at(0);
const endAt = performance.now();
console.log(`Answer: ${calories}`);
console.log(`Solved in: ${endAt - startAt}ms`);
