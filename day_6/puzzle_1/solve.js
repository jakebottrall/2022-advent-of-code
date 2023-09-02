"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_6/input.txt", { encoding: "utf-8" });
    let startOfPacketMarker = -1;
    for (let i = 0; i < file.length; i++) {
        const packet = file.slice(i, i + 4);
        const checked = [];
        for (const value of packet) {
            if (checked.includes(value)) {
                break;
            }
            else {
                checked.push(value);
            }
        }
        if (checked.length === 4) {
            startOfPacketMarker = i + 4;
            break;
        }
    }
    return startOfPacketMarker;
}, "day_6_puzzle_1");
