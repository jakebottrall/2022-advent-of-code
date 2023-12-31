"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    function letterToPriority(letter) {
        const charCode = letter.charCodeAt(0);
        return charCode >= 97 ? charCode - 96 : charCode - 38;
    }
    const file = fs_1.default.readFileSync("./day_3/input.txt", { encoding: "utf-8" });
    const ruckSacks = file.split("\n");
    const priority = ruckSacks.reduce((sum, ruckSack) => {
        const compartmentSize = ruckSack.length / 2;
        const compartmentOne = ruckSack.slice(0, compartmentSize);
        const compartmentTwo = ruckSack.slice(compartmentSize, ruckSack.length);
        for (const char of compartmentOne) {
            if (compartmentTwo.includes(char)) {
                sum += letterToPriority(char);
                break;
            }
        }
        return sum;
    }, 0);
    return priority;
}, "day_3_puzzle_1");
