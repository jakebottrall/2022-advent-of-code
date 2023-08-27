# rubocop:disable Style/Documentation
# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/MethodLength
# frozen_string_literal: true

module Benchmark
  ITERATIONS = 10_000

  def self.run
    run_times = []

    answer = 0

    ITERATIONS.times do
      start_at = Time.now
      answer = yield
      end_at = Time.now
      run_times.push((end_at - start_at) * 1000)
    end

    run_times.sort!

    total = run_times.sum
    average = total / ITERATIONS.to_f
    median = run_times[ITERATIONS / 2]
    p95 = run_times[(ITERATIONS * 0.95).to_i]
    p99 = run_times[(ITERATIONS * 0.99).to_i]

    puts({
           answer: answer,
           total: parse_result(total),
           average: parse_result(average),
           median: parse_result(median),
           p95: parse_result(p95),
           p99: parse_result(p99)
         })
  end

  def self.parse_result(result)
    "#{format('%.5f', result)}ms"
  end
end

# rubocop:enable Style/Documentation
# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/MethodLength
