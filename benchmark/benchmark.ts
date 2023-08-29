const ITERATIONS = 10_000;

export function benchmark(callback: () => number | string) {
  const runTimes: number[] = [];

  let answer: number | string = 0;

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

  console.log({
    answer,
    total: parseResult(total),
    average: parseResult(average),
    median: parseResult(median),
    p95: parseResult(p95),
    p99: parseResult(p99),
  });
}

function parseResult(result: number) {
  return `${result.toFixed(5)}ms`;
}
