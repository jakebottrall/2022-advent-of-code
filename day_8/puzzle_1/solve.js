"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_8/input.txt", { encoding: "utf-8" });
    const rows = file.split("\n").map((row) => row.split("").map(Number));
    const cols = rows[0].map((_, col) => rows.map((row) => row[col]));
    const maxLength = Math.max(rows.length, cols.length);
    const visibleTrees = new Set();
    for (let i = 0; i < maxLength; i++) {
        const row = rows[i];
        const col = cols[i];
        let tallestTreeA = -1;
        let tallestTreeB = -1;
        let tallestTreeC = -1;
        let tallestTreeD = -1;
        for (let j = 0; j < maxLength; j++) {
            if (tallestTreeA === 9 &&
                tallestTreeB === 9 &&
                tallestTreeC === 9 &&
                tallestTreeD === 9) {
                break;
            }
            const treeA = row.at(j) ?? -1;
            const treeB = row.at(-1 - j) ?? -1;
            const treeC = col.at(j) ?? -1;
            const treeD = col.at(-1 - j) ?? -1;
            if (treeA > tallestTreeA) {
                tallestTreeA = treeA;
                visibleTrees.add(`${i}-${j}`);
            }
            if (treeB > tallestTreeB) {
                tallestTreeB = treeB;
                visibleTrees.add(`${i}-${row.length - 1 - j}`);
            }
            if (treeC > tallestTreeC) {
                tallestTreeC = treeC;
                visibleTrees.add(`${j}-${i}`);
            }
            if (treeD > tallestTreeD) {
                tallestTreeD = treeD;
                visibleTrees.add(`${col.length - 1 - j}-${i}`);
            }
        }
    }
    return visibleTrees.size;
}, "day_8_puzzle_1");
