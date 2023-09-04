import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_7/input.txt", { encoding: "utf-8" });

  const directories = new Map<string, number>();

  const cwd: string[] = [];

  function handleCD(command: string) {
    const nextDir = command.replace("cd ", "");

    if (nextDir === "..") {
      cwd.pop();
    } else {
      cwd.push(nextDir);
    }
  }

  function handleLS(output: string[]) {
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
    } else if (command.startsWith("ls")) {
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
