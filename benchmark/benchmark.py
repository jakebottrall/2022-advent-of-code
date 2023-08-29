import math
import time
from typing import Callable, List, Union

ITERATIONS = 10000


def benchmark(callback: Callable[[], Union[str, int]]):
    run_times: List[str] = []

    answer: Union[str, int] = 0

    for x in range(ITERATIONS):
        start_at = time.time()
        answer = callback()
        end_at = time.time()
        run_times.append((end_at - start_at) * 1000)

    run_times.sort()

    total = sum(run_times)
    average = total / ITERATIONS
    median = run_times[math.floor(ITERATIONS / 2)]
    p95 = run_times[math.floor(ITERATIONS * 0.95)]
    p99 = run_times[math.floor(ITERATIONS * 0.99)]

    print(
        {
            "answer": answer,
            "total": parse_result(total),
            "average": parse_result(average),
            "median": parse_result(median),
            "p95": parse_result(p95),
            "p99": parse_result(p99),
        }
    )


def parse_result(result: int):
    return "{:.5f}ms".format(result)
