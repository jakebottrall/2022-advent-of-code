import fs from "fs";
import { exec } from "node:child_process";
import path from "path";
import util from "util";

const asyncExec = util.promisify(exec);

const directoryPath = "./results";

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  interface Result {
    language: "typescript" | "ruby" | "python";
    answer: string | number;
    total: string;
    average: string;
    median: string;
    p95: string;
    p99: string;
  }

  const resultsMap = new Map<string, Result[]>();

  files.forEach((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const file = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedJson: Result = JSON.parse(file);

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
    } else {
      resultsMap.set(key, [parsedJson]);
    }
  });

  const markdownTables = ["# Results\n"];

  resultsMap.forEach((results, key) => {
    const tableHeader =
      "| Language | Answer | Total | Average | Median | P95 | P99 |";

    const tableDivider =
      "| ------ | ------ | ------ | ------- | ------ | --- | --- |";

    const tableRows = results.map(
      (result) =>
        `| ${result.language} | ${result.answer} | ${result.total} | ${result.average} | ${result.median} | ${result.p95} | ${result.p99} |`,
    );

    const markdownTable = [
      `## ${key}`,
      tableHeader,
      tableDivider,
      ...tableRows,
    ].join("\n");

    markdownTables.push(markdownTable);
  });

  const markdownContent = markdownTables.join("\n\n");

  fs.writeFileSync(`./RESULTS.md`, markdownContent);
  asyncExec("pnpm prettier --write RESULTS.md");
});
