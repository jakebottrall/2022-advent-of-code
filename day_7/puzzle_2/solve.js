"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("../../benchmark/benchmark");
(0, benchmark_1.benchmark)(() => {
    const file = fs_1.default.readFileSync("./day_7/input.txt", { encoding: "utf-8" });
    const directories = new Map();
    const cwd = [];
    function handleCD(command) {
        const nextDir = command.replace("cd ", "");
        if (nextDir === "..") {
            cwd.pop();
        }
        else {
            cwd.push(nextDir);
        }
    }
    function handleLS(output) {
        output.forEach((dirOrFile) => {
            if (!dirOrFile) {
                return;
            }
            const [value] = dirOrFile.split(" ");
            if (value === "dir") {
                return;
            }
            let path = "";
            cwd.forEach((dir) => {
                path += dir;
                directories.set(path, (directories.get(path) ?? 0) + +value);
            });
        });
    }
    file.split("$ ").forEach((prompt) => {
        const [command, ...output] = prompt.split("\n");
        if (command.startsWith("cd")) {
            handleCD(command);
        }
        else if (command.startsWith("ls")) {
            handleLS(output);
        }
    });
    const rootDirSize = directories.get("/") ?? 0;
    const requiredSpace = 30000000 - (70000000 - rootDirSize);
    let directoryTobeRemoveSize = rootDirSize;
    directories.forEach((size) => {
        if (size > requiredSpace && size < directoryTobeRemoveSize) {
            directoryTobeRemoveSize = size;
        }
    });
    return directoryTobeRemoveSize;
}, "day_7_puzzle_2");
