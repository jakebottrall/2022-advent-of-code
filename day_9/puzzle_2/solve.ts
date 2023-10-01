import fs from "fs";
import { benchmark } from "../../benchmark/benchmark";

benchmark(() => {
  const file = fs.readFileSync("./day_9/input.txt", { encoding: "utf-8" });

  type Positition = [number, number];

  const ropeLength = 10;

  const rope = Array.from({ length: ropeLength }, () => [0, 0]) as Positition[];

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
      rope[0][0] += dx;
      rope[0][1] += dy;

      for (let j = 1; j < ropeLength; j++) {
        const dyDiff = rope[j - 1][0] - rope[j][0];
        const dxDiff = rope[j - 1][1] - rope[j][1];

        if (Math.max(Math.abs(dyDiff), Math.abs(dxDiff)) <= 1) {
          break;
        }

        if (dyDiff) {
          rope[j][0] += Math.sign(dyDiff);
        }

        if (dxDiff) {
          rope[j][1] += Math.sign(dxDiff);
        }

        if (j === ropeLength - 1) {
          tailPositionHistory.add(cantorPairing(...rope[j]));
        }
      }
    }
  });

  return tailPositionHistory.size;
}, "day_9_puzzle_2");
