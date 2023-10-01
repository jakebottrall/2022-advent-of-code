import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_9/input.txt", { encoding: "utf-8" });

  type Positition = [number, number];

  let headPosition: Positition = [0, 0];
  let tailPosition: Positition = [0, 0];

  const tailPositionHistory = new Set([0]);

  function cantorPairing(x: number, y: number) {
    const X = x >= 0 ? 2 * x : -2 * x - 1;
    const Y = y >= 0 ? 2 * y : -2 * y - 1;
    return ((X + Y) * (X + Y + 1)) / 2 + Y;
  }

  type Direction = "L" | "U" | "R" | "D";

  const directionMapping: Record<Direction, [number, number]> = {
    L: [-1, 0],
    U: [0, 1],
    R: [1, 0],
    D: [0, -1],
  };

  file.split("\n").forEach((instruction) => {
    const [direction, steps] = instruction.split(" ") as [Direction, string];

    const [dx, dy] = directionMapping[direction];

    for (let i = 0; i < +steps; i++) {
      const prevHeadPosition: Positition = [...headPosition];

      headPosition[0] += dx;
      headPosition[1] += dy;

      let shouldMove = false;

      if (direction === "L" || direction === "R") {
        shouldMove = Math.abs(tailPosition[0] - headPosition[0]) > 1;
      } else if (direction === "U" || direction === "D") {
        shouldMove = Math.abs(headPosition[1] - tailPosition[1]) > 1;
      }

      if (shouldMove) {
        tailPosition = prevHeadPosition;
        tailPositionHistory.add(
          cantorPairing(tailPosition[0], tailPosition[1]),
        );
      }
    }
  });

  return tailPositionHistory.size;
}, "day_9_puzzle_1");
