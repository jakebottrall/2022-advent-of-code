"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_child_process_1 = require("node:child_process");
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const asyncExec = util_1.default.promisify(node_child_process_1.exec);
const directoryPath = "./results";
fs_1.default.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }
    const resultsMap = new Map();
    files.forEach((fileName) => {
        const filePath = path_1.default.join(directoryPath, fileName);
        const file = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
        const parsedJson = JSON.parse(file);
        const splitFileName = fileName.split(/[_.]/);
        const language = splitFileName.at(4);
        switch (language) {
            case "ts":
                parsedJson.language = "typescript";
                break;
            case "rb":
                parsedJson.language = "ruby";
                break;
            case "py":
                parsedJson.language = "python";
                break;
            default:
                break;
        }
        const key = splitFileName.slice(0, 4).join(" ");
        if (resultsMap.has(key)) {
            resultsMap.get(key)?.push(parsedJson);
        }
        else {
            resultsMap.set(key, [parsedJson]);
        }
    });
    const markdownTables = ["# Results\n"];
    [...resultsMap]
        .sort((a, b) => {
        const [aKey] = a;
        const [bKey] = b;
        const aDay = +aKey.split(" ")[1];
        const bDay = +bKey.split(" ")[1];
        if (aDay < bDay) {
            return -1;
        }
        if (aDay > bDay) {
            return 1;
        }
        const aPuzzle = +aKey.split(" ")[3];
        const bPuzzle = +bKey.split(" ")[3];
        if (aPuzzle < bPuzzle) {
            return -1;
        }
        if (aPuzzle > bPuzzle) {
            return 1;
        }
        return 0;
    })
        .forEach(([key, results]) => {
        const tableHeader = "| Language | Answer | Total | Average | Median | P95 | P99 |";
        const tableDivider = "| ------ | ------ | ------ | ------- | ------ | --- | --- |";
        const tableRows = results.map((result) => `| ${result.language} | ${result.answer} | ${result.total} | ${result.average} | ${result.median} | ${result.p95} | ${result.p99} |`);
        const markdownTable = [
            `## ${key}`,
            tableHeader,
            tableDivider,
            ...tableRows,
        ].join("\n");
        markdownTables.push(markdownTable);
    });
    const markdownContent = markdownTables.join("\n\n");
    fs_1.default.writeFileSync(`./RESULTS.md`, markdownContent);
    asyncExec("pnpm prettier --write RESULTS.md");
});
