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
    function letterToPriority(letter) {
        const charCode = letter.charCodeAt(0);
        return charCode >= 97 ? charCode - 96 : charCode - 38;
    }
    const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    const ruckSackGroups = file.split("\n").reduce((groups, ruckSack, i) => {
        if (i % 3 === 0) {
            groups.push([]);
        }
        groups.at(-1)?.push(ruckSack);
        return groups;
    }, []);
    const priority = ruckSackGroups.reduce((sum, group) => {
        for (const char of group[0]) {
            if (group[1].includes(char) && group[2].includes(char)) {
                sum += letterToPriority(char);
                break;
            }
        }
        return sum;
    }, 0);
    return priority;
});
