"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.benchmark = void 0;
const fs_1 = __importDefault(require("fs"));
const ITERATIONS = 10_000;
function benchmark(callback, key) {
    const runTimes = [];
    let answer = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        const startAt = performance.now();
        answer = callback();
        const endAt = performance.now();
        runTimes.push(endAt - startAt);
    }
    runTimes.sort();
    const total = runTimes.reduce((sum, time) => sum + time, 0);
    const average = total / ITERATIONS;
    const median = runTimes[Math.floor(ITERATIONS / 2)];
    const p95 = runTimes[Math.floor(ITERATIONS * 0.95)];
    const p99 = runTimes[Math.floor(ITERATIONS * 0.99)];
    const results = {
        answer,
        total: parseResult(total),
        average: parseResult(average),
        median: parseResult(median),
        p95: parseResult(p95),
        p99: parseResult(p99),
    };
    console.log(results);
    fs_1.default.writeFileSync(`./results/${key}_ts.json`, JSON.stringify(results));
}
exports.benchmark = benchmark;
function parseResult(result) {
    return `${result.toFixed(5)}ms`;
}
